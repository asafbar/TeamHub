import type { ReactNode } from "react"

type PublicLayoutProps = {
    children: ReactNode
}

function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <main>
            {children}
        </main>
    )
}

export default PublicLayout