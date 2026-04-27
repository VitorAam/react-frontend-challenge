import { Outlet } from '@tanstack/react-router'
import { Header } from '@/widgets/header'
import { AuthWatcher } from '@/features/auth'

export const RootLayout = () => {
    return (
        <div className="min-h-screen bg-background">
            <AuthWatcher />

            <Header />

            <main>
                <Outlet />
            </main>
        </div>
    )
}