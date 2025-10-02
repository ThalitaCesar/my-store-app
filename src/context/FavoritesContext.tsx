import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth } from '../config/firebaseConfig';
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
  const [favorites, setFavorites] = useState<number[]>([]);

  const refreshFavorites = async () => {
    if (!auth.currentUser) return;
    const favs = await getUserFavorites(auth.currentUser.uid);
    setFavorites(favs);
  };

  const addToFavorites = async (productId: number) => {
    if (!auth.currentUser) return;
    await addFavorite(auth.currentUser.uid, productId);
    setFavorites(prev => [...prev, productId]);
  };

  const removeFromFavorites = async (productId: number) => {
    if (!auth.currentUser) return;
    await removeFavorite(auth.currentUser.uid, productId);
    setFavorites(prev => prev.filter(id => id !== productId));
  };

  useEffect(() => {
    refreshFavorites();
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, refreshFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
