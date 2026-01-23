import React, { useState } from 'react';
import {
  BarChart3,
  Phone,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  LayoutGrid,
  Calendar,
  Bell,
  User,
  Megaphone,
  Headphones,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  ExternalLink
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar
} from 'recharts';

// --- Mock Data ---

const kpiData = [
  { label: 'Total Attributed Revenue', value: '$1,240,500', trend: '+8.2%', isPositive: true },
  { label: 'Ad Budget Spent', value: '$85,200', trend: '+12.4%', isPositive: false },
  { label: 'Marketing ROAS', value: '14.5x', trend: '+2.1%', isPositive: true },
  { label: 'New RO Revenue', value: '$842,000', trend: '+4.1%', isPositive: true },
  { label: 'Repeat RO Revenue', value: '$398,500', trend: '-1.5%', isPositive: false },
  { label: 'Bookings Created', value: '2,412', trend: '+12%', isPositive: true },
  { label: 'Answer Rate', value: '94.2%', trend: '+0.5%', isPositive: true },
  { label: 'Avg Customer Rating', value: '4.8', trend: '0.0%', isPositive: null },
];

const insightsData = [
  {
    id: 1,
    type: 'critical',
    text: 'Missed calls increased 18% in Outlet 02 → estimated booking loss $42,000',
    timestamp: '2h ago'
  },
  {
    id: 2,
    type: 'warning',
    text: 'Declined estimate win-backs not running for 5 days due to integration timeout.',
    timestamp: '5h ago'
  },
  {
    id: 3,
    type: 'optimization',
    text: 'Lead response median 3h → target under 15 min. Recommend adjusting roster.',
    timestamp: '1d ago'
  },
];

const chartData = [
  { name: 'Week 1', revenue: 240000, bookings: 450, spend: 18000 },
  { name: 'Week 2', revenue: 310000, bookings: 580, spend: 22500 },
  { name: 'Week 3', revenue: 280000, bookings: 510, spend: 21000 },
  { name: 'Week 4', revenue: 410500, bookings: 872, spend: 23700 },
];

const leakageData = [
  { category: 'Missed Calls', count: 142, impact: '$32,400', severity: 'High' },
  { category: 'Unworked Leads', count: 88, impact: '$18,500', severity: 'Medium' },
  { category: 'No-Shows', count: 54, impact: '$12,200', severity: 'Low' },
  { category: 'Declined Est. Pending', count: 210, impact: '$64,000', severity: 'Critical' },
  { category: 'Low Review Volume', count: 12, impact: 'N/A', severity: 'Low' },
];

const outletData = [
  { name: 'Outlet 01 (Downtown)', answerRate: '96%', bookings: 840, repeat: '$140k', rating: 4.9 },
  { name: 'Outlet 02 (Westside)', answerRate: '82%', bookings: 610, repeat: '$112k', rating: 4.4 },
  { name: 'Outlet 03 (North)', answerRate: '91%', bookings: 720, repeat: '$128k', rating: 4.7 },
];

// --- Components ---

const Badge = ({ children, type = 'neutral' }) => {
  const styles = {
    neutral: 'bg-slate-100 text-slate-600',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    critical: 'bg-rose-100 text-rose-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[type]}`}>
      {children}
    </span>
  );
};

const KpiCard = ({ item }) => (
  <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-1">
      <p className="text-slate-500 text-sm font-medium">{item.label}</p>
    </div>
    <div className="flex items-baseline justify-between">
      <h3 className="text-2xl font-semibold text-slate-900">{item.value}</h3>
      <div className={`flex items-center text-xs font-medium ${item.isPositive === true ? 'text-emerald-600' :
        item.isPositive === false ? 'text-rose-600' : 'text-slate-400'
        }`}>
        {item.isPositive === true && <TrendingUp className="w-3 h-3 mr-1" />}
        {item.isPositive === false && <TrendingDown className="w-3 h-3 mr-1" />}
        {item.trend}
      </div>
    </div>
  </div>
);

const ManagerCard = ({ title, icon: Icon, metrics, colorClass, buttonText, onClick }) => (
  <button
    onClick={onClick}
    className="text-left w-full bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col h-full cursor-pointer"
  >
    {/* Top accent bar */}
    <div className={`h-1.5 w-full ${colorClass}`}></div>

    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-start justify-between mb-5">
        <div className={`p-3 rounded-xl ${colorClass.replace('bg-', 'bg-opacity-10 text-')} ring-1 ring-inset ring-slate-100`}>
          <Icon className={`w-8 h-8 ${colorClass.replace('bg-', 'text-')}`} />
        </div>
        <div className="bg-slate-50 rounded-full p-2 group-hover:bg-slate-100 transition-colors">
          <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 font-medium">View live dashboard & controls</p>

      <div className="space-y-3 mt-auto mb-6 bg-slate-50/50 p-4 rounded-lg border border-slate-100 group-hover:border-slate-200 transition-colors">
        {metrics.map((m, idx) => (
          <div key={idx} className="flex justify-between text-sm items-center">
            <span className="text-slate-500 font-medium">{m.label}</span>
            <span className="font-bold text-slate-800">{m.value}</span>
          </div>
        ))}
      </div>

      <div className={`w-full py-3.5 px-4 rounded-lg font-bold text-sm text-center transition-all flex items-center justify-center gap-2 text-white shadow-md ${colorClass} opacity-90 group-hover:opacity-100 group-hover:shadow-lg`}>
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  </button>
);

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <LayoutGrid className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight">GIA</h1>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Director Dashboard</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                  Demo Dealer Group
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="h-6 w-px bg-slate-300"></div>
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  All Outlets
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Preview Mode
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-md">
              <Calendar className="w-4 h-4" />
              <span>Last 30 Days</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 border border-indigo-200">
              <span className="text-sm font-bold">JD</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Row 1: KPI Grid - Updated for 8 cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((item, index) => (
            <KpiCard key={index} item={item} />
          ))}
        </section>

        {/* Row 2: Funnel & Insights */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Funnel Strip */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-6 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-400" />
              Revenue Funnel Efficiency
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative">
              {/* Connector Lines (Desktop only) */}
              <div className="hidden sm:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 transform -translate-y-1/2"></div>

              {/* Stage 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 w-full sm:w-1/3 relative z-10 flex flex-col items-center text-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Demand Created</div>
                <div className="text-2xl font-bold text-slate-900">8,400</div>
                <div className="text-sm text-slate-500 mb-2">Leads Generated</div>
                <Badge type="neutral">Top of Funnel</Badge>
              </div>

              <div className="hidden sm:flex text-slate-300 z-10 bg-white rounded-full p-1 border border-slate-200">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Stage 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 w-full sm:w-1/3 relative z-10 flex flex-col items-center text-center">
                <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">Demand Converted</div>
                <div className="text-2xl font-bold text-indigo-700">28.7%</div>
                <div className="text-sm text-slate-500 mb-2">Conversion Rate</div>
                <Badge type="success">Bookings</Badge>
              </div>

              <div className="hidden sm:flex text-slate-300 z-10 bg-white rounded-full p-1 border border-slate-200">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Stage 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 w-full sm:w-1/3 relative z-10 flex flex-col items-center text-center">
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Repeat Revenue</div>
                <div className="text-2xl font-bold text-emerald-700">$398k</div>
                <div className="text-sm text-slate-500 mb-2">Retention Value</div>
                <Badge type="success">Loyalty</Badge>
              </div>
            </div>
          </div>

          {/* Director Insights Panel */}
          <div className="bg-slate-900 rounded-lg shadow-sm p-6 text-white flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide flex items-center gap-2 text-indigo-200">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                GIA AI Insights
              </h2>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {insightsData.map((insight) => (
                <div key={insight.id} className="p-3 bg-slate-800 rounded border border-slate-700/50">
                  <div className="flex items-start gap-3">
                    {insight.type === 'critical' && <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />}
                    {insight.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />}
                    {insight.type === 'optimization' && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />}
                    <div>
                      <p className="text-sm text-slate-200 leading-snug">{insight.text}</p>
                      <p className="text-xs text-slate-500 mt-2 font-medium">{insight.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Row 3: Manager Modules (Deep Links) - REDESIGNED */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ManagerCard
            title="AI Marketing Manager"
            icon={Megaphone}
            colorClass="bg-blue-600"
            buttonText="Launch Marketing Tool"
            onClick={() => window.open('https://instaleads.ai/', '_blank')}
            metrics={[
              { label: 'Leads Captured', value: '1,205' },
              { label: 'Cost per Lead', value: '$42.10' },
              { label: 'Ad Impressions', value: '850k' },
            ]}
          />
          <ManagerCard
            title="AI Business Dev Manager"
            icon={Phone}
            colorClass="bg-violet-600"
            buttonText="Launch BDC Tool"
            onClick={() => window.open('https://gia-portal-64kft.ondigitalocean.app/dashboard', '_blank')}
            metrics={[
              { label: 'Answer Rate', value: '94.2%' },
              { label: 'Bookings', value: '1,840' },
              { label: 'Show Rate', value: '82%' },
            ]}
          />
          <ManagerCard
            title="AI Customer Service Manager"
            icon={RefreshCw}
            colorClass="bg-emerald-600"
            buttonText="Launch Service Tool"
            onClick={() => window.open('https://www.freshreview.co/', '_blank')}
            metrics={[
              { label: 'New Reviews', value: '452' },
              { label: 'Win-back Conv.', value: '12%' },
              { label: 'Reminder Conv.', value: '24%' },
            ]}
          />
        </section>

        {/* Below the fold: Deep Analytics */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Section 1: Revenue Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Revenue & Ad Spend Trend</h2>
              <div className="flex gap-4">
                <span className="flex items-center gap-1 text-xs text-slate-500"><span className="w-2 h-2 rounded-full bg-indigo-500"></span>Revenue</span>
                <span className="flex items-center gap-1 text-xs text-slate-500"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Bookings</span>
                <span className="flex items-center gap-1 text-xs text-slate-500"><span className="w-2 h-2 rounded-full bg-rose-400"></span>Ad Spend</span>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                  />
                  <Bar yAxisId="left" dataKey="revenue" fill="#6366f1" barSize={40} radius={[4, 4, 0, 0]} fillOpacity={0.8} name="Revenue" />
                  {/* Added Ad Spend Line */}
                  <Line yAxisId="left" type="monotone" dataKey="spend" stroke="#fb7185" strokeWidth={2} dot={false} strokeDasharray="5 5" name="Ad Spend" />
                  <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} name="Bookings" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Section 2: Revenue Leakage Table */}
          <div className="lg:col-span-1 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                Revenue Leakage
              </h2>
              <p className="text-xs text-slate-500 mt-1">Identified missed opportunities (Last 30d)</p>
            </div>
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3">Source</th>
                    <th className="px-6 py-3 text-right">Est. Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leakageData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 font-medium text-slate-700">
                        {row.category}
                        <div className="text-xs text-slate-400 font-normal">{row.count} instances</div>
                      </td>
                      <td className="px-6 py-3 text-right text-rose-600 font-medium">{row.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Outlet Comparison Table (Full Width of bottom row) */}
          <div className="lg:col-span-3 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900">Outlet Performance Comparison</h2>
              <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">View Full Report</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Outlet Name</th>
                    <th className="px-6 py-4 text-center">Answer Rate</th>
                    <th className="px-6 py-4 text-center">Bookings</th>
                    <th className="px-6 py-4 text-center">Repeat Revenue</th>
                    <th className="px-6 py-4 text-right">Avg Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {outletData.map((outlet, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">{outlet.name}</td>
                      <td className="px-6 py-4 text-center text-slate-600">{outlet.answerRate}</td>
                      <td className="px-6 py-4 text-center text-slate-600">{outlet.bookings}</td>
                      <td className="px-6 py-4 text-center text-emerald-600 font-medium">{outlet.repeat}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-semibold">{outlet.rating}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-200 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            Preview analytics shown for demonstration. Source of truth lives inside each Manager module.
          </p>
          <div className="text-xs text-slate-300 font-medium">
            © 2026 GIA AI Revenue Director
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
