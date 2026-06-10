import { useEffect, useState } from "react";
import type { Categoria, CategoriaCreate, CategoriaUpdate } from "@/api/categoriasApi";

interface CategoriaModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: CategoriaCreate | CategoriaUpdate) => void
    categorias: Categoria[]
    categoriaEditing: Categoria | null
    isLoading: boolean
}

export function CategoriaModal({
    isOpen,
    onClose,
    onSubmit,
    categorias,
    categoriaEditing,
    isLoading,
} : CategoriaModalProps) {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [parentId, setParentId] = useState<number | null>(null)

    useEffect(() => {
        if (categoriaEditing) {
            setNombre(categoriaEditing.nombre)
            setDescripcion(categoriaEditing.descripcion ?? '')
            setParentId(categoriaEditing.parent_id)
        } else {
            setNombre('')
            setDescripcion('')
            setParentId(null)
        }
    }, [categoriaEditing, isOpen])

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({
            nombre,
            descripcion: descripcion || undefined,
            parent_id: parentId,
        })
    }

    const categoriasFiltradas = categorias.filter(
        (c) => c.id !== categoriaEditing?.id,
    )

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                    {categoriaEditing ? 'Editar Categoría' : 'Nueva Categoría'}
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
                        placeholder="Nombre de la categoría"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Descripción
                        </label>
                        <input 
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        disabled={isLoading}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none disabled:bg-slate-100"
                        placeholder="Descripción opcional"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Categoría Padre     
                        </label>
                        <select
                        value={parentId ?? ''}
                        onChange={(e) =>
                            setParentId(e.target.value ? Number(e.target.value) : null)
                        }
                        disabled={isLoading}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none disabled:bg-slate-100"
                        >
                            <option value="">Sin categoría padre (raíz)</option>
                            {categoriasFiltradas.map((c) => (
                                <option key={c.id}  value={c.id}>
                                    {c.nombre}
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
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}