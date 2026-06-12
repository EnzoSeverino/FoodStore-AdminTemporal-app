import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { usePedidosPorEstado } from "../hooks/useDashboard";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { EmptyState } from "@/components/ui/EmptyState";

// ─── PedidosPorEstadoChart ──────────────────────────────────────────────────

// Mapeo de estado → color (consistente con Badge)
const estadoColors: Record<string, string> = {
    PENDIENTE: '#eab308',   
    CONFIRMADO: '#3b82f6',  
    EN_PREP: '#f59e0b',     
    ENTREGADO: '#22c55e',  
    CANCELADO: '#ef4444',   
}

// Labels legibles para la leyenda
const estadoLabels: Record<string, string> = {
    PENDIENTE: 'Pendiente',
    CONFIRMADO: 'Confirmado',
    EN_PREP: 'En Preparación',
    ENTREGADO: 'Entregado',
    CANCELADO: 'Cancelado',
}

export function PedidosPorEstadoChart() {
    const { data, isLoading, isError } = usePedidosPorEstado()

    // ─── Loading ────────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
                <SkeletonLoader className="h-5 w-48 mb-4" />
                <SkeletonLoader className="h-64 w-full" />
            </div>
        )
    }

    // ─── Error ──────────────────────────────────────────────────────────────
    if (isError || !data) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                <p className="text-sm text-red-700">
                    Error al cargar los datos del gráfico
                </p>
            </div>
        )
    }

    // ─── Empty ──────────────────────────────────────────────────────────────
    if (data.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                    Pedidos por Estado
                </h3>
                <EmptyState
                    icon="📋"
                    title="No hay pedidos"
                    description="Aún no se han registrado pedidos en el sistema."
                />
            </div>
        )
    }

    // ─── Transformar datos para recharts ────────────────────────────────────
    const chartData = data.map((item) => ({
        name: estadoLabels[item.estado] ?? item.estado,
        value: item.cantidad,
        estado: item.estado,
    }))

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-semibold text-slate-900 mb-4">
                Pedidos por Estado
            </h3>

            {/* ResponsiveContainer hace que el gráfico se adapte al ancho del padre */}
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                            `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                    >
                        {chartData.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`}
                                fill={estadoColors[entry.estado] ?? '#94a3b8'}
                            />
                        ))}
                    </Pie>

                    {/* Tooltip al hacer hover: muestra estado + cantidad */}
                    <Tooltip
                        formatter={(value: number, name: string) => [
                            `${value} pedidos`, name,
                        ]}
                        contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            fontSize: '12px',
                        }}
                    />

                    {/* Leyenda debajo del gráfico */}
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value: string) => (
                            <span className="text-sm text-slate-600">{value}</span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}