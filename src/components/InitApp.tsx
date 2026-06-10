import { useEffect, type ReactNode } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'

export function InitApp({ children }: { children: ReactNode }) {
  const checkAuth = useAuthStore((s) => s.checkAuth)
  const isLoading = useAuthStore((s) => s.isLoading)

  useEffect(() => {
    checkAuth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Cargando...</p>
      </div>
    )
  }

  return <>{children}</>
}