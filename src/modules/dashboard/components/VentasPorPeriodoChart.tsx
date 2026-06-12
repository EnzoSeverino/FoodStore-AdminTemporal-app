import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useVentasPorPeriodo } from "../hooks/useDashboard";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { EmptyState } from "@/components/ui/EmptyState";

// ─── VentasPorPeriodoChart ──────────────────────────────────────────────────

// Opciones del selector de rango
const rangoOptions = [
    { label: '7 días', value: 7 },
    { label: '30 días', value: 30 },
    { label: '90 días', value: 90 },
]

export function VentasPorPeriodoChart() {
    // Estado local para el rango seleccionado (default: 30 días)
    const [dias, setDias] = useState(30)
    const { data, isLoading, isError } = useVentasPorPeriodo(dias)

    // ─── Formatear fecha para el eje X ──────────────────────────────────────
    // Convierte '2025-08-12' → '12/08' para mostrar en el eje X del gráfico.
    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr)
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`
    }

    // ─── Formatear monto para tooltip y eje Y ───────────────────────────────
    // Convierte 1500 → '$1.500' para mostrar en pesos argentinos.
    const formatCurrency = (value: number): string => {
        return `$${value.toLocaleString('es-AR')}`
    }

    // ─── Loading ────────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
                <SkeletonLoader className="h-5 w-48 mb-4" />
                <SkeletonLoader className="h-72 w-full" />
            </div>
        )
    }

    // ─── Error ──────────────────────────────────────────────────────────────
    if (isError || !data) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                <p className="text-sm text-red-700">
                    Error al cargar los datos de ventas
                </p>
            </div>
        )
    }

    // ─── Empty ──────────────────────────────────────────────────────────────
    if (data.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                    Ventas por Período
                </h3>
                <EmptyState
                    icon="📈"
                    title="No hay ventas registradas"
                    description="Aún no se han registrado ventas en el período seleccionado."
                />
            </div>
        )
    }

    // ─── Transformar datos para recharts ────────────────────────────────────
    const chartData = data.map((item) => ({
        fecha: formatDate(item.fecha),
        ventas: item.total_ventas,
        pedidos: item.cantidad_pedidos,
    }))

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
            {/* Header con título y selector de rango */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-900">
                    Ventas por Período
                </h3>

                {/* Selector de rango: 7, 30 o 90 días */}
                <div className="flex gap-1">
                    {rangoOptions.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => setDias(option.value)}
                        className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                            dias === option.value
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >    
                        {option.label}
                    </button>
                    ))}
                </div>
            </div>

            {/* Gráfico de líneas */}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    {/* Grilla de fondo para facilitar lectura */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                    {/* Eje X: fechas formateadas */}
                    <XAxis
                        dataKey="fecha"
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        tickLine={false}
                        axisLine={{ stroke: '#e2e8f0' }}
                    />

                    {/* Eje Y izquierdo: monto en pesos */}
                    <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        tickLine={false}
                        axisLine={{ stroke: '#e2e8f0' }}
                        tickFormatter={formatCurrency}
                    />

                    {/* Eje Y derecho: cantidad de pedidos */}
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        tickLine={false}
                        axisLine={{ stroke: '#e2e8f0' }}
                    />

                    {/* Tooltip al hacer hover */}
                    <Tooltip
                        contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '12px',
                        }}
                        formatter={(value: number, name: string) => {
                            if (name === 'ventas') return [formatCurrency(value), 'Ventas']
                            return [`${value} pedidos`, 'Pedidos']
                        }}
                        labelFormatter={(label) => `Fecha: ${label}`}
                    />

                    {/* Leyenda */}
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value: string) => (
                            <span className="text-sm text-slate-600">
                                {value === 'ventas' ? 'Ventas ($)' : 'Pedidos'}
                            </span>
                        )}
                    />

                    {/* Línea de ventas (eje Y izquierdo) */}
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="ventas"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 3 }}
                        activeDot={{ r: 5 }}
                    />

                    {/* Línea de pedidos (eje Y derecho) */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="pedidos"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ fill: '#22c55e', r: 3 }}
                        activeDot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}