// ─── MACHINES (full catalog from original app) ───
export interface Machine {
  id: string;
  brand: string;
  model: string;
  capacity: number | null;
  rt: Record<string, number>;
  cool: number;
  type: string;
  tag: string;
}

export const MACHINES: Machine[] = [
  { id:"aillio-r1",    brand:"Aillio",         model:"Bullet R1 V2",  capacity:1000,  rt:{light:10,"medium-light":11,medium:12,"medium-dark":13,dark:14}, cool:5,  type:"Electric Induction", tag:"1kg"   },
  { id:"aillio-r2",    brand:"Aillio",         model:"Bullet R2 Pro", capacity:1200,  rt:{light:9, "medium-light":10,medium:11,"medium-dark":12,dark:13}, cool:4,  type:"Electric Induction", tag:"1.2kg" },
  { id:"kaleido-m1",   brand:"Kaleido",        model:"Sniper M1",     capacity:200,   rt:{light:6, "medium-light":7, medium:8, "medium-dark":9, dark:10}, cool:3,  type:"Electric Infrared",  tag:"200g"  },
  { id:"kaleido-m2",   brand:"Kaleido",        model:"Sniper M2",     capacity:400,   rt:{light:6, "medium-light":7, medium:8, "medium-dark":9, dark:10}, cool:3,  type:"Electric Infrared",  tag:"400g"  },
  { id:"kaleido-m6",   brand:"Kaleido",        model:"Sniper M6",     capacity:700,   rt:{light:6, "medium-light":8, medium:9, "medium-dark":11,dark:13}, cool:3,  type:"Electric Infrared",  tag:"700g"  },
  { id:"kaleido-m10",  brand:"Kaleido",        model:"Sniper M10",    capacity:1200,  rt:{light:7, "medium-light":9, medium:10,"medium-dark":12,dark:14}, cool:3,  type:"Electric Infrared",  tag:"1.2kg" },
  { id:"ikawa-home",   brand:"IKAWA",          model:"Home / Pro V3", capacity:60,    rt:{light:6, "medium-light":7, medium:8, "medium-dark":8, dark:9},  cool:2,  type:"Hot Air Electric",   tag:"60g"   },
  { id:"ikawa-pro100", brand:"IKAWA",          model:"Pro 100",       capacity:120,   rt:{light:6, "medium-light":7, medium:8, "medium-dark":9, dark:9},  cool:2,  type:"Hot Air Electric",   tag:"120g"  },
  { id:"probat-5",     brand:"Probat",         model:"Probatone 5",   capacity:5000,  rt:{light:12,"medium-light":14,medium:15,"medium-dark":17,dark:19}, cool:8,  type:"Gas / LPG",          tag:"5kg"   },
  { id:"probat-12",    brand:"Probat",         model:"Probatone 12",  capacity:12000, rt:{light:12,"medium-light":14,medium:15,"medium-dark":17,dark:19}, cool:10, type:"Gas",                tag:"12kg"  },
  { id:"giesen-w1a",   brand:"Giesen",         model:"W1A",           capacity:1000,  rt:{light:10,"medium-light":11,medium:12,"medium-dark":13,dark:15}, cool:6,  type:"Gas",                tag:"1kg"   },
  { id:"giesen-w6a",   brand:"Giesen",         model:"W6A",           capacity:6000,  rt:{light:11,"medium-light":13,medium:14,"medium-dark":16,dark:18}, cool:9,  type:"Gas",                tag:"6kg"   },
  { id:"diedrich-ir1", brand:"Diedrich",       model:"IR-1",          capacity:1000,  rt:{light:9, "medium-light":10,medium:11,"medium-dark":13,dark:14}, cool:5,  type:"Infrared Gas",       tag:"1kg"   },
  { id:"diedrich-ir3", brand:"Diedrich",       model:"IR-3",          capacity:3000,  rt:{light:10,"medium-light":11,medium:12,"medium-dark":14,dark:16}, cool:7,  type:"Infrared Gas",       tag:"3kg"   },
  { id:"sf-1",         brand:"San Franciscan", model:"SF-1",          capacity:500,   rt:{light:8, "medium-light":9, medium:10,"medium-dark":12,dark:13}, cool:5,  type:"Gas",                tag:"500g"  },
  { id:"sf-6",         brand:"San Franciscan", model:"SF-6",          capacity:3000,  rt:{light:10,"medium-light":12,medium:13,"medium-dark":15,dark:17}, cool:8,  type:"Gas / Propane",      tag:"3kg"   },
  { id:"mcr-1",        brand:"Mill City",      model:"MCR-1",         capacity:1000,  rt:{light:10,"medium-light":11,medium:12,"medium-dark":14,dark:15}, cool:6,  type:"Gas",                tag:"1kg"   },
  { id:"custom",       brand:"Custom",         model:"My Machine",    capacity:null,  rt:{light:10,"medium-light":11,medium:12,"medium-dark":13,dark:14}, cool:6,  type:"Custom",             tag:"?"     },
];

export const BRANDS = ["Aillio","Kaleido","IKAWA","Probat","Giesen","Diedrich","San Franciscan","Mill City","Custom"];

// ─── ROAST LEVELS ───
export interface RoastLevel {
  id: string;
  label: string;
  loss: number;
  dot: string;
}

export const ROAST_LEVELS: RoastLevel[] = [
  { id:"light",        label:"Light",       loss:0.13, dot:"#f5c97a" },
  { id:"medium-light", label:"Med-Light",   loss:0.15, dot:"#e8a84a" },
  { id:"medium",       label:"Medium",      loss:0.16, dot:"#c47b35" },
  { id:"medium-dark",  label:"Med-Dark",    loss:0.18, dot:"#8b4a20" },
  { id:"dark",         label:"Dark",        loss:0.20, dot:"#3d1a0a" },
];

export const LEVEL_COLORS: Record<string, string> = {
  light:"#f5c97a","medium-light":"#e8a84a",medium:"#c47b35","medium-dark":"#8b4a20",dark:"#3d1a0a"
};

// ─── FORMATS ───
export const FORMATS = [
  { id:"whole", label:"Whole Bean" },
  { id:"drip",  label:"Drip Bags" },
  { id:"steep", label:"Steep Packs" },
];

// ─── CHANNELS ───
export interface Channel {
  id: string;
  label: string;
  defaultMargin: number;
}

export const CHANNELS: Channel[] = [
  { id:"retail",    label:"Retail",    defaultMargin:75 },
  { id:"wholesale", label:"Wholesale", defaultMargin:40 },
  { id:"flavor",    label:"Flavored",  defaultMargin:33 },
];

export function channelMargin(channelId: string): number {
  const ch = CHANNELS.find(c => c.id === channelId);
  return ch ? ch.defaultMargin : 75;
}

// ─── STATUS OPTIONS ───
export interface StatusOption {
  id: string;
  label: string;
  color: string;
  bg: string;
}

export const STATUS_OPTIONS: StatusOption[] = [
  { id:"pending",     label:"Pending",     color:"#d97706", bg:"#fef3c7" },
  { id:"in-progress", label:"In Progress", color:"#2563eb", bg:"#dbeafe" },
  { id:"completed",   label:"Completed",   color:"#16a34a", bg:"#dcfce7" },
  { id:"delivered",   label:"Delivered",    color:"#7c3aed", bg:"#ede9fe" },
];

// ─── DEFAULT BEAN CATALOG ───
export interface BeanCatalogEntry {
  id: string;
  name: string;
  supplier: string;
  processing: string;
  costPerKg: number;
}

export const DEFAULT_BEAN_CATALOG: BeanCatalogEntry[] = [
  { id:"guji-g2",        name:"Guji G2",                         supplier:"United Beans Inc.", processing:"Washed",    costPerKg:16.20 },
  { id:"ethiopian-elto", name:"Ethiopian Elto G1",                supplier:"Showroom Coffee",   processing:"Natural",   costPerKg:19.93 },
  { id:"kenya-ndiara",   name:"Kenya Ndiara FCS Week 15PB",       supplier:"Showroom Coffee",   processing:"Washed",    costPerKg:26.37 },
  { id:"paraiso-92",     name:"Paraiso 92 Red Bourbon P-02",      supplier:"Cafe Marcarena",    processing:"Anaerobic", costPerKg:21.94 },
  { id:"lekempti-g4",    name:"Lekempti G4",                      supplier:"Various",           processing:"Various",   costPerKg:13.76 },
];

// ─── CALENDAR CONSTANTS ───
export const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
export const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ─── INTERFACES ───
export interface MachineSlot {
  id: string;
  qty: number;
}

export interface RoundDetail {
  round: number;
  done: boolean;
  note: string;
}

export interface OrderEntry {
  id: number;
  client: string;
  grams: number;
  level: string;
  roastLevel: string;
  format: string;
  machines: string;
  rounds: number;
  completedRounds: number;
  roastTime: number;
  coolTime: number;
  totalTime: number;
  greenNeeded: number;
  wastage: number;
  lossPercent: number;
  greenCostPerKg: number;
  totalCost: number;
  costPerKg: number;
  sellPricePerKg: number;
  margin: number;
  marginPct: number;
  channel: string;
  beanOrigin: string | null;
  beanOriginId: string | null;
  status: string;
  orderNote: string;
  roundDetails: RoundDetail[];
  isMultiTrack: boolean;
  trackStartTime?: string;
  trackElapsed?: number;
  sessionDuration?: number;
  scheduledDate?: number;
  isScheduled?: boolean;
  slots?: MachineSlot[];
}

export interface InventoryItem {
  id: number;
  origin: string;
  supplier: string;
  processing: string;
  stockG: number;
  unit: string;
  costPerKg: number;
  lowAlertKg: number;
  notes: string;
  pricePerKg?: number;
}

export interface PackagingItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
  lowAlert: number;
  icon: string;
}

export interface TrackState {
  id: number;
  machineId: string;
  beanId: string;
  roastLevel: string;
  gramsInput: string;
  gramsUnit: string;
  grams: number;
  roundStates: Record<number, number>;
  roundNotes: Record<number, string>;
  notes: string;
  channel: string;
  marginPct: number;
  startTime: string;
  trackTimer: number;
  trackRunning: boolean;
  customLoss: number | null;
}

// ─── HELPERS ───
export function fmtW(g: number): string {
  return g >= 1000 ? `${(g / 1000).toFixed(2)}kg` : `${Math.round(g)}g`;
}

export function fmtT(m: number | null | undefined): string {
  if (!m && m !== 0) return "\u2014";
  const h = Math.floor(m / 60);
  const r = m % 60;
  return h > 0 ? `${h}h ${r}m` : `${r}m`;
}

export function fmtSec(sec: number): string {
  const m = Math.floor(sec / 60);
  const s2 = sec % 60;
  return String(m).padStart(2, "0") + ":" + String(s2).padStart(2, "0");
}

export function fmtDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });
}

export function fmtDateFull(ts: number): string {
  return new Date(ts).toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function toYMD(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export interface CalcResult {
  roastedCap: number;
  slowRT: number;
  slowCool: number;
  rounds: number;
  totalTime: number;
  greenNeeded: number;
  wastage: number;
  loss: number;
  roastTime: number;
  coolTime: number;
  perRoundRoasted: number;
  maxBatchRoasted: number;
  roundTime: number;
}

export function calcOrder(order: {
  roastLevel?: string;
  customLoss?: number | null;
  slots?: MachineSlot[];
  grams: number;
}): CalcResult {
  const level = ROAST_LEVELS.find(r => r.id === order.roastLevel) || ROAST_LEVELS[2];
  const loss = order.customLoss != null ? order.customLoss / 100 : level.loss;
  const slots = order.slots || [];
  const roastedCap = slots.reduce((s, sl) => {
    const m = MACHINES.find(x => x.id === sl.id) || MACHINES[0];
    return s + (m.capacity || 0) * sl.qty * (1 - loss);
  }, 0);
  const slowRT = slots.length > 0 ? Math.max(...slots.map(sl => {
    const m = MACHINES.find(x => x.id === sl.id) || MACHINES[0];
    return m.rt?.[order.roastLevel || "medium"] || 12;
  })) : 12;
  const slowCool = slots.length > 0 ? Math.max(...slots.map(sl => {
    const m = MACHINES.find(x => x.id === sl.id) || MACHINES[0];
    return m.cool || 6;
  })) : 6;
  const rounds = roastedCap > 0 ? Math.ceil(order.grams / roastedCap) : 0;
  const totalTime = rounds * (slowRT + slowCool);
  const greenNeeded = order.grams / (1 - loss);
  const wastage = Math.round(roastedCap * rounds - order.grams);
  const roastTime = rounds * slowRT;
  const coolTime = rounds * slowCool;
  const perRoundRoasted = roastedCap > 0 ? Math.min(order.grams, roastedCap) : 0;
  const maxBatchRoasted = roastedCap;
  const roundTime = slowRT + slowCool;
  return { roastedCap, slowRT, slowCool, rounds, totalTime, greenNeeded, wastage, loss, roastTime, coolTime, perRoundRoasted, maxBatchRoasted, roundTime };
}

export const TRACK_COLORS = ["#E84B1A","#2563eb","#16a34a","#7c3aed","#d97706","#0891b2"];

export function fmt$(n: number): string { return "$" + (n || 0).toFixed(2); }
export function fmtPct(n: number): string { return (n || 0).toFixed(1) + "%"; }
