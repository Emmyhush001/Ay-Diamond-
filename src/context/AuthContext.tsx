import React, { createContext, useContext, useState } from 'react';

export type Permission = 'overview' | 'orders' | 'inventory' | 'analytics' | 'settings';

interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

interface User {
  id: string;
  name: string;
  roleId: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  roles: Role[];
  currentRole: Role;
  setRole: (roleId: string) => void;
  updateRoles: (roles: Role[]) => void;
  isAuthenticated: boolean;
}

const DEFAULT_ROLES: Role[] = [
  { id: 'admin', name: 'Admin', permissions: ['overview', 'orders', 'inventory', 'analytics', 'settings'] },
  { id: 'manager', name: 'Manager', permissions: ['overview', 'orders', 'inventory', 'analytics'] },
  { id: 'staff', name: 'Staff', permissions: ['overview', 'orders'] },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>(() => {
    const saved = localStorage.getItem('diamond_roles');
    return saved ? JSON.parse(saved) : DEFAULT_ROLES;
  });
  
  const [currentRoleId, setCurrentRoleId] = useState<string>('admin');
  
  const currentRole = roles.find(r => r.id === currentRoleId) || roles[0];

  const updateRoles = (newRoles: Role[]) => {
    setRoles(newRoles);
    localStorage.setItem('diamond_roles', JSON.stringify(newRoles));
  };

  const user: User = {
    id: '1',
    name: 'Executive Admin',
    roleId: currentRoleId,
    email: 'admin@aydiamond.com'
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      roles,
      currentRole,
      setRole: setCurrentRoleId,
      updateRoles,
      isAuthenticated: true 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
