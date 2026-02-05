export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='py-4 px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 border-t border-border bg-card'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-3 text-center md:text-left'>
        <p className='text-muted-foreground text-sm md:text-base leading-relaxed'></p>
        <p className='text-muted-foreground text-sm md:text-base leading-relaxed'>
          Copyright© {currentYear} Jake Kang. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
