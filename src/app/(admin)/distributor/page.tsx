'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DataTable, Column } from '@/components/data/data-table';
import { ChartCard } from '@/components/data/chart-card';
import {
  distributorSalesBySku,
  distributorSalesByStore,
  distributorDynamicsData,
  exclusions as mockExclusions,
} from '@/lib/mock-data';
import { Plus } from 'lucide-react';

interface SkuRow {
  sku: string;
  name: string;
  quantity: number;
  amount: number;
}

interface StoreRow {
  store: string;
  quantity: number;
  amount: number;
}

interface Exclusion {
  id: number;
  brand: string;
  skus: string;
  periodStart: string;
  periodEnd: string;
  active: boolean;
}

function formatMoney(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M ₸`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K ₸`;
  return `${value} ₸`;
}

export default function DistributorPage() {
  const [exclusionsList, setExclusionsList] = useState<Exclusion[]>(mockExclusions);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newExclusion, setNewExclusion] = useState({
    brand: '',
    skus: '',
    periodStart: '',
    periodEnd: '',
  });

  const skuColumns: Column<SkuRow>[] = [
    { key: 'sku', header: 'SKU' },
    { key: 'name', header: 'Название' },
    {
      key: 'quantity',
      header: 'Количество',
      render: (row) => <span className="font-mono">{row.quantity.toLocaleString()}</span>,
    },
    {
      key: 'amount',
      header: 'Сумма',
      render: (row) => <span className="font-mono">{formatMoney(row.amount)}</span>,
    },
  ];

  const storeColumns: Column<StoreRow>[] = [
    { key: 'store', header: 'Магазин' },
    {
      key: 'quantity',
      header: 'Количество',
      render: (row) => <span className="font-mono">{row.quantity.toLocaleString()}</span>,
    },
    {
      key: 'amount',
      header: 'Сумма',
      render: (row) => <span className="font-mono">{formatMoney(row.amount)}</span>,
    },
  ];

  const exclusionColumns: Column<Exclusion>[] = [
    { key: 'brand', header: 'Бренд' },
    { key: 'skus', header: 'SKU' },
    { key: 'periodStart', header: 'Начало' },
    { key: 'periodEnd', header: 'Конец' },
    {
      key: 'active',
      header: 'Статус',
      render: (row) => (
        <Badge variant={row.active ? 'default' : 'secondary'}>
          {row.active ? 'Активно' : 'Неактивно'}
        </Badge>
      ),
    },
  ];

  const handleAddExclusion = () => {
    const ex: Exclusion = {
      id: exclusionsList.length + 1,
      ...newExclusion,
      active: true,
    };
    setExclusionsList([...exclusionsList, ex]);
    setNewExclusion({ brand: '', skus: '', periodStart: '', periodEnd: '' });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Дашборд дистрибутора</h1>

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Продажи по SKU</TabsTrigger>
          <TabsTrigger value="stores">По магазинам</TabsTrigger>
          <TabsTrigger value="dynamics">Динамика</TabsTrigger>
          <TabsTrigger value="exclusions">Исключения</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="mt-4">
          <DataTable columns={skuColumns} data={distributorSalesBySku} />
        </TabsContent>

        <TabsContent value="stores" className="mt-4">
          <DataTable columns={storeColumns} data={distributorSalesByStore} />
        </TabsContent>

        <TabsContent value="dynamics" className="mt-4">
          <ChartCard title="Динамика продаж" description="Еженедельно">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={distributorDynamicsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} tickFormatter={(v) => formatMoney(v)} />
                  <Tooltip formatter={(value) => formatMoney(Number(value))} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    name="Продажи"
                    stroke="hsl(220, 70%, 50%)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </TabsContent>

        <TabsContent value="exclusions" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить исключение
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Новое исключение</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Input
                    placeholder="Бренд"
                    value={newExclusion.brand}
                    onChange={(e) =>
                      setNewExclusion({ ...newExclusion, brand: e.target.value })
                    }
                  />
                  <Input
                    placeholder="SKU (через запятую)"
                    value={newExclusion.skus}
                    onChange={(e) =>
                      setNewExclusion({ ...newExclusion, skus: e.target.value })
                    }
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      value={newExclusion.periodStart}
                      onChange={(e) =>
                        setNewExclusion({
                          ...newExclusion,
                          periodStart: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="date"
                      value={newExclusion.periodEnd}
                      onChange={(e) =>
                        setNewExclusion({
                          ...newExclusion,
                          periodEnd: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button className="w-full" onClick={handleAddExclusion}>
                    Создать
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <DataTable columns={exclusionColumns} data={exclusionsList} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
