/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { signInWithGoogle } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { Shield, LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

import { Logo } from '../components/ui/Logo';
import { usePageTitle } from '../hooks/usePageTitle';

export default function LoginPage() {
  usePageTitle('VTC - Acesso Restrito');
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  const handleLogin = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Falha ao autenticar. Verifique sua conta e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-slate-200 p-10 border border-slate-100"
      >
        <div className="flex flex-col items-center mb-12">
          <Logo className="mb-8 scale-125" />
          <div className="w-12 h-1 bg-brand-500 rounded-full mb-8" />
          <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center uppercase italic">Acesso Restrito</h1>
          <p className="text-slate-500 text-center mt-2 text-sm font-medium">Painel de Gestão e Consultoria de Saúde Ocupacional</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 border border-red-100 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 py-3.5 rounded-xl font-bold text-slate-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
        >
          {isSubmitting ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full"
            />
          ) : (
            <>
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Entrar com Google
            </>
          )}
        </button>

        <p className="mt-8 text-center text-xs text-slate-400 leading-relaxed">
          Ao entrar, você concorda com nossos termos de uso e política de privacidade. 
          Acesso exclusivo para usuários autorizados.
        </p>
      </motion.div>

      <button 
        onClick={() => navigate('/')}
        className="mt-8 text-slate-500 hover:text-slate-700 font-medium text-sm flex items-center gap-2"
      >
        Voltar para o início
      </button>
    </div>
  );
}
