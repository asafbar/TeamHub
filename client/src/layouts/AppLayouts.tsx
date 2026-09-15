import type { ReactNode } from "react"

type AppLayoutProps = {
    children: ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
    return (
        <div>
            <header>
                <h2>TeamHub</h2>
            </header>

            <main>
                {children}
            </main>
        </div>
    )
}

export default AppLayout