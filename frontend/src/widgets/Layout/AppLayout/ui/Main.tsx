import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function AppMain({ children }: { children?: React.ReactNode }) {
  const theme = useSelector((state:RootState) => state.theme.theme)
  const isDark = theme === "dark"

  return (
    <main className={`flex h-screen ${isDark? "bg-gray-50" : "bg-very-darkbg"} w-full`}>
      {children}
    </main>
  );
}
