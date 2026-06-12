import { useDashboardTotals } from "../hooks/useDashboard";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";

// ─── StatsCards ─────────────────────────────────────────────────────────────
interface StatsCardsProps {
    icon: string
    label: string
    value: number
    description: string
}

function StatCard({ icon, label, value, description }: StatsCardsProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{icon}</span>
                <p className="text-sm font-medium text-slate-500">{label}</p>
            </div>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>
    )
}

export function StatsCards() {
    const { data, isLoading, isError } = useDashboardTotals()

    // ─── Loading: skeletons ─────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        )
    }

    // ─── Error ──────────────────────────────────────────────────────────────
    if (isError || !data) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                <p className="text-sm text-red-700">
                    Error al cargar las estadísticas del dashboard
                </p>
            </div>
        )
    } 

    // ─── Success: cards con datos ───────────────────────────────────────────
    const stats: StatsCardsProps[] = [
        {
            icon: '📦',
            label: 'Productos',
            value: data.total_productos,
            description: 'Total en catálogo',
        },
        {
            icon: '◫',
            label: 'Categorías',
            value: data.total_categorias,
            description: 'Total registradas',
        },
        {
            icon: '⚗',
            label: 'Ingredientes',
            value: data.total_ingredientes,
            description: 'Total registrados',
        },
        {
            icon: '🗒',
            label: 'Pedidos',
            value: data.total_pedidos,
            description: 'Total recibidos',
        },
        {
            icon: '👤',
            label: 'Usuarios',
            value: data.total_usuarios,
            description: 'Total registrados',
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
                <StatCard  key={stat.label} {...stat} />
            ))}
        </div>
    )
}