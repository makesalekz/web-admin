'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DataTable, Column } from '@/components/data/data-table';
import {
  commissions,
  exclusions as mockExclusions,
  globalCommissionRate,
} from '@/lib/mock-data';
import { Plus, Pencil } from 'lucide-react';

interface Commission {
  id: number;
  tenant: string;
  tenantId: number;
  rate: number;
  effectiveFrom: string;
}

interface Exclusion {
  id: number;
  brand: string;
  skus: string;
  periodStart: string;
  periodEnd: string;
  active: boolean;
}

export default function BillingPage() {
  const [globalRate, setGlobalRate] = useState(globalCommissionRate);
  const [editingRate, setEditingRate] = useState(false);
  const [exclusionsList, setExclusionsList] = useState<Exclusion[]>(mockExclusions);
  const [newExclusion, setNewExclusion] = useState({
    brand: '',
    skus: '',
    periodStart: '',
    periodEnd: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const commissionColumns: Column<Commission>[] = [
    { key: 'tenant', header: 'Магазин' },
    {
      key: 'rate',
      header: 'Ставка %',
      render: (row) => <span className="font-mono">{row.rate}%</span>,
    },
    { key: 'effectiveFrom', header: 'Действует с' },
    {
      key: 'actions',
      header: '',
      render: () => (
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      ),
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
      <h1 className="text-2xl font-bold">Комиссии и исключения</h1>

      <Tabs defaultValue="commissions">
        <TabsList>
          <TabsTrigger value="commissions">Комиссии</TabsTrigger>
          <TabsTrigger value="exclusions">Исключения</TabsTrigger>
        </TabsList>

        <TabsContent value="commissions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Глобальная ставка</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              {editingRate ? (
                <>
                  <Input
                    type="number"
                    step="0.1"
                    value={globalRate}
                    onChange={(e) => setGlobalRate(Number(e.target.value))}
                    className="w-24"
                  />
                  <span>%</span>
                  <Button size="sm" onClick={() => setEditingRate(false)}>
                    Сохранить
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-2xl font-bold">{globalRate}%</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingRate(true)}
                  >
                    Изменить
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Ставки по магазинам (per-tenant)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={commissionColumns} data={commissions} />
            </CardContent>
          </Card>
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
