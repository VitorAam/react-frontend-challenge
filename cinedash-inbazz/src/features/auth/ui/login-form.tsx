import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../lib/auth.schema'
import { useAuthStore } from '../model/auth.store'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/ui/card'
import { useNavigate } from '@tanstack/react-router'
import { getErrorMessage, toast } from '@/shared/lib/toast'

export const LoginForm = () => {
    const login = useAuthStore((state) => state.login)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (data: LoginFormData) => {
        try {
            login(data.email)
            toast.success('Bem-vindo!', `Sessão iniciada como ${data.email}.`)
            navigate({ to: '/movies' })
        } catch (error) {
            toast.error('Não foi possível entrar', getErrorMessage(error))
        }
    }

    return (
        <div className="flex h-full items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="seu@email.com"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full cursor-pointer"
                            isLoading={isSubmitting}
                            isLoadingText="Entrando..."
                        >
                            Entrar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
