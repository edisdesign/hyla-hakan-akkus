import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock } from 'lucide-react';
import { useAdmin } from '@/app/context/AdminContext';
import { toast } from 'sonner';

interface AdminLoginModalProps {
    open: boolean;
    onClose: () => void;
}

export function AdminLoginModal({ open, onClose }: AdminLoginModalProps) {
    const { login } = useAdmin();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(password);
        if (success) {
            toast.success('Dobrodošli, Admin!');
            setPassword('');
            setError(false);
            onClose();
        } else {
            setError(true);
            setPassword('');
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-[500] backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[501] w-full max-w-sm"
                    >
                        <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                                        <Lock size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-black text-[15px]">Admin Panel</p>
                                        <p className="text-gray-400 text-[12px]">HYLA by Akkus</p>
                                    </div>
                                </div>
                                <button onClick={onClose} className="text-gray-300 hover:text-gray-600 transition-colors cursor-pointer">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                        Lozinka
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setError(false); }}
                                        autoFocus
                                        className={`w-full border-2 rounded-xl px-4 py-3 text-black font-medium focus:outline-none transition-colors ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-black'
                                            }`}
                                        placeholder="••••••••••••"
                                    />
                                    {error && (
                                        <p className="text-red-500 text-[12px] mt-2">Pogrešna lozinka. Pokušaj ponovo.</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full h-12 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                                >
                                    Prijavi se
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
