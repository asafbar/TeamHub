import { useDispatch, useSelector } from "react-redux"
import styles from "./SettingsPage.module.css"
import type { AppDispatch, RootState } from "../../../store/store"
import { updateThemeAsync } from "../../auth/store/authSlice"

function SettingsPage() {

    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.auth.user)

    const handleThemeChange = (theme: "dark" | "light") => {
        dispatch(updateThemeAsync(theme))
    }

    return (
        <div className={styles.page}>
            <h1>Settings</h1>
            <p>Manage your personal preferences.</p>

            <section>
                <h2>Appearance</h2>
                <p>Choose how TeamHub looks for your account.</p>

                <div>
                    <button
                        type="button"
                        disabled={user?.theme === "dark"}
                        onClick={()=>handleThemeChange("dark")}
                    >
                        Dark
                    </button>
                    <button
                        type="button"
                        disabled={user?.theme === "light"}
                        onClick={()=>handleThemeChange("light")}
                    >
                        Light
                    </button>
                </div>
            </section>
        </div>
    )
}

export default SettingsPage