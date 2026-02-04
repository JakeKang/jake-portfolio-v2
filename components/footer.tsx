export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-6 md:px-12 lg:px-24 border-t border-border bg-card">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          {currentYear} Portfolio. Next.js와 Tailwind CSS로 제작되었습니다.
        </p>
        <p className="text-muted-foreground text-sm">
          정성을 담아 디자인하고, 열정으로 코딩했습니다.
        </p>
      </div>
    </footer>
  )
}
