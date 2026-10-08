import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastItem {
  id: string;
  type: 'success' | 'info' | 'error' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(({ type, title, message, duration = 4000 }: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '420px',
        width: 'calc(100vw - 60px)',
        pointerEvents: 'none'
      }}>
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 25, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              style={{
                background: '#161412',
                border: '1px solid rgba(198, 124, 78, 0.35)',
                borderLeft: t.type === 'success' ? '4px solid #22c55e' : t.type === 'error' ? '4px solid #ef4444' : '4px solid #c67c4e',
                borderRadius: '10px',
                padding: '16px 18px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(198, 124, 78, 0.15)',
                color: '#fdfbf7',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                pointerEvents: 'auto',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                {t.type === 'success' && <CheckCircle2 size={20} color="#22c55e" />}
                {t.type === 'error' && <AlertCircle size={20} color="#ef4444" />}
                {(t.type === 'info' || t.type === 'warning') && <Info size={20} color="#c67c4e" />}
              </div>

              <div style={{ flexGrow: 1 }}>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: '#ffffff', letterSpacing: '0.3px' }}>
                  {t.title}
                </strong>
                {t.message && (
                  <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#a39e95', lineHeight: '1.45' }}>
                    {t.message}
                  </p>
                )}
              </div>

              <button
                onClick={() => removeToast(t.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8c867d',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
