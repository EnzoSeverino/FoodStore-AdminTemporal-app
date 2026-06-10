import apiClient from "./axiosInstance";
import type { 
    PedidoRead,
    PedidoDetail,
    EstadoPedido,
    HistorialEstadoPedido,
    AvanzarEstadoRequest,
} from "@/types/pedido";
import type { PaginatedResponse } from "@/types/api";

const PEDIDOS = '/pedidos'

// ─── GET /api/v1/pedidos
export async function getPedidos(params?: {
    page?: number
    size?: number
    estado_codigo?: string
}): Promise<PaginatedResponse<PedidoRead>> {
    const response = await apiClient.get<PaginatedResponse<PedidoRead>>(PEDIDOS, { params })
    return response.data
}

// ─── GET /api/v1/pedidos/{id} 
export async function getPedidoById(id: number): Promise<PedidoDetail> {
    const response = await apiClient.get<PedidoDetail>(`${PEDIDOS}/${id}`)
    return response.data
}

// ─── PATCH /api/v1/pedidos/{id}/estado
export async function avanzarEstado(id: number, data: AvanzarEstadoRequest): Promise<PedidoRead> {
    const response = await apiClient.patch<PedidoRead>(`${PEDIDOS}/${id}/estado`, data)
    return response.data
}

// ─── GET /api/v1/pedidos/{id}/historial 
export async function getHistorialPedido(pedidoId: number): Promise<HistorialEstadoPedido[]> {
    const response = await apiClient.get<HistorialEstadoPedido[]>(`${PEDIDOS}/${pedidoId}/historial`)
    return response.data
}

// ─── DELETE /api/v1/pedidos/{id}
export async function cancelarPedido(id: number): Promise<PedidoRead> {
    const response = await apiClient.delete<PedidoRead>(`${PEDIDOS}/${id}`)
    return response.data
}

// ─── GET /api/v1/pedidos/{id}/estados-posibles
export async function getEstadosPosibles(id: number): Promise<EstadoPedido[]> {
    const response = await apiClient.get<EstadoPedido[]>(`${PEDIDOS}/${id}/estados-posibles`)
    return response.data
}