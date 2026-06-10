import apiClient from "./axiosInstance";

export interface EstadoPedido {
    id: number
    codigo: string
    nombre: string
    orden: number
}

export interface FormaPago {
    id: number
    nombre: string
    codigo: string
}

export interface DetallePedido {
    id: number
    producto_id: number
    nombre_producto: string
    precio_unitario: number
    cantidad: number
    subtotal: number
}

export interface Pedido {
    id: number
    usuario_id: number
    fecha_pedido: string
    estado_actual_id: number
    forma_pago_id: number
    total: number
    detalles: DetallePedido[]
    estado_actual: EstadoPedido | null
    forma_pago: FormaPago | null
}

export interface CambioEstadoRequest {
    nuevo_estado_id: number
    observacion?: string
}

const PEDIDOS = '/pedidos'

export async function getPedidos(): Promise<Pedido[]> {
    const response = await apiClient.get<Pedido[]>(PEDIDOS)
    return response.data
}

export async function cambiarEstado(id: number, data: CambioEstadoRequest): Promise<Pedido> {
    const response = await apiClient.patch<Pedido>(`${PEDIDOS}/${id}/estado`, data)
    return response.data
}

export async function getEstadosPosibles(id: number): Promise<EstadoPedido[]> {
    const response = await apiClient.get<EstadoPedido[]>(`${PEDIDOS}/${id}/estados-posibles`)
    return response.data
}