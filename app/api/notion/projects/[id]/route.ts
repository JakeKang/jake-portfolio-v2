import { NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';
import type { ExtendedRecordMap } from 'notion-types';

const notion = new NotionAPI();

const cacheTTL = 1000 * 60 * 5;
const recordCache = new Map<
  string,
  { recordMap: ExtendedRecordMap; expiresAt: number }
>();

export const revalidate = 300;

const cacheHeaders = {
  'Cache-Control': 'no-store',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function formatYearMonth(value: string) {
  const match = value.match(/(\d{4})-(\d{1,2})/);
  if (!match) {
    return '';
  }
  const year = match[1];
  const month = match[2].padStart(2, '0');
  return `${year}-${month}`;
}

function formatYearMonthDot(value: string) {
  const match = value.match(/(\d{4})-(\d{1,2})/);
  if (!match) {
    return '';
  }
  const year = match[1];
  const month = match[2].padStart(2, '0');
  return `${year}.${month}`;
}

function toDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function monthDiffInclusive(start: Date, end: Date) {
  const yearDiff = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();
  return yearDiff * 12 + monthDiff + 1;
}

function findStartDate(value: unknown): string | null {
  if (isRecord(value)) {
    const startDate = value.start_date;
    if (typeof startDate === 'string' && startDate.length > 0) {
      return startDate;
    }
    for (const nestedValue of Object.values(value)) {
      const found = findStartDate(nestedValue);
      if (found) {
        return found;
      }
    }
    return null;
  }

  if (Array.isArray(value)) {
    for (const nestedValue of value) {
      const found = findStartDate(nestedValue);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

function hasPropertyValue(value: unknown) {
  return Array.isArray(value) && value.length > 0;
}

function enrichCollectionPeriod(recordMap: ExtendedRecordMap) {
  const collections = recordMap.collection;
  const blocks = recordMap.block;

  for (const [collectionId, collectionEntry] of Object.entries(collections)) {
    const collectionValue = collectionEntry.value;
    if (!isRecord(collectionValue)) {
      continue;
    }

    const schema = collectionValue.schema;
    if (!isRecord(schema)) {
      continue;
    }

    let periodKey: string | null = null;
    let startKey: string | null = null;
    let endKey: string | null = null;

    for (const [propertyKey, schemaItem] of Object.entries(schema)) {
      if (!isRecord(schemaItem)) {
        continue;
      }
      const propertyName =
        typeof schemaItem.name === 'string' ? schemaItem.name : '';
      const propertyType =
        typeof schemaItem.type === 'string' ? schemaItem.type : '';
      const normalizedName = propertyName.toLowerCase();

      if (
        propertyType === 'formula' &&
        (propertyName.includes('기간') || normalizedName.includes('period'))
      ) {
        periodKey = propertyKey;
      }

      if (
        propertyType === 'date' &&
        (propertyName.includes('시작') || normalizedName.includes('start'))
      ) {
        startKey = propertyKey;
      }

      if (
        propertyType === 'date' &&
        (propertyName.includes('종료') || normalizedName.includes('end'))
      ) {
        endKey = propertyKey;
      }
    }

    if (!periodKey || !startKey) {
      continue;
    }

    for (const blockEntry of Object.values(blocks)) {
      const blockValue = blockEntry.value;
      if (!isRecord(blockValue)) {
        continue;
      }

      if (
        blockValue.parent_table !== 'collection' ||
        blockValue.parent_id !== collectionId
      ) {
        continue;
      }

      const properties = blockValue.properties;
      if (!isRecord(properties) || hasPropertyValue(properties[periodKey])) {
        continue;
      }

      const startDateRaw = findStartDate(properties[startKey]);
      const endDateRaw = endKey ? findStartDate(properties[endKey]) : null;
      const startDate = startDateRaw ? formatYearMonth(startDateRaw) : '';
      const endDate = endDateRaw ? formatYearMonth(endDateRaw) : '';
      const startDateDot = startDateRaw ? formatYearMonthDot(startDateRaw) : '';
      const endDateDot = endDateRaw ? formatYearMonthDot(endDateRaw) : '';

      if (!startDate) {
        continue;
      }

      const start = startDateRaw ? toDate(startDateRaw) : null;
      const end = endDateRaw ? toDate(endDateRaw) : new Date();
      const months = start && end ? Math.max(1, monthDiffInclusive(start, end)) : null;
      const formattedPeriod = endDate
        ? `${startDateDot} ~ ${endDateDot}${months ? ` (${months}개월)` : ''}`
        : `${startDateDot} ~ 진행중${months ? ` (${months}개월)` : ''}`;
      properties[periodKey] = [[formattedPeriod]];
    }

    const periodSchema = schema[periodKey];
    if (isRecord(periodSchema)) {
      periodSchema.type = 'text';
    }
  }
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const projectId = resolvedParams.id;

    const cached = recordCache.get(projectId);
    if (cached && cached.expiresAt > Date.now()) {
      return NextResponse.json(
        { recordMap: cached.recordMap },
        { headers: cacheHeaders },
      );
    }

    const recordMap = await notion.getPage(projectId);
    enrichCollectionPeriod(recordMap);
    recordCache.set(projectId, {
      recordMap,
      expiresAt: Date.now() + cacheTTL,
    });

    return NextResponse.json({ recordMap }, { headers: cacheHeaders });
  } catch (error) {
    console.error('Failed to fetch Notion page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project details' },
      { status: 500 },
    );
  }
}
