
export const ANIMATION_CONFIG = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30
  },
  liquidSpring: {
    type: "spring",
    stiffness: 120,
    damping: 14,
    mass: 1.2
  },
  gentle: {
    duration: 0.5,
    ease: "easeInOut"
  }
};

export const COLORS = {
  lab: {
    bg: "bg-slate-900",
    accent: "cyan-400",
    liquid: "#22d3ee", // cyan-400 hex
    glassBorder: "rgba(255, 255, 255, 0.2)",
    glassBg: "rgba(15, 23, 42, 0.6)"
  },
  vault: {
    bg: "bg-neutral-900",
    text: "text-amber-400",
    metal: "linear-gradient(180deg, #262626 0%, #404040 50%, #171717 100%)",
    gold: "#fbbf24"
  }
};

export const IDLE_TIMEOUT_MS = 10000; // 10 seconds for ghost hand

export const THEME_CONFIG = {
  scifi: {
    id: 'scifi',
    label: 'חלל ועתיד',
    bg: 'bg-slate-900',
    bgGradient: 'from-slate-900 via-slate-800 to-slate-900',
    textMain: 'text-cyan-400',
    textSecondary: 'text-slate-400',
    border: 'border-cyan-500',
    accent: 'cyan',
    liquid: '#22d3ee', // Cyan
    particleColors: ['#22d3ee', '#4ade80', '#f8fafc', '#fbbf24']
  },
  pop: {
    id: 'pop',
    label: 'טיקטוק ופופ',
    bg: 'bg-fuchsia-950',
    bgGradient: 'from-fuchsia-900 via-purple-900 to-fuchsia-950',
    textMain: 'text-yellow-300',
    textSecondary: 'text-pink-200',
    border: 'border-pink-500',
    accent: 'pink',
    liquid: '#f0abfc', // Fuchsia 300
    particleColors: ['#f0abfc', '#fde047', '#ffffff', '#60a5fa']
  },
  sports: {
    id: 'sports',
    label: 'ספורט ואקסטרים',
    bg: 'bg-emerald-950',
    bgGradient: 'from-emerald-900 via-green-900 to-emerald-950',
    textMain: 'text-white',
    textSecondary: 'text-emerald-300',
    border: 'border-green-400',
    accent: 'emerald',
    liquid: '#4ade80', // Green 400
    particleColors: ['#4ade80', '#ffffff', '#fbbf24', '#f87171']
  },
  nature: {
    id: 'nature',
    label: 'טבע וחיות',
    bg: 'bg-amber-950',
    bgGradient: 'from-amber-900 via-orange-900 to-amber-950',
    textMain: 'text-lime-300',
    textSecondary: 'text-amber-200',
    border: 'border-lime-400',
    accent: 'lime',
    liquid: '#a3e635', // Lime 400
    particleColors: ['#a3e635', '#fbbf24', '#4ade80', '#fdba74']
  },
  ocean: {
    id: 'ocean',
    label: 'ים ואוקיינוס',
    bg: 'bg-sky-950',
    bgGradient: 'from-sky-900 via-blue-900 to-sky-950',
    textMain: 'text-sky-300',
    textSecondary: 'text-blue-200',
    border: 'border-sky-400',
    accent: 'sky',
    liquid: '#38bdf8', // Sky 400
    particleColors: ['#38bdf8', '#67e8f9', '#a5f3fc', '#ffffff']
  },
  candy: {
    id: 'candy',
    label: 'ממתקים וצבעים',
    bg: 'bg-rose-950',
    bgGradient: 'from-rose-900 via-pink-900 to-rose-950',
    textMain: 'text-rose-300',
    textSecondary: 'text-pink-200',
    border: 'border-rose-400',
    accent: 'rose',
    liquid: '#fb7185', // Rose 400
    particleColors: ['#fb7185', '#fdba74', '#fde047', '#a5f3fc']
  }
};