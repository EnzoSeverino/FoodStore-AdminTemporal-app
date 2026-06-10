import apiClient from "./axiosInstance";

export interface Categoria {
    id: number
    nombre: string
    descripcion: string | null
    imagen_url: string | null
    parent_id: number | null
}

export interface CategoriaCreate {
    nombre: string
    descripcion?: string
    imagen_url?: string
    parent_id?: number | null
}

export interface CategoriaUpdate {
    nombre?: string
    descripcion?: string
    imagen_url?: string
    parent_id?: number | null
}

const CATEGORIAS = '/categorias'

export async function getCategorias(): Promise<Categoria[]> {
    const response = await apiClient.get<Categoria[]>(`${CATEGORIAS}/all`)
    return response.data
}

export async function createCategoria(data: CategoriaCreate): Promise<Categoria> {
    const response = await apiClient.post<Categoria>(CATEGORIAS, data)
    return response.data
}

export async function updateCategoria(id: number, data: CategoriaUpdate): Promise<Categoria> {
    const response = await apiClient.put<Categoria>(`${CATEGORIAS}/${id}`, data)
    return response.data
}

export async function deleteCategoria(id: number): Promise<void> {
    await apiClient.delete(`${CATEGORIAS}/${id}`)
}