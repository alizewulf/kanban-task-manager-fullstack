import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store";
import { MoonSVG, SunSVG } from "./Icons";

function ThemeButton() {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useSelector((state: RootState) => state.theme.theme);
    const isDark = theme === "dark";

    return (
        <div className={`flex items-center px-6 py-3.5 rounded-md justify-center gap-7 ${isDark? "bg-accent4" : "bg-very-darkbg"}`}>
            <SunSVG />

            <button
                type="button"
                role="switch"
                aria-checked={isDark}
                onClick={() => dispatch({ type: "theme/toggleTheme" })}
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