export default function AppMain({ children }: { children?: React.ReactNode }) {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-start justify-center px-6 py-10 bg-gray-50">
      <div className="w-full max-w-6xl">{children}</div>
    </main>
  );
}
