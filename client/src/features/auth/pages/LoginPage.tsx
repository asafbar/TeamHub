import LoginForm from '../components/LoginForm'
import styles from "./LoginPage.module.css"
import { useState } from "react"
import RegisterForm from "../components/RegisterForm"

function LoginPage() {

  const [isRegistering, setIsRegistering] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  function handleRegistrationSuccess() {
    setRegistrationSuccess(true)
    setIsRegistering(false)
  }

  return (
    <main className={styles.page}>
      <section className={styles.authCard}>
        <div className={styles.brandPanel}>
          <span className={styles.brand}>
            TeamHub
          </span>

          <div className={styles.brandContent}>
            <h1 className={styles.brandTitle}>
              Work Together.
              <br />
              Build More.
            </h1>

            <p className={styles.brandSubtitle}>
              Everything your team needs to stay
              organized, connected and productive.
            </p>

            <div className={styles.features}>
              <span>✓ Organize your work</span>
              <span>✓ Collaborate with your team</span>
              <span>✓ Keep projects moving</span>
              <span>✓ All in one place</span>
            </div>
          </div>
        </div>

        <div className={styles.authPanel}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              {isRegistering ? "Create Account" : "Welcome back"}
            </h2>

            <p className={styles.subtitle}>
              {isRegistering
                ? "Join TeamHub and start collaborating."
                : "Sign in to your TeamHub account."}
            </p>
          </div>

          {registrationSuccess && !isRegistering && (
            <p className={styles.successMessage}>
              Account created successfully. You can now sign in.
            </p>
          )}

          <div className={styles.formContainer}>
            {isRegistering ? (
              <RegisterForm
                onRegistrationSuccess={handleRegistrationSuccess}
              />
            ) : (
              <LoginForm />
            )}
          </div>

          <p className={styles.authSwitch}>
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              className={styles.authSwitchButton}
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </section>
    </main>
  )
}

export default LoginPage