import apiClient from "./axiosInstance";

export interface CategoriaSimple {
    id: number
    nombre: string
    es_principal: boolean
}

export interface IngredienteSimple {
    id: number
    nombre: string
}

export interface CategoriaInput {
    id: number
    es_principal: boolean
}

export interface Producto {
    id: number
    nombre: string
    descripcion: string | null
    precio_base: number
    imagenes: string | null
    stock_cantidad: number
    disponible: boolean
    categorias: CategoriaSimple[]
    ingredientes: IngredienteSimple[]
}

export interface ProductoCreate {
    nombre: string
    descripcion?: string
    precio_base: number
    imagenes?: string
    stock_cantidad: number
    disponible: boolean
    categorias: CategoriaInput[]
    ingredientes_ids: number[]
}

export interface ProductoUpdate {
    nombre?: string
    descripcion?: string
    precio_base?: number
    imagenes?: string
    stock_cantidad?: number
    disponible?: boolean
    categorias?: CategoriaInput[]
    ingredientes_ids?: number[]
}

const PRODUCTOS = '/productos'

export async function getProductos(): Promise<Producto[]> {
    const response = await apiClient.get<Producto[]>(`${PRODUCTOS}/all`)
    return response.data
}

export async function createProducto(data: ProductoCreate): Promise<Producto> {
    const response = await apiClient.post<Producto>(PRODUCTOS, data)
    return response.data
}

export async function updateProducto(id: number, data: ProductoUpdate): Promise<Producto> {
    const response = await apiClient.put<Producto>(`${PRODUCTOS}/${id}`, data)
    return response.data
}

export async function deleteProducto(id: number): Promise<void> {
    await apiClient.delete(`${PRODUCTOS}/${id}`)
}

export async function updateDisponibilidad(id: number, disponible: boolean): Promise<Producto> {
    const response = await apiClient.patch<Producto>(
        `${PRODUCTOS}/${id}/disponibilidad`,
        null,
    { params: { disponible } }
    )
    return response.data
}