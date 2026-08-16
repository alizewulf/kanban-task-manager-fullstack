export default function AuthMain({ children }: { children?: React.ReactNode }) {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </main>
  );
}
