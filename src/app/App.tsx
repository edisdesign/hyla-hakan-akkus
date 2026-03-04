import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AdminProvider } from '@/app/context/AdminContext';
import { AdminLoginModal } from '@/app/components/AdminLoginModal';
import { AdminPanel } from '@/app/components/AdminPanel';
import { useAdmin } from '@/app/context/AdminContext';
import { Settings } from 'lucide-react';

function AppInner() {
  const { isAdmin } = useAdmin();
  const [loginOpen, setLoginOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const handleLogin = () => setLoginOpen(true);
    const handlePanel = () => setPanelOpen(true);
    window.addEventListener('hyla:openlogin', handleLogin);
    window.addEventListener('hyla:openpanel', handlePanel);
    return () => {
      window.removeEventListener('hyla:openlogin', handleLogin);
      window.removeEventListener('hyla:openpanel', handlePanel);
    };
  }, []);

  // Auto-open panel when admin logs in
  useEffect(() => {
    if (isAdmin) setPanelOpen(true);
  }, [isAdmin]);

  return (
    <>
      <RouterProvider router={router} />
      <AdminLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <AdminPanel open={panelOpen && isAdmin} onClose={() => setPanelOpen(false)} />

      {/* Floating Admin Button — nur sichtbar wenn eingeloggt */}
      {isAdmin && !panelOpen && (
        <button
          onClick={() => setPanelOpen(true)}
          className="fixed bottom-6 left-6 z-[400] flex items-center gap-2 px-4 py-3 bg-black text-white rounded-2xl shadow-2xl hover:bg-gray-800 active:scale-95 transition-all duration-200 cursor-pointer group"
          title="Admin Panel öffnen"
        >
          <div className="relative">
            <Settings size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider">Admin</span>
        </button>
      )}
    </>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppInner />
    </AdminProvider>
  );
}

