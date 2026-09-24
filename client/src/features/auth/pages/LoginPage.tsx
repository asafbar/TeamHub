import LoginForm from '../components/LoginForm'
import styles from "./LoginPage.module.css"

function LoginPage() {
  return (
    <main className={styles.page}>
      <section className={styles.loginCard}>
        <div className={styles.header}>
          <span className={styles.brand}>
            TeamHub
          </span>

          <h1 className={styles.title}>
            Welcome back
          </h1>

          <p className={styles.subtitle}>
            Sign in to manage your workspace,
            tasks and team.
          </p>
        </div>

        <div className={styles.formContainer}>
          <LoginForm />
        </div>
      </section>
    </main>
  )
}

export default LoginPage