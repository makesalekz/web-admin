'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, Column } from '@/components/data/data-table';
import { agents } from '@/lib/mock-data';
import { MapPin } from 'lucide-react';

interface Agent {
  id: number;
  name: string;
  phone: string;
  visits: number;
  orders: number;
  onboardings: number;
  routeCompletion: number;
}

function getCompletionColor(pct: number): string {
  if (pct >= 90) return 'text-green-600';
  if (pct >= 70) return 'text-yellow-600';
  return 'text-red-600';
}

export default function AgentsPage() {
  const columns: Column<Agent>[] = [
    { key: 'name', header: 'Имя' },
    { key: 'phone', header: 'Телефон' },
    {
      key: 'visits',
      header: 'Визиты',
      render: (row) => <span className="font-mono">{row.visits}</span>,
    },
    {
      key: 'orders',
      header: 'Заказы',
      render: (row) => <span className="font-mono">{row.orders}</span>,
    },
    {
      key: 'onboardings',
      header: 'Подключения',
      render: (row) => (
        <Badge variant={row.onboardings > 0 ? 'default' : 'secondary'}>
          {row.onboardings}
        </Badge>
      ),
    },
    {
      key: 'routeCompletion',
      header: 'Маршрут %',
      render: (row) => (
        <span className={`font-mono font-medium ${getCompletionColor(row.routeCompletion)}`}>
          {row.routeCompletion}%
        </span>
      ),
    },
  ];

  const totalVisits = agents.reduce((s, a) => s + a.visits, 0);
  const totalOrders = agents.reduce((s, a) => s + a.orders, 0);
  const totalOnboardings = agents.reduce((s, a) => s + a.onboardings, 0);
  const avgCompletion = Math.round(
    agents.reduce((s, a) => s + a.routeCompletion, 0) / agents.length
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Мониторинг агентов</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Всего визитов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Всего заказов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Подключения
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOnboardings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Ср. выполнение маршрута
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getCompletionColor(avgCompletion)}`}>
              {avgCompletion}%
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable columns={columns} data={agents} />

      {/* GPS Track Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            GPS-трек агентов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-muted/50 rounded-md flex items-center justify-center border border-dashed">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Карта GPS-треков агентов</p>
              <p className="text-xs mt-1">
                Интеграция с картой будет подключена при наличии GPS-данных
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
