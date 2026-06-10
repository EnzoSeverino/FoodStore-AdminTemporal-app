import { useEffect, useState } from "react";
import type { Usuario, UsuarioUpdate, UsuarioCreate } from "@/api/usuariosApi";

interface EditUsuarioModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: UsuarioUpdate | UsuarioCreate) => void
    usuarioEditing: Usuario | null
    isLoading: boolean
}

const ROLES = ['ADMIN', 'STOCK', 'PEDIDOS', 'CLIENT']

const isCreate = (usuario: Usuario | null): usuario is null => usuario === null

export function UsuarioModal({
    isOpen,
    onClose,
    onSubmit,
    usuarioEditing,
    isLoading,
}: EditUsuarioModalProps) {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState('STOCK')

    const creating = isCreate(usuarioEditing)

    useEffect(() => {
        if (usuarioEditing) {
            setNombre(usuarioEditing.nombre)
            setEmail(usuarioEditing.email)
            setRol(usuarioEditing.rol)
            setPassword('')
        } else {
            setNombre('')
            setEmail('')
            setPassword('')
            setRol('STOCK')
        }
    }, [usuarioEditing, isOpen])

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (creating) {
            onSubmit({
                nombre,
                email,
                password,
                rol,
            } as UsuarioCreate)
        } else {
            onSubmit({
                nombre: nombre || undefined,
                email: email || undefined,
                rol: rol || undefined,
            } as UsuarioUpdate)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                    {creating ? 'Nuevo Usuario' : 'Editar Usuario'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Nombre
                        </label>
                        <input 
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        disabled={isLoading}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none disabled:bg-slate-100"
                        placeholder="Nombre del usuario"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none disabled:bg-slate-100"
                        placeholder="email@ejemplo.com"
                        />
                    </div>

                    {creating && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Contraseña
                            </label>
                            <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none disabled:bg-slate-100"
                            placeholder="••••••••"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Rol
                        </label>
                        <select
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        disabled={isLoading}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none disabled:bg-slate-100"
                        >
                            {ROLES.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                        >
                            {isLoading ? 'Guardando...' : creating ? 'Crear Usuario' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}