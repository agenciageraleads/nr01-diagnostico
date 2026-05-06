/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { usePageTitle } from '../hooks/usePageTitle';
import { 
  Building2, 
  ClipboardList, 
  Users, 
  MessageSquareReply, 
  AlertTriangle,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const stats = [
  { label: 'Empresas Ativas', value: '12', icon: Building2, color: 'bg-brand-600', trend: '+2 este mês' },
  { label: 'Campanhas em Curso', value: '4', icon: ClipboardList, color: 'bg-emerald-500', trend: '3 encerradas' },
  { label: 'Total de Respostas', value: '458', icon: MessageSquareReply, color: 'bg-green-500', trend: '+86 hoje' },
  { label: 'Alertas de Risco', value: '3', icon: AlertTriangle, color: 'bg-amber-500', trend: 'Nível Alto' },
];

const data = [
  { name: 'Sobrecarga', valor: 65, status: 'Alto' },
  { name: 'Liderança', valor: 32, status: 'Baixo' },
  { name: 'Clima', valor: 45, status: 'Médio' },
  { name: 'Assédio', valor: 12, status: 'Muito Baixo' },
  { name: 'Bem-estar', valor: 58, status: 'Médio' },
];

const COLORS = ['#ef4444', '#10b981', '#f59e0b', '#16a34a', '#059669'];
import { usePageTitle } from '../hooks/usePageTitle';

export default function Dashboard() {
  usePageTitle('VTC - Painel de Gestão');
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-xl shadow-lg shadow-brand-100`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.trend}</span>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Médias de Risco por Categoria</h3>
              <p className="text-sm text-slate-500">Visão consolidada última campanha</p>
            </div>
            <select className="bg-slate-50 border-none rounded-lg text-sm font-medium px-4 py-2 ring-1 ring-slate-100">
              <option>Todas as Empresas</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="valor" radius={[6, 6, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.valor > 60 ? '#ef4444' : entry.valor > 40 ? '#f59e0b' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" /> Alertas Críticos
          </h3>
          <div className="space-y-4 flex-1">
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl relative group overflow-hidden">
               <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-red-600 uppercase mb-1">Empresa ABC</p>
                    <p className="text-sm font-bold text-slate-900 leading-tight">Alto índice de sobrecarga em Operação</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </div>
               <p className="text-xs text-red-700/70 mt-2">Médias acima de 85pts no setor logístico.</p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl relative group overflow-hidden">
               <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-amber-600 uppercase mb-1">Tech Solutions</p>
                    <p className="text-sm font-bold text-slate-900 leading-tight">Clima organizacional em declínio</p>
                  </div>
                  <TrendingDown className="w-4 h-4 text-amber-400 group-hover:translate-y-1 transition-transform" />
               </div>
               <p className="text-xs text-amber-700/70 mt-2">Queda de 15pts na percepção de liderança.</p>
            </div>
          </div>
          <button className="mt-6 w-full py-3 bg-slate-50 text-slate-600 font-bold rounded-xl text-sm border border-slate-200 hover:bg-slate-100 transition-all">
            Ver Todos os Alertas
          </button>
        </div>
      </div>
    </div>
  );
}
