import { Outlet } from '@tanstack/react-router'
import { Header } from '@/widgets/header'
import { AuthWatcher } from '@/features/auth'

export const RootLayout = () => {
    return (
        <div className="flex h-screen flex-col bg-background">
            <AuthWatcher />

            <Header />

            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}