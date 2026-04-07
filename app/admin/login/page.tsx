'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock login for now - in production use next-auth or jose
    if (email === 'admin@daoduytung.edu.vn' && password === 'admin123') {
      localStorage.setItem('admin_token', 'mock_token');
      router.push('/admin');
    } else {
      setError('Email hoặc mật khẩu không chính xác');
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-surface-container-low flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl editorial-shadow p-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6">
            DDT
          </div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">Quản trị hệ thống</h1>
          <p className="text-on-surface-variant mt-2 font-body">Vui lòng đăng nhập để tiếp tục</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-body">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface font-body">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 font-body"
                placeholder="admin@daoduytung.edu.vn"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface font-body">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 font-body"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </main>
  );
}
