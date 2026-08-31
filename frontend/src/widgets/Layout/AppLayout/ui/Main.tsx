import { useAppContext } from "../../../../shared/context/app.context";

export default function AppMain({ children }: { children?: React.ReactNode }) {
  const {selectedColumn} = useAppContext()
  return (
    <main className="flex h-screen bg-gray-50 w-full">
      {children}
      <div>{selectedColumn?.title}</div>
    </main>
  );
}
