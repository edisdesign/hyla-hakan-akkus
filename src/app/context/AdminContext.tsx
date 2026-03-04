import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const ADMIN_PASSWORD = 'hakanhyla2025';
const SESSION_KEY = 'hyla_admin_session';

interface AdminContextType {
    isAdmin: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
    isAdmin: false,
    login: () => false,
    logout: () => { },
});

export function AdminProvider({ children }: { children: ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const session = sessionStorage.getItem(SESSION_KEY);
        if (session === 'true') setIsAdmin(true);
    }, []);

    const login = (password: string): boolean => {
        if (password === ADMIN_PASSWORD) {
            setIsAdmin(true);
            sessionStorage.setItem(SESSION_KEY, 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
        sessionStorage.removeItem(SESSION_KEY);
    };

    return (
        <AdminContext.Provider value={{ isAdmin, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
}

export const useAdmin = () => useContext(AdminContext);
