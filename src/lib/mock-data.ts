export interface Product {
  id: string
  name: string
  category: string
  price: number
  image?: string
  stock: number
  sku: string
  colorCode?: string
  minStock?: number
  unit?: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  debt: number
  isLoyalty?: boolean
}

export const CATEGORIES = [
  { id: "all", label: "الكل" },
  { id: "paints", label: "دهانات" },
  { id: "putty", label: "معجون" },
  { id: "tools", label: "أدوات" },
  { id: "additives", label: "إضافات" },
]

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "جوتن فينوماستيك مائي مطفي - 10 لتر",
    category: "paints",
    price: 1250,
    stock: 45,
    sku: "JTN-FM-10",
    image: "/images/products/paint-1.png"
  },
  {
    id: "2",
    name: "جوتن سلك فينوماستيك - 3.6 لتر",
    category: "paints",
    price: 580,
    stock: 12,
    sku: "JTN-FS-36",
    colorCode: "#F5F5DC",
    image: "/images/products/paint-2.png"
  },
  {
    id: "3",
    name: "معجون جوتن داخلي - 20 كجم",
    category: "putty",
    price: 320,
    stock: 80,
    sku: "JTN-PTY-20",
    image: "/images/products/putty-1.png"
  },
  {
    id: "4",
    name: "فرشاة دهان احترافية - 4 بوصة",
    category: "tools",
    price: 85,
    stock: 200,
    sku: "TL-BR-4",
    image: "/images/products/brush-1.png"
  },
  {
    id: "5",
    name: "رولة دهان كبيرة ميكروفايبر",
    category: "tools",
    price: 110,
    stock: 5,
    sku: "TL-RL-LG",
    image: "/images/products/brush-1.png"
  },
  {
    id: "6",
    name: "جوتن جوتاشيلد خارجي - 15 لتر",
    category: "paints",
    price: 2450,
    stock: 22,
    sku: "JTN-GS-15",
    image: "/images/products/paint-1.png"
  },
  {
    id: "7",
    name: "منظف فرش دهان مركز",
    category: "additives",
    price: 45,
    stock: 50,
    sku: "AD-CLN-500",
  },
  {
    id: "8",
    name: "معجون ترميم ثقوب - 1 كجم",
    category: "putty",
    price: 65,
    stock: 0,
    sku: "PTY-FIX-1",
    image: "/images/products/putty-1.png"
  },
  {
    id: "9",
    name: "جوتن فينوماستيك لماع - 3.6 لتر",
    category: "paints",
    price: 620,
    stock: 35,
    sku: "JTN-FL-36",
    image: "/images/products/paint-2.png"
  },
  {
    id: "10",
    name: "سكينة معجون ستانلس ستيل",
    category: "tools",
    price: 45,
    stock: 15,
    sku: "TL-PTY-KN",
    image: "/images/products/brush-1.png"
  },
  {
    id: "11",
    name: "تينر حار جوتن - 1 لتر",
    category: "additives",
    price: 95,
    stock: 60,
    sku: "AD-TNR-1",
  },
  {
    id: "12",
    name: "جوتن برايمر مائي - 18 لتر",
    category: "paints",
    price: 850,
    stock: 8,
    sku: "JTN-PR-18",
    image: "/images/products/paint-1.png"
  },
]

export const CUSTOMERS: Customer[] = [
  { id: "1", name: "محمد أحمد علي", phone: "01234567890", debt: 1250 },
  { id: "2", name: "شركة النور للمقاولات", phone: "01002233445", debt: 8500 },
  { id: "3", name: "إبراهيم حسن كمال", phone: "01112223334", debt: 0, isLoyalty: true },
  { id: "4", name: "محمود سيد عثمان", phone: "01556677889", debt: 340 },
]

export interface InvoiceItem {
  id: string
  name: string
  price: number
  quantity: number
  total: number
}

export interface PaymentRecord {
  id: string
  date: string
  amount: number
  method: "cash" | "card" | "bank"
}

export interface Invoice {
  id: string
  number: string
  customerName: string
  customerPhone: string
  date: string
  items: InvoiceItem[]
  total: number
  paidAmount: number
  remainingAmount: number
  status: "paid" | "partial" | "credit" | "overdue" | "cancelled"
  paymentMethod: "cash" | "card" | "mixed" | "bank"
  cashier: string
  payments: PaymentRecord[]
}

export interface Expense {
  id: string
  title: string
  amount: number
  category: string
  paymentMethod: "cash" | "card" | "bank"
  date: string
  employee: string
  status: "approved" | "pending" | "rejected" | "review"
  notes?: string
  receipt?: string
  attachmentType?: "image" | "pdf"
  createdAt: string
  updatedAt: string
}

export const EXPENSE_CATEGORIES = [
  { id: "all", label: "الكل" },
  { id: "rent", label: "إيجار", color: "#F43F5E", icon: "Home" },
  { id: "salaries", label: "رواتب", color: "#8B5CF6", icon: "Users" },
  { id: "utilities", label: "مرافق (كهرباء/مياه)", color: "#0EA5E9", icon: "Zap" },
  { id: "maintenance", label: "صيانة", color: "#F59E0B", icon: "Wrench" },
  { id: "marketing", label: "تسويق", color: "#10B981", icon: "Megaphone" },
  { id: "supplies", label: "أدوات مكتبية", color: "#64748B", icon: "Paperclip" },
  { id: "other", label: "أخرى", color: "#94A3B8", icon: "MoreHorizontal" },
]

export const EXPENSES: Expense[] = [
  {
    id: "EXP-001",
    title: "إيجار المعرض - شهر مايو",
    amount: 15000,
    category: "rent",
    paymentMethod: "bank",
    date: "2026-05-01T09:00:00Z",
    employee: "أحمد كمال",
    status: "approved",
    notes: "تم التحويل للبنك الأهلي المصري - فرع التجمع",
    createdAt: "2026-05-01T09:00:00Z",
    updatedAt: "2026-05-01T10:30:00Z"
  },
  {
    id: "EXP-002",
    title: "فاتورة كهرباء المعرض",
    amount: 1250,
    category: "utilities",
    paymentMethod: "cash",
    date: "2026-05-05T14:30:00Z",
    employee: "سارة محمد",
    status: "approved",
    createdAt: "2026-05-05T14:30:00Z",
    updatedAt: "2026-05-05T14:35:00Z"
  },
  {
    id: "EXP-003",
    title: "أوراق طباعة وأحبار HP",
    amount: 450,
    category: "supplies",
    paymentMethod: "cash",
    date: "2026-05-08T11:15:00Z",
    employee: "محمد علي",
    status: "approved",
    createdAt: "2026-05-08T11:15:00Z",
    updatedAt: "2026-05-08T11:20:00Z"
  },
  {
    id: "EXP-004",
    title: "صيانة التكييف المركزي",
    amount: 800,
    category: "maintenance",
    paymentMethod: "card",
    date: "2026-05-10T10:00:00Z",
    employee: "أحمد كمال",
    status: "pending",
    notes: "في انتظار الفني لإصدار الفاتورة النهائية",
    createdAt: "2026-05-10T10:00:00Z",
    updatedAt: "2026-05-10T10:00:00Z"
  },
  {
    id: "EXP-005",
    title: "حملة إعلانات فيسبوك وإنستجرام",
    amount: 2500,
    category: "marketing",
    paymentMethod: "card",
    date: "2026-05-11T16:20:00Z",
    employee: "سارة محمد",
    status: "review",
    createdAt: "2026-05-11T16:20:00Z",
    updatedAt: "2026-05-11T16:25:00Z"
  },
  {
    id: "EXP-006",
    title: "وجبات ضيافة لعملاء VIP",
    amount: 320,
    category: "other",
    paymentMethod: "cash",
    date: "2026-05-12T13:00:00Z",
    employee: "محمد علي",
    status: "approved",
    createdAt: "2026-05-12T13:00:00Z",
    updatedAt: "2026-05-12T13:05:00Z"
  },
  {
    id: "EXP-007",
    title: "اشتراك إنترنت فايبر - فودافون",
    amount: 650,
    category: "utilities",
    paymentMethod: "bank",
    date: "2026-05-12T15:00:00Z",
    employee: "سارة محمد",
    status: "approved",
    createdAt: "2026-05-12T15:00:00Z",
    updatedAt: "2026-05-12T15:10:00Z"
  }
]

export const INVOICES: Invoice[] = [
  {
    id: "INV-001",
    number: "#84920",
    customerName: "محمد أحمد علي",
    customerPhone: "01234567890",
    date: "2026-05-09T14:30:00Z",
    items: [
      { id: "1", name: "جوتن فينوماستيك مائي مطفي - 10 لتر", price: 1250, quantity: 2, total: 2500 },
      { id: "3", name: "معجون جوتن داخلي - 20 كجم", price: 320, quantity: 5, total: 1600 }
    ],
    total: 4100,
    paidAmount: 4100,
    remainingAmount: 0,
    status: "paid",
    paymentMethod: "cash",
    cashier: "أحمد كمال",
    payments: [
      { id: "P1", date: "2026-05-09T14:30:00Z", amount: 4100, method: "cash" }
    ]
  },
  {
    id: "INV-002",
    number: "#84921",
    customerName: "شركة النور للمقاولات",
    customerPhone: "01002233445",
    date: "2026-05-09T10:15:00Z",
    items: [
      { id: "6", name: "جوتن جوتاشيلد خارجي - 15 لتر", price: 2450, quantity: 4, total: 9800 }
    ],
    total: 9800,
    paidAmount: 3000,
    remainingAmount: 6800,
    status: "partial",
    paymentMethod: "mixed",
    cashier: "سارة محمد",
    payments: [
      { id: "P2", date: "2026-05-09T10:15:00Z", amount: 2000, method: "cash" },
      { id: "P3", date: "2026-05-09T10:20:00Z", amount: 1000, method: "bank" }
    ]
  },
  {
    id: "INV-003",
    number: "#84922",
    customerName: "إبراهيم حسن كمال",
    customerPhone: "01112223334",
    date: "2026-05-08T18:45:00Z",
    items: [
      { id: "4", name: "فرشاة دهان احترافية - 4 بوصة", price: 85, quantity: 10, total: 850 }
    ],
    total: 850,
    paidAmount: 0,
    remainingAmount: 850,
    status: "credit",
    paymentMethod: "cash",
    cashier: "أحمد كمال",
    payments: []
  },
  {
    id: "INV-004",
    number: "#84915",
    customerName: "محمود سيد عثمان",
    customerPhone: "01556677889",
    date: "2026-05-01T12:00:00Z",
    items: [
      { id: "2", name: "جوتن سلك فينوماستيك - 3.6 لتر", price: 580, quantity: 3, total: 1740 }
    ],
    total: 1740,
    paidAmount: 500,
    remainingAmount: 1240,
    status: "overdue",
    paymentMethod: "cash",
    cashier: "محمد علي",
    payments: [
      { id: "P4", date: "2026-05-01T12:00:00Z", amount: 500, method: "cash" }
    ]
  },
  {
    id: "INV-005",
    number: "#84925",
    customerName: "عميل نقدي",
    customerPhone: "---",
    date: "2026-05-09T16:20:00Z",
    items: [
      { id: "10", name: "سكينة معجون ستانلس ستيل", price: 45, quantity: 2, total: 90 }
    ],
    total: 90,
    paidAmount: 90,
    remainingAmount: 0,
    status: "paid",
    paymentMethod: "cash",
    cashier: "أحمد كمال",
    payments: [
      { id: "P5", date: "2026-05-09T16:20:00Z", amount: 90, method: "cash" }
    ]
  }
]
