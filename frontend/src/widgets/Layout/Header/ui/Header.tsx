function Header() {
  return (
    <header className="border-b border-accent3/70 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-white">
            KB
          </div>
          <div>
            <p className="text-[14px] font-semibold text-accent1">Kanban board</p>
            <p className="text-[12px] text-accent3-hover">Task flow</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;