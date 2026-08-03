import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store";

function ThemeButton() {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useSelector((state: RootState) => state.theme.theme);
    return (
        <button className="cursor-pointer" onClick={() => dispatch({ type: "theme/toggleTheme" })}>
            {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
    )
}

export default ThemeButton