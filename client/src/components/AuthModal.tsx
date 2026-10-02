import React, { useState } from 'react';
import axios from 'axios';
import { api, setAuthToken } from '../api/client';
import { User, Language } from '../types';
import { translations } from '../utils/translations';
import { X, Lock, Mail, User as UserIcon, LogIn, UserPlus, Sparkles, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onAuthSuccess: (user: User) => void;
  initialMode?: 'login' | 'register';
  reasonMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onAuthSuccess,
  initialMode = 'login',
  reasonMessage,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const t = translations[currentLang];

  const submitAuth = async (
    authMode: 'login' | 'register',
    fields: { name?: string; email: string; password: string }
  ) => {
    setErrorMessage(null);
    setLoading(true);

    try {
      const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register';
      const payload =
        authMode === 'login'
          ? { email: fields.email, password: fields.password }
          : {
              name: fields.name,
              email: fields.email,
              password: fields.password,
              password_confirmation: fields.password,
            };

      const response = await api.post(endpoint, payload);
      const { token, user } = response.data;

      if (token) {
        setAuthToken(token);
      }
      localStorage.setItem('user', JSON.stringify(user));

      onAuthSuccess(user);
      onClose();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 422 && err.response.data.errors) {
          const errors = err.response.data.errors as Record<string, string[]>;
          const firstErrorKey = Object.keys(errors)[0];
          setErrorMessage(errors[firstErrorKey][0]);
        } else if (err.response.data.message && typeof err.response.data.message === 'string') {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage(t.authErrorEmpty || 'Произошла ошибка при авторизации');
        }
      } else {
        setErrorMessage('Ошибка подключения к серверу. Запустите Laravel: php artisan serve');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitAuth(mode, { name, email, password });
  };

  const handleDemoLogin = () => {
    void submitAuth('login', {
      email: 'nazar@kitapbilim.kz',
      password: 'password123',
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-stone-900 text-stone-100 p-6 flex items-start justify-between">
          <div>
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-amber-400 mb-1">
              KitapBilim ID
            </span>
            <h2 className="font-display-book text-2xl font-bold text-white">
              {mode === 'login' ? t.authTitleLogin : t.authTitleRegister}
            </h2>
            <p className="text-xs text-stone-300 mt-1 max-w-xs">
              {mode === 'login' ? t.authLoginDesc : t.authRegisterDesc}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Жабу / Закрыть / Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {reasonMessage && (
          <div className="bg-amber-50 border-b border-amber-200/80 px-6 py-2.5 flex items-center gap-2.5 text-xs text-amber-900 font-medium">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{reasonMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-2 border-b border-stone-200 bg-stone-100/60 p-1 m-4 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`py-2 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t.authLoginBtn}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage(null);
            }}
            className={`py-2 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{t.authRegisterBtn}</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700">{t.authName}</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Абай Құнанбай / Иван Иванов"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white text-stone-900 placeholder:text-stone-400"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">{t.authEmail}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@kitapbilim.kz"
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white text-stone-900 placeholder:text-stone-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">{t.authPassword}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white text-stone-900 placeholder:text-stone-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-500 text-white font-medium text-sm rounded-lg transition-colors cursor-pointer shadow-xs mt-2 flex justify-center items-center"
          >
            {loading ? 'Күте тұрыңыз / Загрузка...' : mode === 'login' ? t.authLoginBtn : t.authRegisterBtn}
          </button>

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{t.authDemoLogin}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
