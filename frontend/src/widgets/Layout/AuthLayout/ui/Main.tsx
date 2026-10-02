import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function AuthMain({ children }: { children?: React.ReactNode }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <main className={`flex min-h-screen items-center justify-center px-4 py-8 transition-colors duration-200 sm:px-6 lg:px-8 ${isDark ? "bg-very-darkbg text-white" : "bg-accent4 text-accent1"}`}>
      {children}
    </main>
  );
}
