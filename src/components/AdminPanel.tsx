import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Shield, User, Power, Mail, Clock, Lock, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const AdminPanel = () => {
  const { allUsers, toggleUserAccess } = useAppContext();
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="bg-blue-600/5 border border-blue-500/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        {/* Security badge */}
        <div className="absolute top-4 right-8 flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">
          <Lock size={14} className="text-cyan-400" />
          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Data Isolation Active</span>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <div className="bg-blue-600 p-4 rounded-3xl shadow-lg shadow-blue-900/40">
            <Shield className="text-white" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white italic uppercase">{t('adminPanel')}</h2>
            <p className="text-white/40 text-sm font-bold">\u12e8\u1270\u1218\u12dd\u1308\u1261 \u1270\u1320\u1243\u121a\u12ce\u127d\u1295 \u1218\u1241\u1323\u1320\u122d\u12eb</p>
          </div>
        </div>

        <div className="bg-blue-950/20 border border-blue-900/40 rounded-3xl overflow-hidden shadow-inner">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-900/20">
                  <th className="p-6 font-black text-blue-400 uppercase text-xs tracking-[0.2em] border-b border-blue-900/30">User Info</th>
                  <th className="p-6 font-black text-blue-400 uppercase text-xs tracking-[0.2em] border-b border-blue-900/30 text-center">Status</th>
                  <th className="p-6 font-black text-blue-400 uppercase text-xs tracking-[0.2em] border-b border-blue-900/30 text-center">Isolation</th>
                  <th className="p-6 font-black text-blue-400 uppercase text-xs tracking-[0.2em] border-b border-blue-900/30 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-gray-500 font-bold">
                      No users registered yet.
                    </td>
                  </tr>
                ) : (
                  allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-blue-900/10 transition-colors border-b border-blue-900/20">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-blue-900/40 border border-blue-800/50 overflow-hidden shadow-md flex items-center justify-center">
                             {u.profilePhoto ? (
                               <img src={u.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                             ) : (
                               <User size={24} className="text-blue-500/50" />
                             )}
                          </div>
                          <div>
                            <p className="font-black text-white text-lg">{u.username}</p>
                            <p className="text-xs text-blue-500 font-bold uppercase tracking-tight">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase border ${u.isAdminEnabled ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                          {u.isAdminEnabled ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                         <div className="flex items-center justify-center gap-2 text-blue-500/60">
                            <ShieldAlert size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">ENCRYPTED</span>
                         </div>
                      </td>
                      <td className="p-6 text-right">
                        <button 
                          onClick={() => {
                            toggleUserAccess(u.id);
                            toast.success(`User ${u.username} access toggled.`);
                          }}
                          className={`p-4 rounded-2xl transition-all shadow-lg shadow-blue-950/50 hover:scale-110 active:scale-95 border ${
                            u.isAdminEnabled 
                              ? 'bg-red-600/20 border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white' 
                              : 'bg-green-600/20 border-green-500/30 text-green-400 hover:bg-green-600 hover:text-white'
                          }`}
                        >
                          <Power size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-900/10 border border-blue-900/30 p-8 rounded-[2rem] flex items-center gap-6 group hover:bg-blue-900/20 transition-all">
          <div className="p-4 bg-blue-600/20 rounded-2xl group-hover:scale-110 transition-transform">
            <Mail className="text-cyan-400" size={24} />
          </div>
          <div>
            <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1">Renewal Bot</p>
            <p className="text-2xl font-black text-white">0 <span className="text-xs text-gray-500">Sent</span></p>
          </div>
        </div>
        
        <div className="bg-blue-900/10 border border-blue-900/30 p-8 rounded-[2rem] flex items-center gap-6 group hover:bg-blue-900/20 transition-all">
          <div className="p-4 bg-blue-600/20 rounded-2xl group-hover:scale-110 transition-transform">
            <User className="text-cyan-400" size={24} />
          </div>
          <div>
            <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1">Total Users</p>
            <p className="text-2xl font-black text-white">{allUsers.length}</p>
          </div>
        </div>

        <div className="bg-blue-900/10 border border-blue-900/30 p-8 rounded-[2rem] flex items-center gap-6 group hover:bg-blue-900/20 transition-all">
          <div className="p-4 bg-blue-600/20 rounded-2xl group-hover:scale-110 transition-transform">
            <Clock className="text-cyan-400" size={24} />
          </div>
          <div>
            <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1">System Health</p>
            <p className="text-2xl font-black text-white">100%</p>
          </div>
        </div>
      </div>
    </div>
  );
};