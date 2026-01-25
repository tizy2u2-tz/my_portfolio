'use client';

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 py-8 mt-16">
      <div className="container-main">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/70">
            © {new Date().getFullYear()} Tonya Zenin
          </p>
          <p className="text-xs text-cream/70">
            Designed with <span className="text-yellow">Cursor</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
