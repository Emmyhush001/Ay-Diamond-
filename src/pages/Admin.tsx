import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth, Permission } from '../context/AuthContext';
import { 
  Users, ShoppingCart, DollarSign, Package, TrendingUp, TrendingDown,
  LayoutDashboard, PieChart, MessageSquare, Settings, Bell, Search, Globe, ShieldCheck, Lock, AlertCircle, Download, History, Filter, Plus, Trash2, Edit3, GripVertical, Check, X, Minus, ChevronRight, Info, Phone, Mail, MapPin
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Cell
} from 'recharts';

const SALES_DATA = [
  { name: 'Mon', sales: 120000, orders: 45 },
  { name: 'Tue', sales: 155000, orders: 52 },
  { name: 'Wed', sales: 140000, orders: 48 },
  { name: 'Thu', sales: 190000, orders: 68 },
  { name: 'Fri', sales: 250000, orders: 94 },
  { name: 'Sat', sales: 380000, orders: 128 },
  { name: 'Sun', sales: 320000, orders: 112 },
];

const CATEGORY_PERFORMANCE = [
  { name: 'Cakes', value: 45, color: '#D4AF37' },
  { name: 'Ice Cream', value: 30, color: '#3E2723' },
  { name: 'Doughnuts', value: 15, color: '#EBD5C1' },
  { name: 'Milkshakes', value: 10, color: '#FCE4EC' },
];

const RECENT_CUSTOMERS = [
  { id: 'C1', name: 'Amara Okafor', totalSpent: '₦45,000', lastOrder: '2024-05-07', items: 12, loyalty: 'Platinum' },
  { id: 'C2', name: 'Babatunde Raji', totalSpent: '₦120,500', lastOrder: '2024-05-08', items: 8, loyalty: 'Gold' },
  { id: 'C3', name: 'Zainab Musa', totalSpent: '₦15,000', lastOrder: '2024-05-06', items: 3, loyalty: 'Silver' },
];

export const Admin: React.FC = () => {
  const { user, roles, currentRole, setRole, updateRoles } = useAuth();
  const [activeTab, setActiveTab] = React.useState<Permission>('overview');
  
  // Dashboard Customization State
  const [dashConfig, setDashConfig] = React.useState(() => {
    const saved = localStorage.getItem('diamond_dash_config');
    return saved ? JSON.parse(saved) : {
      density: 'comfortable' as 'compact' | 'comfortable',
      theme: 'glass' as 'glass' | 'solid',
      showRevenue: true,
      widgetOrder: ['revenue', 'orders', 'retention', 'inventory']
    };
  });

  React.useEffect(() => {
    localStorage.setItem('diamond_dash_config', JSON.stringify(dashConfig));
  }, [dashConfig]);

  // Inventory & Alerts
  const [inventory, setInventory] = React.useState(() => {
    const saved = localStorage.getItem('diamond_inventory');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Madagascar Vanilla Bean', stock: 12, threshold: 20, unit: 'KG' },
      { id: '2', name: 'Belgian Dark Chocolate', stock: 45, threshold: 30, unit: 'KG' },
      { id: '3', name: 'Gold Leaf Sheets', stock: 5, threshold: 10, unit: 'Packs' },
      { id: '4', name: 'Gluten-Free Flour', stock: 80, threshold: 50, unit: 'KG' },
    ];
  });

  const [notifications, setNotifications] = React.useState<{id: string, msg: string, type: 'alert' | 'info'}[]>([]);

  // Inventory Editing State
  const [editingInventoryId, setEditingInventoryId] = React.useState<string | null>(null);
  const [editForm, setEditForm] = React.useState({ name: '', stock: 0, threshold: 0 });
  const [adjustmentId, setAdjustmentId] = React.useState<string | null>(null);
  const [adjustmentValue, setAdjustmentValue] = React.useState<string>('');

  // Order Details State
  const [selectedOrder, setSelectedOrder] = React.useState<any | null>(null);

  React.useEffect(() => {
    localStorage.setItem('diamond_inventory', JSON.stringify(inventory));
    
    // Trigger in-app notifications for low stock
    const lowStock = inventory.filter((item: any) => item.stock < item.threshold);
    if (lowStock.length > 0) {
      setNotifications(prev => {
        const newNotifs = lowStock.map((item: any) => ({
          id: `low-${item.id}`,
          msg: `Critical Alert: ${item.name} is below threshold (${item.stock}/${item.threshold}).`,
          type: 'alert' as const
        }));
        // Filter out duplicates
        const unique = [...prev];
        newNotifs.forEach(n => {
          if (!unique.find(u => u.id === n.id)) unique.push(n);
        });
        return unique;
      });
    }
  }, [inventory]);

  const lowStockItems = inventory.filter((item: any) => item.stock < item.threshold);

  const startEditingInventory = (item: any) => {
    setEditingInventoryId(item.id);
    setEditForm({ name: item.name, stock: item.stock, threshold: item.threshold });
  };

  const saveInventoryEdit = () => {
    setInventory((prev: any) => prev.map((item: any) => 
      item.id === editingInventoryId ? { ...item, ...editForm } : item
    ));
    setEditingInventoryId(null);
    setNotifications(prev => [...prev, { id: `save-${Date.now()}`, msg: `Inventory refined: ${editForm.name} updated.`, type: 'info' }]);
  };

  const updateStock = (id: string, delta: number) => {
    setInventory((prev: any) => prev.map((item: any) => 
      item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
    ));
  };

  const applyAdjustment = (id: string) => {
    const val = parseInt(adjustmentValue);
    if (!isNaN(val)) {
      updateStock(id, val);
      setAdjustmentId(null);
      setAdjustmentValue('');
    }
  };

  // Permission Logic
  const canViewRevenue = currentRole.permissions.includes('analytics') && dashConfig.showRevenue;
  const hasPermission = (p: Permission) => currentRole.permissions.includes(p);

  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setNotifications(prev => [
      ...prev, 
      { id: `exp-${Date.now()}`, msg: `Success: ${filename} report exported to CSV.`, type: 'info' }
    ]);
  };

  return (
    <div className={cn(
      "bg-diamond-cream min-h-screen flex relative z-10 transition-all duration-500",
      dashConfig.density === 'compact' ? "text-[0.9em]" : "text-[1em]"
    )}>
      {/* Role Switcher Floating (Demo Only) */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2 glass p-4 rounded-3xl shadow-2xl border border-white/50">
        <p className="text-[9px] font-black uppercase text-diamond-brown/50 tracking-widest text-center mb-2">Simulate Access</p>
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={() => setRole(r.id)}
            className={cn(
              "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
              currentRole.id === r.id ? "bg-diamond-brown text-white" : "hover:bg-diamond-brown/5 text-diamond-brown/50"
            )}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Sidebar */}
      <aside className="w-64 glass-dark text-white p-8 hidden md:flex flex-col space-y-12 border-r border-white/10">
          <div className="flex flex-col">
            <span className="text-diamond-gold font-serif text-lg font-bold tracking-widest leading-none">DIAMOND CORE</span>
            <span className="text-[8px] uppercase tracking-[0.3em] opacity-40 font-black mt-1">v2.1 Enterprise</span>
          </div>
          
          <nav className="flex-1 space-y-8">
             <div className="space-y-4">
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20">Operations</p>
                <div className="space-y-2">
                   {[
                     { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                     { id: 'orders', icon: ShoppingCart, label: 'Orders' },
                     { id: 'inventory', icon: Package, label: 'Inventory', alert: lowStockItems.length > 0 },
                   ].map((item) => {
                     if (!hasPermission(item.id as Permission)) return null;

                     return (
                       <button
                         key={item.id}
                         onClick={() => setActiveTab(item.id as Permission)}
                         className={cn(
                           "w-full flex items-center justify-between text-xs font-bold py-3 px-4 rounded-2xl cursor-pointer transition-all",
                           activeTab === item.id 
                            ? "bg-diamond-gold text-diamond-brown shadow-lg shadow-diamond-gold/20" 
                            : "hover:bg-white/5 text-white/60 hover:text-white"
                         )}
                       >
                          <div className="flex items-center gap-3">
                            <item.icon size={16} />
                            <span>{item.label}</span>
                          </div>
                          {item.alert && activeTab !== 'inventory' && (
                            <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping shadow-sm" />
                          )}
                       </button>
                     );
                   })}
                </div>
             </div>
             
             <div className="space-y-4">
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20">Intelligence</p>
                <div className="space-y-2">
                  {[
                    { id: 'analytics', icon: PieChart, label: 'Analytics' },
                    { id: 'settings', icon: Settings, label: 'Settings' },
                  ].map((item) => {
                    if (!hasPermission(item.id as Permission)) return null;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as Permission)}
                        className={cn(
                          "w-full flex items-center gap-3 text-xs font-bold py-3 px-4 rounded-2xl cursor-pointer transition-all",
                          activeTab === item.id ? "bg-diamond-gold text-diamond-brown shadow-lg" : "hover:bg-white/5 text-white/60 hover:text-white"
                        )}
                      >
                          <item.icon size={16} />
                          <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
             </div>
          </nav>

          <div className="pt-8 border-t border-white/5 space-y-4">
              <button 
                onClick={() => setDashConfig(prev => ({ ...prev, density: prev.density === 'compact' ? 'comfortable' : 'compact' }))}
                className="w-full flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-diamond-gold transition-colors"
              >
                <LayoutDashboard size={14} />
                <span>Density: {dashConfig.density}</span>
              </button>
          </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
          {/* Admin Header */}
          <header className="glass border-b border-white/20 px-10 py-6 flex items-center justify-between sticky top-0 z-30">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-serif font-black text-diamond-brown tracking-tight">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 border border-emerald-500/20">
                     <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                     <span>System Live</span>
                  </span>
                  {lowStockItems.length > 0 && (
                     <span className="px-3 py-1 bg-rose-500/10 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 border border-rose-500/20">
                        <AlertCircle size={10} />
                        <span>{lowStockItems.length} Low Stock Alerts</span>
                     </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-6">
                 <div className="flex items-center space-x-2 p-1 glass rounded-full">
                    <button 
                      onClick={() => setDashConfig(p => ({ ...p, theme: 'glass' }))}
                      className={cn("px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all", dashConfig.theme === 'glass' ? "bg-diamond-brown text-white" : "text-diamond-brown/40")}
                    >Glass</button>
                    <button 
                      onClick={() => setDashConfig(p => ({ ...p, theme: 'solid' }))}
                      className={cn("px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all", dashConfig.theme === 'solid' ? "bg-diamond-brown text-white" : "text-diamond-brown/40")}
                    >Solid</button>
                 </div>
                 <div className="flex items-center space-x-4 pl-6 border-l border-diamond-brown/5">
                    <div className="text-right">
                       <p className="text-xs font-black text-diamond-brown">{user?.name}</p>
                       <p className="text-[10px] text-diamond-brown/40 font-black uppercase tracking-widest">{currentRole.name}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-diamond-brown flex items-center justify-center text-white font-serif font-bold text-lg shadow-xl border-2 border-white">
                       {currentRole.name.charAt(0)}
                    </div>
                 </div>
              </div>
          </header>

          <div className="p-10 space-y-10">
              {activeTab === 'overview' && (
                <>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {[
                        { id: 'revenue', label: 'Weekly Revenue', value: '₦1,555,000', trend: '+12.5%', isUp: true, icon: DollarSign, hidden: !canViewRevenue },
                        { id: 'orders', label: 'Active Orders', value: '48', trend: '+4', isUp: true, icon: ShoppingCart },
                        { id: 'retention', label: 'Retention Rate', value: '78.2%', trend: '-2.1%', isUp: false, icon: Users },
                        { id: 'inventory', label: 'Low Stock Items', value: lowStockItems.length.toString(), sub: 'Alert Triggered', icon: Package, isAlert: lowStockItems.length > 0 },
                      ].sort((a, b) => dashConfig.widgetOrder.indexOf(a.id) - dashConfig.widgetOrder.indexOf(b.id))
                       .filter(s => !s.hidden).map((stat, i) => (
                        <motion.div 
                          key={stat.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={cn(
                            "p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-2xl transition-all border",
                            dashConfig.theme === 'glass' ? "glass border-white/20" : "bg-white border-stone-100",
                            stat.isAlert ? "border-rose-500/20" : ""
                          )}
                        >
                          <div className="relative z-10 flex flex-col justify-between h-full">
                              <div className="flex items-center justify-between mb-8">
                                <div className={cn(
                                  "w-12 h-12 rounded-2xl flex items-center justify-center",
                                  stat.isAlert ? "bg-rose-500/10 text-rose-500" : "bg-diamond-gold/10 text-diamond-gold"
                                )}>
                                    <stat.icon size={24} strokeWidth={2} />
                                </div>
                                {stat.trend && (
                                  <div className={cn("text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1", stat.isUp ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-rose-500/10 text-rose-600 border border-rose-500/20")}>
                                      {stat.isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                      <span>{stat.trend}</span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <h4 className="text-[10px] uppercase font-black tracking-widest text-diamond-brown/30 mb-2">{stat.label}</h4>
                                <p className="text-3xl font-serif font-black text-diamond-brown tracking-tight">{stat.value}</p>
                                {stat.sub && <p className={cn("text-[10px] uppercase tracking-widest font-black mt-2", stat.isAlert ? "text-rose-500" : "text-diamond-gold")}>{stat.sub}</p>}
                              </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {canViewRevenue ? (
                          <div className={cn("lg:col-span-2 p-10 rounded-[3rem] space-y-10 border", dashConfig.theme === 'glass' ? "glass border-white/20" : "bg-white border-stone-100")}>
                             <div className="flex items-center justify-between">
                                <div>
                                   <h3 className="text-xl font-serif font-black text-diamond-brown">Revenue Trajectory</h3>
                                   <p className="text-[10px] font-black uppercase tracking-widest text-diamond-brown/30">Weekly comparative sales analysis</p>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                                   <span className="flex items-center gap-2 font-black"><span className="w-2 h-2 rounded-full bg-diamond-gold" /> <span className="text-diamond-gold">Revenue</span></span>
                                </div>
                             </div>
                             <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                   <AreaChart data={SALES_DATA}>
                                      <defs>
                                         <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                                         </linearGradient>
                                      </defs>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBD5C1" />
                                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#3E2723', fontWeight: 'bold' }} dy={10} />
                                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#3E2723', fontWeight: 'bold' }} />
                                      <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }} />
                                      <Area type="monotone" dataKey="sales" stroke="#D4AF37" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                                   </AreaChart>
                                </ResponsiveContainer>
                             </div>
                          </div>
                        ) : (
                          <div className={cn("lg:col-span-2 p-20 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-4 border", dashConfig.theme === 'glass' ? "glass border-white/20" : "bg-white border-stone-100")}>
                             <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center text-stone-300">
                                <Lock size={40} />
                             </div>
                             <h3 className="text-2xl font-serif font-black text-diamond-brown">Restricted Data</h3>
                             <p className="text-xs text-diamond-brown/50 font-medium max-w-xs">Revenue analytics are reserved for Management personnel.</p>
                          </div>
                        )}

                        <div className={cn("p-10 rounded-[3rem] space-y-8 flex flex-col border", dashConfig.theme === 'glass' ? "glass border-white/20" : "bg-white border-stone-100")}>
                           <h3 className="text-xl font-serif font-black text-diamond-brown">Category Mix</h3>
                           <div className="h-[300px] flex items-center justify-center relative">
                              <ResponsiveContainer width="100%" height="100%">
                                 <BarChart data={CATEGORY_PERFORMANCE} layout="vertical">
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'black', fill: '#3E2723' }} />
                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '24px' }} />
                                    <Bar dataKey="value" radius={[0, 20, 20, 0]}>
                                       {CATEGORY_PERFORMANCE.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.color} />
                                       ))}
                                    </Bar>
                                 </BarChart>
                              </ResponsiveContainer>
                           </div>
                           <div className="space-y-4 pt-6 border-t border-diamond-brown/5">
                              {CATEGORY_PERFORMANCE.map((cat, i) => (
                                 <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                       <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: cat.color }} />
                                       <span className="text-[10px] font-black text-diamond-brown/50 uppercase tracking-widest">{cat.name}</span>
                                    </div>
                                    <span className="text-xs font-black text-diamond-brown">{cat.value}%</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                  </div>
                </>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-8">
                  <div className={cn("p-10 rounded-[3rem] border", dashConfig.theme === 'glass' ? "glass border-white/20" : "bg-white border-stone-100")}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                      <div>
                        <h3 className="text-2xl font-serif font-black text-diamond-brown">Order Management</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-diamond-brown/30 mt-1">Live transaction monitoring & fulfillment</p>
                      </div>
                      <div className="flex gap-4">
                         <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-diamond-brown/30" size={16} />
                            <input 
                              type="text" 
                              placeholder="Search Order ID..." 
                              className="pl-12 pr-6 py-3 glass rounded-full text-xs font-bold outline-none focus:ring-2 ring-diamond-gold/20 w-64"
                            />
                         </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto -mx-10 px-10">
                       <table className="w-full text-left min-w-[800px]">
                          <thead className="bg-diamond-beige/10 text-[10px] font-black uppercase tracking-widest text-diamond-brown/40">
                             <tr>
                                <th className="px-6 py-6 rounded-l-3xl">ID</th>
                                <th className="px-6 py-6">Identity</th>
                                <th className="px-6 py-6">Composition</th>
                                <th className="px-6 py-6">Valuation</th>
                                <th className="px-6 py-6">History</th>
                                <th className="px-6 py-6 text-right rounded-r-3xl">State</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-diamond-brown/5">
                             {[
                               { 
                                 id: '#DIA-9042', 
                                 name: 'Chioma A.', 
                                 customer: {
                                    email: 'chioma.a@example.com',
                                    phone: '+234 803 123 4567',
                                    address: 'Block 4, Flat 12, Lekki Phase 1, Lagos'
                                 },
                                 items: 'Signature Cake, 2x Gelato', 
                                 details: [
                                    { name: 'Diamond Signature Cake', quantity: 1, flavor: 'Madagascar Vanilla', size: 'Medium (8")' },
                                    { name: 'Artisan Gelato', quantity: 2, flavor: 'Sicilian Pistachio', size: 'Single Scoop' }
                                 ],
                                 price: '₦32,000', 
                                 status: 'Delivered', 
                                 time: '14:20', 
                                 color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                               },
                               { 
                                 id: '#DIA-9041', 
                                 name: 'Ifunanya K.', 
                                 customer: {
                                    email: 'ifunanya.k@gmail.com',
                                    phone: '+234 901 987 6543',
                                    address: 'Plot 45, Garki Area 2, Abuja'
                                 },
                                 items: 'Doughnut Box (6)', 
                                 details: [
                                    { name: 'Diamond Doughnut Box', quantity: 1, flavor: 'Assorted Gourmet', size: 'Box of 6' }
                                 ],
                                 price: '₦10,800', 
                                 status: 'Processing', 
                                 time: '14:45', 
                                 color: 'bg-diamond-gold/10 text-diamond-gold border-diamond-gold/20' 
                               },
                               { 
                                 id: '#DIA-9040', 
                                 name: 'Olawale B.', 
                                 customer: {
                                    email: 'olawale.b@yahoo.com',
                                    phone: '+234 812 345 6789',
                                    address: '15 Admiralty Way, Lekki, Lagos'
                                 },
                                 items: 'Vanilla Gelato Pint', 
                                 details: [
                                    { name: 'Vanilla Gelato', quantity: 1, flavor: 'French Vanilla', size: 'Pint' }
                                 ],
                                 price: '₦8,500', 
                                 status: 'Transit', 
                                 time: '15:10', 
                                 color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' 
                               },
                               { 
                                 id: '#DIA-9039', 
                                 name: 'Amara O.', 
                                 customer: {
                                    email: 'amara.okafor@outlook.com',
                                    phone: '+234 706 555 4433',
                                    address: 'Trans-Amadi Layout, Port Harcourt'
                                 },
                                 items: 'Custom Wedding Cake', 
                                 details: [
                                    { name: 'Gold Tier Wedding Cake', quantity: 1, flavor: 'Red Velvet', size: '3-Tier Grand' }
                                 ],
                                 price: '₦145,000', 
                                 status: 'Pending', 
                                 time: '15:30', 
                                 color: 'bg-stone-500/10 text-stone-600 border-stone-500/20' 
                               },
                             ].map((order, i) => (
                               <tr 
                                key={i} 
                                onClick={() => setSelectedOrder(order)}
                                className="hover:bg-white/40 transition-colors group cursor-pointer"
                               >
                                  <td className="px-6 py-8 font-black text-diamond-brown text-sm">{order.id}</td>
                                  <td className="px-6 py-8">
                                     <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-diamond-brown/5 flex items-center justify-center text-[10px] font-black text-diamond-brown">
                                           {order.name.charAt(0)}
                                        </div>
                                        <span className="text-sm font-bold">{order.name}</span>
                                     </div>
                                  </td>
                                  <td className="px-6 py-8 text-xs font-medium text-diamond-brown/40 uppercase tracking-wide max-w-[200px] truncate">{order.items}</td>
                                  <td className="px-6 py-8 font-black text-diamond-brown text-sm">{order.price}</td>
                                  <td className="px-6 py-8 text-[10px] font-black text-diamond-brown/30">{order.time} Today</td>
                                  <td className="px-6 py-8 text-right">
                                     <div className="flex items-center justify-end gap-3">
                                        <span className={cn("px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border", order.color)}>
                                           {order.status}
                                        </span>
                                        <ChevronRight size={14} className="text-stone-300 group-hover:text-diamond-gold group-hover:translate-x-1 transition-all" />
                                     </div>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'inventory' && (
                <div className={cn("p-10 rounded-[3rem] border", dashConfig.theme === 'glass' ? "glass border-white/20" : "bg-white border-stone-100")}>
                    <div className="flex justify-between items-center mb-10">
                      <div>
                        <h3 className="text-2xl font-serif font-black text-diamond-brown">Inventory Management</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-diamond-brown/30 mt-1">Real-time stock tracking & low-stock alerts</p>
                      </div>
                      <button className="px-8 py-3 bg-diamond-brown text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-diamond-gold transition-all">
                        Restock Request
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                      {inventory.map((item: any) => {
                        const isEditing = editingInventoryId === item.id;
                        const isAdjusting = adjustmentId === item.id;
                        
                        return (
                          <div key={item.id} className={cn(
                            "p-6 rounded-[2.5rem] border transition-all relative group overflow-hidden",
                            item.stock < item.threshold ? "bg-rose-500/5 border-rose-500/20" : "bg-white border-stone-100 shadow-sm"
                          )}>
                             <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={cn(
                                  "w-10 h-10 rounded-xl flex items-center justify-center",
                                  item.stock < item.threshold ? "bg-rose-500/10 text-rose-500" : "bg-diamond-brown/5 text-diamond-brown/20"
                                )}>
                                    <Package size={20} />
                                </div>
                                <div className="flex gap-2">
                                  {isEditing ? (
                                    <button onClick={saveInventoryEdit} className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                                      <Check size={14} />
                                    </button>
                                  ) : (
                                    <button onClick={() => startEditingInventory(item)} className="p-2 text-stone-400 hover:bg-stone-50 rounded-lg transition-colors">
                                      <Edit3 size={14} />
                                    </button>
                                  )}
                                </div>
                             </div>

                             {isEditing ? (
                               <div className="space-y-4 relative z-10">
                                  <div className="space-y-1">
                                     <p className="text-[9px] font-black uppercase text-stone-400 ml-1">Product Identity</p>
                                     <input 
                                       type="text" 
                                       value={editForm.name}
                                       onChange={(e) => setEditForm(p => ({ ...p, name: e.target.value }))}
                                       className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold focus:ring-2 ring-diamond-gold/20 outline-none"
                                     />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                     <div className="space-y-1">
                                        <p className="text-[9px] font-black uppercase text-stone-400 ml-1">Stock</p>
                                        <input 
                                          type="number" 
                                          value={editForm.stock}
                                          onChange={(e) => setEditForm(p => ({ ...p, stock: parseInt(e.target.value) || 0 }))}
                                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold focus:ring-2 ring-diamond-gold/20 outline-none"
                                        />
                                     </div>
                                     <div className="space-y-1">
                                        <p className="text-[9px] font-black uppercase text-stone-400 ml-1">Min Threshold</p>
                                        <input 
                                          type="number" 
                                          value={editForm.threshold}
                                          onChange={(e) => setEditForm(p => ({ ...p, threshold: parseInt(e.target.value) || 0 }))}
                                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold focus:ring-2 ring-diamond-gold/20 outline-none"
                                        />
                                     </div>
                                  </div>
                               </div>
                             ) : (
                               <div className="relative z-10">
                                  <h4 className="text-sm font-black text-diamond-brown line-clamp-1 mb-1">{item.name}</h4>
                                  <div className="flex items-end gap-2 mb-6">
                                     <span className={cn("text-3xl font-black", item.stock < item.threshold ? "text-rose-500" : "text-diamond-brown")}>{item.stock}</span>
                                     <span className="text-[10px] font-black uppercase text-diamond-brown/30 mb-1.5">{item.unit}</span>
                                  </div>
                                  
                                  <div className="mt-4 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                     <div 
                                       className={cn("h-full rounded-full transition-all duration-1000", item.stock < item.threshold ? "bg-rose-500" : "bg-emerald-500")}
                                       style={{ width: `${Math.min((item.stock / (item.threshold * 2)) * 100, 100)}%` }}
                                     />
                                  </div>
                                  <p className="text-[8px] font-black uppercase tracking-widest text-diamond-brown/20 mt-2">Threshold Warning: {item.threshold}{item.unit}</p>

                                  <div className="mt-6 pt-6 border-t border-stone-50 flex items-center justify-between">
                                     <div className="flex bg-stone-50 rounded-xl p-1">
                                        <button onClick={() => updateStock(item.id, -1)} className="p-2 text-stone-400 hover:text-rose-500 transition-colors"><Minus size={14} /></button>
                                        <button onClick={() => updateStock(item.id, 1)} className="p-2 text-stone-400 hover:text-emerald-500 transition-colors"><Plus size={14} /></button>
                                     </div>
                                     <button 
                                      onClick={() => setAdjustmentId(item.id)}
                                      className="px-4 py-2 bg-diamond-brown/5 text-diamond-brown text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-diamond-brown hover:text-white transition-all"
                                     >
                                        Adjust
                                     </button>
                                  </div>
                               </div>
                             )}

                             {/* Manual Adjustment Input Overlay */}
                             <AnimatePresence>
                               {isAdjusting && (
                                 <motion.div 
                                   initial={{ opacity: 0, y: 10 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: 10 }}
                                   className="absolute inset-0 bg-diamond-brown/95 z-20 flex flex-col items-center justify-center p-6 text-center"
                                 >
                                    <button onClick={() => setAdjustmentId(null)} className="absolute top-4 right-4 text-white/40 hover:text-white"><X size={16} /></button>
                                    <p className="text-[10px] font-black uppercase text-white/50 tracking-widest mb-4">Manual Adjustment</p>
                                    <div className="flex gap-2 w-full max-w-[160px]">
                                       <input 
                                         type="number"
                                         autoFocus
                                         placeholder="+/- Val"
                                         value={adjustmentValue}
                                         onChange={(e) => setAdjustmentValue(e.target.value)}
                                         onKeyDown={(e) => e.key === 'Enter' && applyAdjustment(item.id)}
                                         className="flex-1 min-w-0 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white font-bold outline-none ring- diamond-gold focus:ring-2"
                                       />
                                       <button 
                                        onClick={() => applyAdjustment(item.id)}
                                        className="p-2 bg-diamond-gold text-diamond-brown rounded-xl font-black"
                                       >
                                          <Check size={16} />
                                       </button>
                                    </div>
                                    <p className="text-[8px] text-white/30 font-bold mt-2">Use negative sign to decrease stock</p>
                                 </motion.div>
                               )}
                             </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                </div>
              )}

              {activeTab === 'analytics' && hasPermission('analytics') && (
                <div className="space-y-8">
                  {/* Performance Analysis */}
                  <div className={cn("p-10 rounded-[3rem] border", dashConfig.theme === 'glass' ? "glass border-white/20" : "bg-white border-stone-100")}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                      <div>
                        <h3 className="text-2xl font-serif font-black text-diamond-brown">Strategic Intelligence</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-diamond-brown/30 mt-1">Cross-sectional business analysis</p>
                      </div>
                      <div className="flex flex-wrap gap-4">
                         <div className="flex items-center gap-2 px-6 py-2 glass rounded-full border-diamond-brown/5">
                            <Filter size={12} className="text-diamond-brown/40" />
                            <select className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer">
                               <option>Last 30 Days</option>
                               <option>Quarterly</option>
                               <option>Annually</option>
                            </select>
                         </div>
                         <button 
                           onClick={() => exportToCSV(SALES_DATA, 'Sales_Report')}
                           className="px-6 py-2 bg-diamond-brown text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-diamond-gold transition-all shadow-xl shadow-diamond-brown/10"
                         >
                            <Download size={14} /> Export Dataset
                         </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Product Combinations */}
                      <div className="space-y-8">
                        <div className="flex items-center justify-between border-b border-diamond-brown/5 pb-4">
                           <h4 className="text-xs font-black uppercase tracking-widest text-diamond-brown/40">Market Basket Analysis</h4>
                           <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded-md">Trending</span>
                        </div>
                        <div className="space-y-4">
                          {[
                            { pair: ["Vanilla Gold", "Red Velvet"], freq: "85%", density: "High", trend: "+12%" },
                            { pair: ["Dark Chocolate", "Double Espresso"], freq: "68%", density: "Medium", trend: "+5%" },
                            { pair: ["Cake Box", "Greeting Card"], freq: "55%", density: "Medium", trend: "-2%" },
                          ].map((item, i) => (
                            <div key={i} className="group p-6 glass-light rounded-[2rem] hover:shadow-lg transition-all border border-transparent hover:border-diamond-gold/20">
                               <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                     <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-diamond-gold" />
                                        <div className="w-8 h-8 rounded-full bg-diamond-brown" />
                                     </div>
                                     <div>
                                        <p className="text-xs font-black text-diamond-brown">{item.pair.join(' + ')}</p>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-diamond-brown/30">{item.density} Affinity</p>
                                     </div>
                                  </div>
                                  <div className="text-right">
                                     <p className="text-lg font-black text-diamond-brown">{item.freq}</p>
                                     <p className={cn("text-[9px] font-black", item.trend.startsWith('+') ? "text-emerald-500" : "text-rose-500")}>{item.trend}</p>
                                  </div>
                               </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customer Purchase History (Condensed Insights) */}
                      <div className="space-y-8">
                         <h4 className="text-xs font-black uppercase tracking-widest text-diamond-brown/40 border-b border-diamond-brown/5 pb-4">Customer Segment Pulse</h4>
                         <div className="space-y-6">
                            {RECENT_CUSTOMERS.map((customer, i) => (
                               <div key={i} className="flex items-center justify-between p-4 rounded-[1.5rem] hover:bg-stone-50 transition-colors">
                                  <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-diamond-brown font-serif font-black">
                                        {customer.name.charAt(0)}
                                     </div>
                                     <div>
                                        <p className="text-sm font-black text-diamond-brown">{customer.name}</p>
                                        <p className="text-[10px] font-black text-diamond-brown/30 uppercase tracking-widest">{customer.loyalty} Member</p>
                                     </div>
                                  </div>
                                  <div className="text-right">
                                     <p className="text-sm font-black text-diamond-brown">{customer.totalSpent}</p>
                                     <p className="text-[10px] font-black text-diamond-brown/30 uppercase tracking-widest">{customer.items} Purchases</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                         <button className="w-full py-4 border-2 border-dashed border-diamond-brown/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-diamond-brown/30 hover:border-diamond-gold hover:text-diamond-gold transition-all">
                            View Deep Customer Analytics
                         </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="space-y-10" id="settings-view">
                   <div className={cn("p-10 rounded-[3rem] border", dashConfig.theme === 'glass' ? "glass border-white/20" : "bg-white border-stone-100")}>
                      <div className="flex justify-between items-center mb-10">
                         <h3 className="text-2xl font-serif font-black text-diamond-brown">Role Management</h3>
                         <button 
                          onClick={() => {
                            const newRoleName = prompt('Enter role name:');
                            if (newRoleName) {
                              const newRole = { id: newRoleName.toLowerCase(), name: newRoleName, permissions: ['overview'] as Permission[] };
                              updateRoles([...roles, newRole]);
                            }
                          }}
                          className="px-6 py-2 bg-diamond-brown text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                         >
                            <Plus size={14} /> Create Role
                         </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {roles.map((r) => (
                           <div key={r.id} className="p-6 glass-light rounded-3xl border border-diamond-brown/5">
                              <div className="flex items-center justify-between mb-4">
                                 <h4 className="font-black text-diamond-brown">{r.name}</h4>
                                 <div className="flex items-center gap-2">
                                    <button className="p-2 hover:bg-white/50 rounded-lg transition-colors"><Edit3 size={12} /></button>
                                    <button 
                                      disabled={r.id === 'admin'}
                                      onClick={() => updateRoles(roles.filter(rl => rl.id !== r.id))}
                                      className="p-2 hover:bg-rose-500/10 text-rose-500 rounded-lg transition-colors disabled:opacity-20"
                                    ><Trash2 size={12} /></button>
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 {(['overview', 'orders', 'inventory', 'analytics', 'settings'] as Permission[]).map((p) => (
                                   <label key={p} className="flex items-center gap-3 cursor-pointer group">
                                      <input 
                                        type="checkbox" 
                                        checked={r.permissions.includes(p)}
                                        onChange={() => {
                                          const newPerms = r.permissions.includes(p) 
                                            ? r.permissions.filter(perm => perm !== p) 
                                            : [...r.permissions, p];
                                          updateRoles(roles.map(rl => rl.id === r.id ? { ...rl, permissions: newPerms as Permission[] } : rl));
                                        }}
                                        className="w-4 h-4 rounded border-diamond-brown/10 text-diamond-gold focus:ring-diamond-gold"
                                      />
                                      <span className="text-[10px] font-black uppercase tracking-widest text-diamond-brown/50 group-hover:text-diamond-brown transition-colors">
                                         {p}
                                      </span>
                                   </label>
                                 ))}
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className={cn("p-10 rounded-[3rem] border", dashConfig.theme === 'glass' ? "glass border-white/20" : "bg-white border-stone-100")}>
                      <h3 className="text-2xl font-serif font-black text-diamond-brown mb-10">Dashboard Layout & Customization</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                         <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-diamond-brown/30">Reorder Overview Widgets</h4>
                            <div className="space-y-3">
                               {dashConfig.widgetOrder.map((wid: string, index: number) => (
                                 <div key={wid} className="p-4 glass-light rounded-2xl flex items-center justify-between border border-transparent hover:border-diamond-gold/30 group">
                                    <div className="flex items-center gap-4">
                                       <GripVertical size={16} className="text-diamond-brown/20 cursor-grab active:cursor-grabbing" />
                                       <span className="text-xs font-black text-diamond-brown capitalize">{wid} Widget</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                       <button 
                                         onClick={() => {
                                           if (index === 0) return;
                                           const newOrder = [...dashConfig.widgetOrder];
                                           [newOrder[index-1], newOrder[index]] = [newOrder[index], newOrder[index-1]];
                                           setDashConfig({ ...dashConfig, widgetOrder: newOrder });
                                         }}
                                         className="p-2 hover:bg-stone-100 rounded-lg text-diamond-brown/40"
                                       >↑</button>
                                       <button 
                                         onClick={() => {
                                           if (index === dashConfig.widgetOrder.length - 1) return;
                                           const newOrder = [...dashConfig.widgetOrder];
                                           [newOrder[index+1], newOrder[index]] = [newOrder[index], newOrder[index+1]];
                                           setDashConfig({ ...dashConfig, widgetOrder: newOrder });
                                         }}
                                         className="p-2 hover:bg-stone-100 rounded-lg text-diamond-brown/40"
                                       >↓</button>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                         <div className="space-y-8">
                            <div>
                               <h4 className="text-[10px] font-black uppercase tracking-widest text-diamond-brown/30 mb-4">Inventory Alert Configuration</h4>
                               <div className="p-6 glass-light rounded-3xl space-y-4">
                                  {inventory.map((item: any) => (
                                    <div key={item.id} className="flex items-center justify-between">
                                       <span className="text-xs font-bold text-diamond-brown">{item.name}</span>
                                       <div className="flex items-center gap-3">
                                          <span className="text-[10px] font-black text-diamond-brown/30">Threshold:</span>
                                          <input 
                                            type="number" 
                                            value={item.threshold}
                                            onChange={(e) => setInventory(inventory.map((i: any) => i.id === item.id ? { ...i, threshold: parseInt(e.target.value) || 0 } : i))}
                                            className="w-16 px-2 py-1 bg-white border border-diamond-brown/10 rounded text-[10px] font-black outline-none focus:ring-1 ring-diamond-gold"
                                          />
                                          <span className="text-[10px] font-black text-diamond-brown/30 w-8">{item.unit}</span>
                                       </div>
                                    </div>
                                  ))}
                               </div>
                            </div>
                            <div>
                               <h4 className="text-[10px] font-black uppercase tracking-widest text-diamond-brown/30 mb-4">System Identity</h4>
                               <div className="flex items-center gap-4">
                                  <button onClick={() => setDashConfig({ ...dashConfig, theme: 'solid' })} className={cn("flex-1 py-4 rounded-2xl text-[10px] font-black uppercase border transition-all", dashConfig.theme === 'solid' ? "bg-diamond-brown text-white border-diamond-brown" : "bg-white text-diamond-brown/40 border-diamond-brown/10")}>Solid Architecture</button>
                                  <button onClick={() => setDashConfig({ ...dashConfig, theme: 'glass' })} className={cn("flex-1 py-4 rounded-2xl text-[10px] font-black uppercase border transition-all", dashConfig.theme === 'glass' ? "bg-diamond-brown text-white border-diamond-brown" : "bg-white text-diamond-brown/40 border-diamond-brown/10")}>Glass Layering</button>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className={cn("p-10 rounded-[3rem] border", dashConfig.theme === 'glass' ? "glass border-white/20" : "bg-white border-stone-100")}>
                      <h3 className="text-2xl font-serif font-black text-diamond-brown mb-10">Contact Information & Operations</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase text-stone-400 ml-1">WhatsApp Number</p>
                            <div className="flex items-center gap-3 glass-light p-4 rounded-2xl border border-stone-100">
                               <Phone size={16} className="text-emerald-500" />
                               <span className="text-sm font-bold text-diamond-brown">+234 916 142 5463</span>
                            </div>
                         </div>
                         <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase text-stone-400 ml-1">Support Email</p>
                            <div className="flex items-center gap-3 glass-light p-4 rounded-2xl border border-stone-100">
                               <Mail size={16} className="text-diamond-gold" />
                               <span className="text-sm font-bold text-diamond-brown truncate">Emayeayomide@gmail.com</span>
                            </div>
                         </div>
                         <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase text-stone-400 ml-1">Flagship Location</p>
                            <div className="flex items-center gap-3 glass-light p-4 rounded-2xl border border-stone-100">
                               <MapPin size={16} className="text-rose-500" />
                               <span className="text-sm font-bold text-diamond-brown">Okoafor Badagry Lagos</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              )}
          </div>
 
          {/* Order Details Modal */}
          <AnimatePresence>
            {selectedOrder && (
              <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedOrder(null)}
                  className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-4xl glass shadow-2xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row h-full max-h-[800px]"
                >
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="absolute top-8 right-8 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-stone-900 transition-all"
                  >
                    <X size={20} />
                  </button>

                  {/* Left Panel: Order Summary */}
                  <div className="w-full md:w-2/5 p-10 bg-diamond-brown text-white flex flex-col">
                     <div className="mb-10">
                        <span className="px-3 py-1 bg-white/10 text-diamond-gold rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Order Detail</span>
                        <h3 className="text-4xl font-serif font-black mt-4">{selectedOrder.id}</h3>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Placed Today at {selectedOrder.time}</p>
                     </div>

                     <div className="flex-1 space-y-8">
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Total Valuation</p>
                           <p className="text-4xl font-black text-diamond-gold">{selectedOrder.price}</p>
                        </div>
                        
                        <div className="space-y-4">
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Fulfillment Status</p>
                           <div className="flex items-center gap-4">
                              <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-diamond-gold rounded-full w-2/3" />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest">{selectedOrder.status}</span>
                           </div>
                        </div>
                     </div>

                     <div className="pt-8 border-t border-white/10">
                        <button className="w-full py-4 bg-diamond-gold text-diamond-brown rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-black/20">
                           Print Invoice
                        </button>
                     </div>
                  </div>

                  {/* Right Panel: Content */}
                  <div className="flex-1 overflow-y-auto p-10 bg-white/30">
                     <div className="space-y-12">
                        {/* Customer Info */}
                        <section>
                           <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-10 rounded-full bg-diamond-brown/5 flex items-center justify-center text-diamond-brown">
                                 <Users size={18} />
                              </div>
                              <h4 className="text-xs font-black uppercase tracking-widest text-diamond-brown">Customer Profile</h4>
                           </div>
                           <div className="grid grid-cols-2 gap-8 glass-light p-6 rounded-3xl border border-diamond-brown/5 shadow-sm">
                              <div>
                                 <p className="text-[8px] font-black uppercase text-diamond-brown/30 tracking-widest mb-1">Name</p>
                                 <p className="text-sm font-black text-diamond-brown">{selectedOrder.name}</p>
                              </div>
                              <div>
                                 <p className="text-[8px] font-black uppercase text-diamond-brown/30 tracking-widest mb-1">Contact</p>
                                 <p className="text-sm font-black text-diamond-brown">{selectedOrder.customer.phone}</p>
                              </div>
                              <div className="col-span-2">
                                 <p className="text-[8px] font-black uppercase text-diamond-brown/30 tracking-widest mb-1">Delivery Intelligence</p>
                                 <p className="text-sm font-medium text-diamond-brown/60 leading-relaxed">{selectedOrder.customer.address}</p>
                              </div>
                           </div>
                        </section>

                        {/* Items List */}
                        <section>
                           <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-10 rounded-full bg-diamond-brown/5 flex items-center justify-center text-diamond-brown">
                                 <ShoppingCart size={18} />
                              </div>
                              <h4 className="text-xs font-black uppercase tracking-widest text-diamond-brown">Product Composition</h4>
                           </div>
                           <div className="space-y-3">
                              {selectedOrder.details?.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-4 p-4 glass-light rounded-2xl border border-stone-100 hover:border-diamond-gold/30 transition-all group">
                                   <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-stone-300 font-serif font-black text-xl">
                                      {item.quantity}×
                                   </div>
                                   <div className="flex-1">
                                      <p className="text-sm font-black text-diamond-brown">{item.name}</p>
                                      <div className="flex items-center gap-2 mt-1">
                                         {item.flavor && <span className="text-[9px] font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">{item.flavor}</span>}
                                         {item.size && <span className="text-[9px] font-black uppercase tracking-widest text-stone-500 bg-stone-50 px-2 py-0.5 rounded border border-stone-100">{item.size}</span>}
                                      </div>
                                   </div>
                                   <div className="text-right">
                                      <Info size={14} className="text-stone-300 group-hover:text-diamond-gold transition-colors" />
                                   </div>
                                </div>
                              ))}
                           </div>
                        </section>

                        {/* Internal Notes */}
                        <section>
                           <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                                 <MessageSquare size={14} />
                              </div>
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400">Internal Remarks</h4>
                           </div>
                           <textarea 
                             placeholder="Add a private note to this order..."
                             className="w-full p-4 bg-transparent border-2 border-dashed border-stone-200 rounded-3xl text-sm italic focus:border-diamond-gold outline-none min-h-[100px] transition-all"
                           />
                        </section>
                     </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Fixed Notification Area */}
          <div className="fixed top-24 right-10 z-[60] w-80 space-y-3 pointer-events-none">
             {notifications.map((n) => (
                <motion.div 
                  key={n.id}
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={cn(
                    "p-4 rounded-2xl shadow-xl border border-white/50 backdrop-blur-xl pointer-events-auto flex items-start gap-3",
                    n.type === 'alert' ? "bg-rose-500/90 text-white" : "bg-emerald-600/90 text-white"
                  )}
                >
                   {n.type === 'alert' ? <AlertCircle size={18} /> : <Check size={18} />}
                   <div className="flex-1">
                      <p className="text-[11px] font-black leading-tight">{n.msg}</p>
                      <button 
                        onClick={() => setNotifications(prev => prev.filter(nn => nn.id !== n.id))}
                        className="text-[9px] font-black uppercase tracking-widest mt-2 opacity-50 hover:opacity-100 transition-opacity"
                      >Dismiss</button>
                   </div>
                </motion.div>
             ))}
          </div>
      </main>
    </div>
  );
};


