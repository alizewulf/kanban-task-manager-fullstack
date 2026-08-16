function AppHeader() {
  return (
    <header className="border-b border-accent3/70 bg-blue-600 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-400 text-sm font-semibold text-black">
            AP
          </div>
          <div>
            <p className="text-[14px] font-semibold">App Area</p>
            <p className="text-[12px] opacity-80">Workspace</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
