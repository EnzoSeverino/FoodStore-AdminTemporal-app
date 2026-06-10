import { useState } from "react";
import { useUsuarios, useCreateUsuario, useDeleteUsuario, useUpdateUsuario } from "../hooks/useUsuarios";
import { UsuariosTable } from "../components/UsuariosTable";
import { UsuarioModal } from "../components/UsuarioModal";
import type { Usuario, UsuarioCreate, UsuarioUpdate } from "@/api/usuariosApi";

const PAGE_SIZE = 10;

export function UsuariosPage() {
    const [page, setPage] = useState(0)
    const skip = page * PAGE_SIZE

    const { data, isLoading, isError } = useUsuarios(skip, PAGE_SIZE)
    const usuarios = data?.items ?? []
    const total = data?.total ?? 0
    const totalPages = Math.ceil(total / PAGE_SIZE)

    const createUsuario = useCreateUsuario()
    const deleteUsuario = useDeleteUsuario()
    const updateUsuario = useUpdateUsuario()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [usuarioEditing, setUsuarioEditing] = useState<Usuario | null>(null)

    const handleOpenCreate = () => {
        setUsuarioEditing(null)
        setIsModalOpen(true)
    }

    const handleOpenEdit = (usuario: Usuario) => {
        setUsuarioEditing(usuario)
        setIsModalOpen(true)
    }

    const handleClose = () => {
        setIsModalOpen(false)
        setUsuarioEditing(null)
    }

    const handleSubmit = async (data: UsuarioUpdate | UsuarioCreate) => {
        if (usuarioEditing) {
            await updateUsuario.mutateAsync({ id: usuarioEditing.id, data: data as UsuarioUpdate })
        } else {
            await createUsuario.mutateAsync(data as UsuarioCreate)
        }
        handleClose()
    }

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de que querés eliminar este usuario?')) return
        await deleteUsuario.mutateAsync(id)
    }

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="text-slate-500">Cargando usuarios...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="text-red-500">Error al cargar los usuarios</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Usuarios</h1>
                <p className="text-sm text-slate-500">
                    Gestión de usuarios del sistema
                </p>
            </div>

            <div className="flex justify-end">
                <button
                onClick={handleOpenCreate}
                className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                    <span>+</span> Nuevo Usuario
                </button>
            </div>

            <UsuariosTable 
            data={usuarios}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            />

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-3">
                    <p className="text-sm text-slate-500">
                        Página {page + 1} de {totalPages} ({total} usuarios)
                    </p>
                    <div className="flex gap-2">
                        <button
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>
                        <button
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                        disabled={page >= totalPages - 1}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            <UsuarioModal 
            isOpen={isModalOpen}
            onClose={handleClose}
            onSubmit={handleSubmit}
            usuarioEditing={usuarioEditing}
            isLoading={createUsuario.isPending || updateUsuario.isPending}
            />
        </div>
    )
}