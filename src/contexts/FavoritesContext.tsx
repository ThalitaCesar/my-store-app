import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserFavorites, addFavorite, removeFavorite } from '../services/favoriteService';

type FavoritesContextType = {
  favorites: number[];
  addToFavorites: (productId: number) => Promise<void>;
  removeFromFavorites: (productId: number) => Promise<void>;
  refreshFavorites: () => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addToFavorites: async () => {},
  removeFromFavorites: async () => {},
  refreshFavorites: async () => {},
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<number[]>([]);

  const refreshFavorites = async () => {
    if (!user) {
      setFavorites([]);
      return;
    }
    const favs = await getUserFavorites(user.uid);
    setFavorites(favs);
  };

  const addToFavorites = async (productId: number) => {
    if (!user) return;
    await addFavorite(user.uid, productId);
    setFavorites(prev => [...prev, productId]);
  };

  const removeFromFavorites = async (productId: number) => {
    if (!user) return;
    await removeFavorite(user.uid, productId);
    setFavorites(prev => prev.filter(id => id !== productId));
  };

  useEffect(() => {
    refreshFavorites();
  }, [user]);

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, refreshFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
