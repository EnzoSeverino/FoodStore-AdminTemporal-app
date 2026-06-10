import apiClient from "./axiosInstance";

// ─── Tipos de respuesta del dashboard 

// Totales generales del sistema — se muestran en las cards superiores del dashboard
export interface DashboardTotals {
    total_productos: number
    total_categorias: number
    total_ingredientes: number
    total_pedidos: number
    total_usuarios: number
}

// Cantidad de pedidos agrupados por estado — para gráfico de torta o barras
export interface PedidosPorEstado {
    estado: string
    cantidad: number
}

// Ventas agrupadas por período — para gráfico de líneas temporal
export interface VentasPorPeriodo {
    fecha: string
    total_ventas: number
    cantidad_pedidos: number
}

// Productos más vendidos — para gráfico de barras horizontales o ranking
// Ordenados por cantidad_total DESC
export interface ProductoTop {
    producto_id: number
    nombre: string
    cantidad_total: number
    monto_total: number
}

const ADMIN = '/admin'

// ─── GET /api/v1/admin/dashboard/totals 
export async function getDashboardTotals(): Promise<DashboardTotals> {
    const response = await apiClient.get<DashboardTotals>(`${ADMIN}/dashboard/totals`)
    return response.data
}

// ─── GET /api/v1/admin/dashboard/pedidos-por-estado
export async function getPedidosPorEstado(): Promise<PedidosPorEstado[]> {
    const response = await apiClient.get<PedidosPorEstado[]>(`${ADMIN}/dashboard/pedidos-por-estado`)
    return response.data
}

// ─── GET /api/v1/admin/dashboard/ventas
export async function getVentasPorPeriodo(dias = 30): Promise<VentasPorPeriodo[]> {
    const response = await apiClient.get<VentasPorPeriodo[]>(`${ADMIN}/dashboard/ventas`,
        { params: { dias } },
    )
    return response.data
}

// ─── GET /api/v1/admin/dashboard/productos-top
export async function getProductosTop(limit = 10): Promise<ProductoTop[]> {
    const response = await apiClient.get<ProductoTop[]>(`${ADMIN}/dashboard/productos-top`,
        { params: { limit } },
    )
    return response.data
}