// ─── MACHINES ───
export const MACHINES = [
  { id: "aillio-r1", brand: "Aillio", model: "Bullet R1 V2", capacity: 1000, type: "Electric Induction", tag: "1kg", status: "idle" as const },
  { id: "kaleido-m6", brand: "Kaleido", model: "Sniper M6", capacity: 700, type: "Electric Infrared", tag: "700g", status: "roasting" as const },
];

// ─── ROAST LEVELS ───
export const ROAST_LEVELS = [
  { id: "light", label: "Light", loss: 0.13 },
  { id: "medium-light", label: "Med-Light", loss: 0.15 },
  { id: "medium", label: "Medium", loss: 0.16 },
  { id: "medium-dark", label: "Med-Dark", loss: 0.18 },
  { id: "dark", label: "Dark", loss: 0.2 },
] as const;

// ─── BEAN CATALOG ───
export const BEAN_CATALOG = [
  { id: "guji-g2", name: "Guji G2", origin: "Ethiopia", processing: "Washed", costPerKg: 16.2, stockKg: 42.5 },
  { id: "ethiopian-elto", name: "Ethiopian Elto G1", origin: "Ethiopia", processing: "Natural", costPerKg: 19.93, stockKg: 28.0 },
  { id: "kenya-ndiara", name: "Kenya Ndiara FCS", origin: "Kenya", processing: "Washed", costPerKg: 26.37, stockKg: 15.3 },
  { id: "paraiso-92", name: "Paraiso 92 Red Bourbon", origin: "Colombia", processing: "Anaerobic", costPerKg: 21.94, stockKg: 33.7 },
  { id: "lekempti-g4", name: "Lekempti G4", origin: "Ethiopia", processing: "Various", costPerKg: 13.76, stockKg: 50.0 },
];

// ─── STATUS OPTIONS ───
export const STATUS_OPTIONS = [
  { id: "pending", label: "PENDING" },
  { id: "in-progress", label: "IN PROGRESS" },
  { id: "completed", label: "COMPLETED" },
  { id: "delivered", label: "DELIVERED" },
] as const;

// ─── CHANNELS ───
export const CHANNELS = [
  { id: "retail", label: "Retail", margin: 75 },
  { id: "wholesale", label: "Wholesale", margin: 40 },
  { id: "flavored", label: "Flavored", margin: 33 },
] as const;

// ─── SAMPLE ORDER LOG ───
export interface OrderEntry {
  id: number;
  client: string;
  bean: string;
  level: string;
  gramsTarget: number;
  greenNeeded: number;
  machine: string;
  rounds: number;
  totalTime: number;
  costPerKg: number;
  channel: string;
  status: string;
  date: string;
}

export const SAMPLE_ORDERS: OrderEntry[] = [
  { id: 1, client: "KNDZ Coffee", bean: "Guji G2", level: "Medium", gramsTarget: 5000, greenNeeded: 5952, machine: "Bullet R1 V2", rounds: 6, totalTime: 96, costPerKg: 19.28, channel: "Wholesale", status: "completed", date: "2026-03-01" },
  { id: 2, client: "Bloom & Brew", bean: "Ethiopian Elto G1", level: "Light", gramsTarget: 2000, greenNeeded: 2299, machine: "Sniper M6", rounds: 4, totalTime: 52, costPerKg: 22.91, channel: "Retail", status: "in-progress", date: "2026-03-02" },
  { id: 3, client: "Espresso Bar Ltd", bean: "Kenya Ndiara FCS", level: "Med-Dark", gramsTarget: 8000, greenNeeded: 9756, machine: "Bullet R1 V2", rounds: 10, totalTime: 160, costPerKg: 32.16, channel: "Wholesale", status: "pending", date: "2026-03-03" },
  { id: 4, client: "Wedding Favors", bean: "Paraiso 92 Red Bourbon", level: "Medium", gramsTarget: 3000, greenNeeded: 3571, machine: "Sniper M6", rounds: 5, totalTime: 65, costPerKg: 26.12, channel: "Retail", status: "pending", date: "2026-03-04" },
  { id: 5, client: "Velvet Cafe", bean: "Lekempti G4", level: "Dark", gramsTarget: 10000, greenNeeded: 12500, machine: "Bullet R1 V2", rounds: 13, totalTime: 208, costPerKg: 17.20, channel: "Wholesale", status: "delivered", date: "2026-02-25" },
  { id: 6, client: "Morning Ritual", bean: "Guji G2", level: "Med-Light", gramsTarget: 1500, greenNeeded: 1765, machine: "Bullet R1 V2", rounds: 2, totalTime: 32, costPerKg: 19.06, channel: "Retail", status: "completed", date: "2026-02-28" },
];

// ─── HELPERS ───
export function fmtWeight(g: number): string {
  return g >= 1000 ? `${(g / 1000).toFixed(1)}kg` : `${Math.round(g)}g`;
}

export function fmtTime(m: number): string {
  if (!m && m !== 0) return "--";
  const h = Math.floor(m / 60);
  const r = m % 60;
  return h > 0 ? `${h}h ${r}m` : `${r}m`;
}
