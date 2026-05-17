'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DataTable, Column } from '@/components/data/data-table';
import { stores, paymentHistory } from '@/lib/mock-data';
import { Search } from 'lucide-react';

type StoreStatus = 'active' | 'suspended' | 'trial';

interface StoreItem {
  id: number;
  name: string;
  owner: string;
  phone: string;
  plan: string;
  gmv: number;
  status: StoreStatus;
  createdAt: string;
}

const statusLabels: Record<StoreStatus, string> = {
  active: 'Активен',
  suspended: 'Приостановлен',
  trial: 'Пробный',
};

const statusVariants: Record<StoreStatus, 'default' | 'secondary' | 'destructive'> = {
  active: 'default',
  suspended: 'destructive',
  trial: 'secondary',
};

function formatMoney(value: number): string {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function StoresPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedStore, setSelectedStore] = useState<StoreItem | null>(null);

  const filteredStores = stores.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.owner.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: Column<StoreItem>[] = [
    { key: 'name', header: 'Название' },
    { key: 'owner', header: 'Владелец' },
    { key: 'plan', header: 'Тариф' },
    {
      key: 'gmv',
      header: 'GMV',
      render: (row) => <span className="font-mono">{formatMoney(row.gmv)}</span>,
    },
    {
      key: 'status',
      header: 'Статус',
      render: (row) => (
        <Badge variant={statusVariants[row.status]}>
          {statusLabels[row.status]}
        </Badge>
      ),
    },
    { key: 'createdAt', header: 'Подключён' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Управление магазинами</h1>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по названию или владельцу..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? 'all')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="active">Активен</SelectItem>
            <SelectItem value="trial">Пробный</SelectItem>
            <SelectItem value="suspended">Приостановлен</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={filteredStores}
        onRowClick={(row) => setSelectedStore(row)}
      />

      <Dialog
        open={!!selectedStore}
        onOpenChange={(open) => !open && setSelectedStore(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedStore?.name}</DialogTitle>
          </DialogHeader>
          {selectedStore && (
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Владелец</p>
                  <p className="font-medium">{selectedStore.owner}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Телефон</p>
                  <p className="font-medium">{selectedStore.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Тариф</p>
                  <p className="font-medium">{selectedStore.plan}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">GMV</p>
                  <p className="font-medium">{formatMoney(selectedStore.gmv)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Статус</p>
                  <Badge variant={statusVariants[selectedStore.status]}>
                    {statusLabels[selectedStore.status]}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Подключён</p>
                  <p className="font-medium">{selectedStore.createdAt}</p>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">История платежей</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {paymentHistory.map((p) => (
                      <div
                        key={p.id}
                        className="flex justify-between items-center text-sm"
                      >
                        <span>{p.date}</span>
                        <span className="font-mono">
                          {formatMoney(p.amount)}
                        </span>
                        <Badge
                          variant={
                            p.status === 'paid' ? 'default' : 'destructive'
                          }
                        >
                          {p.status === 'paid' ? 'Оплачено' : 'Просрочено'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
