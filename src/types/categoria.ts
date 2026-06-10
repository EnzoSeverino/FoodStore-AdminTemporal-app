// ─── Categoría
export interface Categoria {
    id: number
    nombre: string
    descripcion: string | null
    imagen_url: string | null
    parent_id: number | null
    created_at: string
    updated_at: string | null
    deleted_at: string | null
}

// ─── Categoría Create
export interface CategoriaCreate {
    nombre: string
    descripcion?: string
    imagen_url?: string | null
    parent_id?: number | null
}

// ─── Categoría Update 
export interface CategoriaUpdate {
    nombre?: string
    descripcion?: string
    imagen_url?: string | null
    parent_id?: number | null
}