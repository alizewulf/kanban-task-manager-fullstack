import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../model/themeSlice";
import type { AppDispatch, RootState } from "../../../store/store";
import { MoonSVG, SunSVG } from "./Icons";

interface ThemeButtonProps {
    variant?: "app" | "login";
}

function ThemeButton({ variant = "app" }: ThemeButtonProps) {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useSelector((state: RootState) => state.theme.theme);
    const isDark = theme === "dark";

    if (variant === "login") {
        return (
            <button
                type="button"
                role="switch"
                aria-checked={isDark}
                onClick={() => dispatch(toggleTheme())}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[12px] font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${isDark
                    ? "border-slate-700 bg-slate-900/80 text-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.4)] hover:border-slate-600"
                    : "border-slate-200 bg-white/90 text-slate-700 shadow-[0_8px_24px_rgba(148,163,184,0.2)] hover:border-slate-300"
                }`}
            >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {isDark ? <MoonSVG /> : <SunSVG />}
                </span>
                <span>{isDark ? "Dark" : "Light"}</span>
            </button>
        );
    }

    return (
        <div className={`flex items-center px-6 py-3.5 rounded-md justify-center gap-7 ${isDark ? "bg-accent4" : "bg-very-darkbg"}`}>
            <SunSVG />

            <button
                type="button"
                role="switch"
                aria-checked={isDark}
                onClick={() => dispatch(toggleTheme())}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${isDark ? "bg-gray-600" : "bg-indigo-500"}`}
            >
                <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-200 ${isDark ? "translate-x-0.5" : "translate-x-7"}`}
                />
            </button>

            <MoonSVG />
        </div>
    );
}

export default ThemeButton;