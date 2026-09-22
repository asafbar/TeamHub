import styles from "./SettingsPage.module.css"

function SettingsPage() {
    return (
        <div className={styles.page}>
            <h1>Settings</h1>
            <p>Manage your personal preferences.</p>

            <section>
                <h2>Appearance</h2>
                <p>Choose how TeamHub looks for your account.</p>

                <div>
                    <button type="button">Dark</button>
                    <button type="button">Light</button>
                </div>
            </section>
        </div>
    )
}

export default SettingsPage