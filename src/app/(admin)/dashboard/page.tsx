'use client';

import {
  DollarSign,
  TrendingUp,
  Store,
  UserMinus,
  Users,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { StatCard } from '@/components/data/stat-card';
import { ChartCard } from '@/components/data/chart-card';
import { dashboardStats, gmvChartData } from '@/lib/mock-data';

function formatMoney(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M ₸`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K ₸`;
  return `${value} ₸`;
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Дашборд платформы</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="GMV"
          value={formatMoney(dashboardStats.gmv.value)}
          trend={{ value: dashboardStats.gmv.trend, label: 'за месяц' }}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatCard
          title="Выручка платформы"
          value={formatMoney(dashboardStats.revenue.value)}
          trend={{ value: dashboardStats.revenue.trend, label: 'за месяц' }}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          title="Подключённые магазины"
          value={String(dashboardStats.stores.value)}
          trend={{ value: dashboardStats.stores.trend, label: 'за месяц' }}
          icon={<Store className="h-4 w-4" />}
        />
        <StatCard
          title="Churn rate"
          value={`${dashboardStats.churn.value}%`}
          trend={{ value: dashboardStats.churn.trend, label: 'за месяц' }}
          icon={<UserMinus className="h-4 w-4" />}
        />
        <StatCard
          title="Активные агенты"
          value={String(dashboardStats.activeAgents.value)}
          trend={{ value: dashboardStats.activeAgents.trend, label: 'за месяц' }}
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <ChartCard title="Динамика GMV" description="Последние 30 дней">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={gmvChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis
                fontSize={12}
                tickFormatter={(v) => formatMoney(v)}
              />
              <Tooltip
                formatter={(value) => formatMoney(Number(value))}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="gmv"
                name="GMV"
                stroke="hsl(220, 70%, 50%)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Выручка"
                stroke="hsl(150, 60%, 45%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
