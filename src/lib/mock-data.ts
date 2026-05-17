// Mock data for all 5 stories — will be replaced with real API calls

export const dashboardStats = {
  gmv: { value: 45_200_000, trend: 12.5 },
  revenue: { value: 1_356_000, trend: 8.3 },
  stores: { value: 187, trend: 5.2 },
  churn: { value: 2.1, trend: -0.5 },
  activeAgents: { value: 23, trend: 4.0 },
};

export const gmvChartData = [
  { date: '01.04', gmv: 1200000, revenue: 36000 },
  { date: '05.04', gmv: 1350000, revenue: 40500 },
  { date: '10.04', gmv: 1100000, revenue: 33000 },
  { date: '15.04', gmv: 1500000, revenue: 45000 },
  { date: '20.04', gmv: 1650000, revenue: 49500 },
  { date: '25.04', gmv: 1400000, revenue: 42000 },
  { date: '30.04', gmv: 1800000, revenue: 54000 },
  { date: '05.05', gmv: 1700000, revenue: 51000 },
  { date: '10.05', gmv: 1900000, revenue: 57000 },
  { date: '15.05', gmv: 2100000, revenue: 63000 },
];

// Story 8.2: Billing
export const commissions = [
  { id: 1, tenant: 'Магазин "Алма"', tenantId: 101, rate: 3.0, effectiveFrom: '2026-01-01' },
  { id: 2, tenant: 'Минимаркет "Нурай"', tenantId: 102, rate: 2.5, effectiveFrom: '2026-02-01' },
  { id: 3, tenant: 'Продукты 24/7', tenantId: 103, rate: 3.0, effectiveFrom: '2026-01-01' },
  { id: 4, tenant: 'Супермаркет "Берекет"', tenantId: 104, rate: 2.0, effectiveFrom: '2026-03-01' },
  { id: 5, tenant: 'Магазин "Достык"', tenantId: 105, rate: 3.0, effectiveFrom: '2026-01-01' },
];

export const exclusions = [
  { id: 1, brand: 'Coca-Cola', skus: 'CC-001, CC-002, CC-003', periodStart: '2026-01-01', periodEnd: '2026-06-30', active: true },
  { id: 2, brand: 'P&G', skus: 'PG-100, PG-101', periodStart: '2026-03-01', periodEnd: '2026-12-31', active: true },
  { id: 3, brand: 'Nestlé', skus: 'NS-050', periodStart: '2025-06-01', periodEnd: '2025-12-31', active: false },
];

export const globalCommissionRate = 3.0;

// Story 8.3: Agents
export const agents = [
  { id: 1, name: 'Асылбек Маратов', phone: '+7 701 111 2233', visits: 12, orders: 8, onboardings: 2, routeCompletion: 85 },
  { id: 2, name: 'Дана Серікова', phone: '+7 702 333 4455', visits: 15, orders: 11, onboardings: 1, routeCompletion: 92 },
  { id: 3, name: 'Мурат Алиев', phone: '+7 777 555 6677', visits: 9, orders: 5, onboardings: 0, routeCompletion: 60 },
  { id: 4, name: 'Айгуль Нұрланова', phone: '+7 700 888 9900', visits: 18, orders: 14, onboardings: 3, routeCompletion: 95 },
  { id: 5, name: 'Бауыржан Касымов', phone: '+7 705 222 3344', visits: 7, orders: 4, onboardings: 1, routeCompletion: 50 },
];

// Story 8.4: Stores / Tenants
export const stores = [
  { id: 101, name: 'Магазин "Алма"', owner: 'Серик Алматов', phone: '+7 701 000 0001', plan: 'Business', gmv: 5200000, status: 'active' as const, createdAt: '2025-08-15' },
  { id: 102, name: 'Минимаркет "Нурай"', owner: 'Асем Нурланова', phone: '+7 702 000 0002', plan: 'Starter', gmv: 2100000, status: 'active' as const, createdAt: '2025-10-01' },
  { id: 103, name: 'Продукты 24/7', owner: 'Канат Бекмуратов', phone: '+7 777 000 0003', plan: 'Business', gmv: 8500000, status: 'active' as const, createdAt: '2025-06-20' },
  { id: 104, name: 'Супермаркет "Берекет"', owner: 'Алия Касенова', phone: '+7 700 000 0004', plan: 'Enterprise', gmv: 15000000, status: 'active' as const, createdAt: '2025-03-10' },
  { id: 105, name: 'Магазин "Достык"', owner: 'Ержан Тулеуов', phone: '+7 705 000 0005', plan: 'Starter', gmv: 900000, status: 'trial' as const, createdAt: '2026-04-28' },
  { id: 106, name: 'Маркет "Жанар"', owner: 'Гульмира Ахметова', phone: '+7 708 000 0006', plan: 'Business', gmv: 3800000, status: 'suspended' as const, createdAt: '2025-09-12' },
];

export const paymentHistory = [
  { id: 1, date: '2026-05-01', amount: 45000, status: 'paid' },
  { id: 2, date: '2026-04-01', amount: 42000, status: 'paid' },
  { id: 3, date: '2026-03-01', amount: 38000, status: 'paid' },
  { id: 4, date: '2026-02-01', amount: 35000, status: 'overdue' },
];

// Story 8.5: Distributor
export const distributorSalesBySku = [
  { sku: 'CC-001', name: 'Coca-Cola 1L', quantity: 4500, amount: 2250000 },
  { sku: 'CC-002', name: 'Fanta 1L', quantity: 3200, amount: 1440000 },
  { sku: 'CC-003', name: 'Sprite 0.5L', quantity: 2800, amount: 980000 },
  { sku: 'CC-004', name: 'Coca-Cola 0.5L', quantity: 5100, amount: 1785000 },
];

export const distributorSalesByStore = [
  { store: 'Магазин "Алма"', quantity: 1200, amount: 540000 },
  { store: 'Минимаркет "Нурай"', quantity: 800, amount: 360000 },
  { store: 'Продукты 24/7', quantity: 2100, amount: 945000 },
  { store: 'Супермаркет "Берекет"', quantity: 3500, amount: 1575000 },
];

export const distributorDynamicsData = [
  { date: '01.04', amount: 450000 },
  { date: '08.04', amount: 520000 },
  { date: '15.04', amount: 480000 },
  { date: '22.04', amount: 610000 },
  { date: '29.04', amount: 550000 },
  { date: '06.05', amount: 680000 },
  { date: '13.05', amount: 720000 },
];
