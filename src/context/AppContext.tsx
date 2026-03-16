import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserPlan {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface User {
  id: string;
  username: string;
  name: string; // Alias for username to support legacy components
  email: string;
  password?: string; // For Settings access
  profilePhoto?: string;
  usePasswordForLogin: boolean;
  isPremium: boolean;
  isAdminEnabled: boolean; // For AdminPanel support
  plans: UserPlan[];
}

export type AppSection = 'hero' | 'balegize' | 'ayizony' | 'arif' | 'premium' | 'profile' | 'settings';

interface AppContextType {
  user: User | null;
  allUsers: User[];
  isAuthenticated: boolean;
  activeSection: AppSection;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  setUser: (userData: User) => void; // Legacy support
  logout: () => void;
  updateProfilePhoto: (photoUrl: string) => void;
  saveUserPlan: (plan: UserPlan) => void;
  deleteUserPlan: (planId: string) => void;
  togglePasswordRequirement: (enabled: boolean) => void;
  setActiveSection: (section: AppSection) => void;
  updateUserProfile: (userData: Partial<User>) => void;
  toggleUserAccess: (userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<AppSection>('hero');

  useEffect(() => {
    const storedUserIdObj = localStorage.getItem('ariz_current_user');
    const allUsersData = JSON.parse(localStorage.getItem('ariz_all_users_data') || '{}');
    const usersList = Object.values(allUsersData) as User[];
    setAllUsers(usersList);

    if (storedUserIdObj) {
      const parsedUser = JSON.parse(storedUserIdObj);
      const fullUserData = allUsersData[parsedUser.id];
      if (fullUserData) {
        setUserState(fullUserData);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const allUsersData = JSON.parse(localStorage.getItem('ariz_all_users_data') || '{}');
    const existingUser = Object.values(allUsersData).find((u: any) => u.email === email) as User || null;

    if (!existingUser) {
      return false; // User not found
    }

    if (existingUser.password !== password) {
      return false; // Incorrect password
    }

    localStorage.setItem('ariz_current_user', JSON.stringify({ id: existingUser.id }));
    setUserState(existingUser);
    setIsAuthenticated(true);
    setActiveSection('hero');
    return true;
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    const allUsersData = JSON.parse(localStorage.getItem('ariz_all_users_data') || '{}');
    
    // Check if email already exists
    const emailExists = Object.values(allUsersData).some((u: any) => u.email === userData.email);
    if (emailExists) {
      return false; // Email already registered
    }

    const newUser: User = {
      id: userData.id || Math.random().toString(36).substr(2, 9),
      username: userData.username || userData.name || 'User',
      name: userData.username || userData.name || 'User',
      email: userData.email || '',
      password: userData.password || '123456',
      profilePhoto: userData.profilePhoto || 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3fad734e-dd49-4ba4-a3d1-9ce2186cc2de/secure-user-profile-interface-19809b6e-1773600880940.webp',
      usePasswordForLogin: userData.usePasswordForLogin ?? true,
      isPremium: userData.isPremium || false,
      isAdminEnabled: userData.isAdminEnabled || false,
      plans: userData.plans || [],
    };

    allUsersData[newUser.id] = newUser;
    localStorage.setItem('ariz_all_users_data', JSON.stringify(allUsersData));
    setAllUsers(Object.values(allUsersData) as User[]);
    
    // Automatically log in after registration
    localStorage.setItem('ariz_current_user', JSON.stringify({ id: newUser.id }));
    setUserState(newUser);
    setIsAuthenticated(true);
    setActiveSection('hero');
    return true;
  };

  const setUser = (userData: User) => {
    updateUserData(userData);
  };

  const logout = () => {
    localStorage.removeItem('ariz_current_user');
    setUserState(null);
    setIsAuthenticated(false);
    setActiveSection('hero');
  };

  const updateProfilePhoto = (photoUrl: string) => {
    if (!user) return;
    const updatedUser = { ...user, profilePhoto: photoUrl };
    updateUserData(updatedUser);
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...userData };
    updateUserData(updatedUser);
  };

  const saveUserPlan = (plan: UserPlan) => {
    if (!user) return;
    const updatedPlans = [...user.plans, plan];
    const updatedUser = { ...user, plans: updatedPlans };
    updateUserData(updatedUser);
  };

  const deleteUserPlan = (planId: string) => {
    if (!user) return;
    const updatedPlans = user.plans.filter(p => p.id !== planId);
    const updatedUser = { ...user, plans: updatedPlans };
    updateUserData(updatedUser);
  };

  const togglePasswordRequirement = (enabled: boolean) => {
    if (!user) return;
    const updatedUser = { ...user, usePasswordForLogin: enabled };
    updateUserData(updatedUser);
  };

  const toggleUserAccess = (userId: string) => {
    const allUsersData = JSON.parse(localStorage.getItem('ariz_all_users_data') || '{}');
    if (allUsersData[userId]) {
      allUsersData[userId].isAdminEnabled = !allUsersData[userId].isAdminEnabled;
      allUsersData[userId].isPremium = allUsersData[userId].isAdminEnabled;
      localStorage.setItem('ariz_all_users_data', JSON.stringify(allUsersData));
      setAllUsers(Object.values(allUsersData) as User[]);
      
      if (user && user.id === userId) {
        setUserState(allUsersData[userId]);
      }
    }
  };

  const updateUserData = (updatedUser: User) => {
    setUserState(updatedUser);
    const allUsersData = JSON.parse(localStorage.getItem('ariz_all_users_data') || '{}');
    allUsersData[updatedUser.id] = updatedUser;
    localStorage.setItem('ariz_all_users_data', JSON.stringify(allUsersData));
    setAllUsers(Object.values(allUsersData) as User[]);
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      allUsers,
      isAuthenticated, 
      activeSection,
      login, 
      register,
      setUser,
      logout, 
      updateProfilePhoto, 
      saveUserPlan, 
      deleteUserPlan,
      togglePasswordRequirement,
      setActiveSection,
      updateUserProfile,
      toggleUserAccess
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};