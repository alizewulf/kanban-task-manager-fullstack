export default function AppMain({ children }: { children?: React.ReactNode }) {
  return (
    <main className="flex h-screen bg-gray-50 w-full">
      {children}
    </main>
  );
}
