import { useQuery } from "@tanstack/react-query";
import { 
    getDashboardTotals,
    getPedidosPorEstado,
    getVentasPorPeriodo,
    getProductosTop,
} from "@/api/adminApi";

// ─── Hook useDashboard ──────────────────────────────────────────────────────

// ─── Totales generales ──────────────────────────────────────────────────────
// Para las cards superiores: total productos, categorías, ingredientes, pedidos, usuarios
export function useDashboardTotals() {
    return useQuery({
        queryKey: ['dashboard', 'totals'],
        queryFn: getDashboardTotals,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    })
}

// ─── Pedidos por estado ─────────────────────────────────────────────────────
// Para el gráfico de torta/barras: cuántos pedidos hay en cada estado
export function usePedidosPorEstado() {
    return useQuery({
        queryKey: ['dashboard', 'pedidos-por-estado'],
        queryFn: getPedidosPorEstado,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    })
}

// ─── Ventas por período ─────────────────────────────────────────────────────
// Para el gráfico de líneas: evolución de ventas en los últimos N días
// Parámetro opcional: dias (default 30)
export function useVentasPorPeriodo(dias = 30) {
    return useQuery({
        queryKey: ['dashboard', 'ventas', dias],
        queryFn: () => getVentasPorPeriodo(dias),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    })
}

// ─── Productos más vendidos ─────────────────────────────────────────────────
// Para el gráfico de barras horizontales: top N productos por cantidad vendida
// Parámetro opcional: limit (default 10)
export function useProductosTop(limit = 10) {
    return useQuery({
        queryKey: ['dashboard', 'productos-top', limit],
        queryFn: () => getProductosTop(limit),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    })
}