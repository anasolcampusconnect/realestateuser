import React, { createContext, useState, useContext, useEffect } from 'react';
import { Platform } from 'react-native';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  image: any;
  status?: string;
  acres?: string;
  servingLocations?: string;
}

interface FavoritesContextType {
  favorites: Property[];
  addFavorite: (property: Property) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Property[]>([]);

  // Load favorites from localStorage on web
  useEffect(() => {
    if (Platform.OS === 'web') {
      const saved = localStorage.getItem('nestora_favorites');
      if (saved) {
        try {
          setFavorites(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to load favorites', e);
        }
      }
    }
  }, []);

  // Save favorites to localStorage on web
  useEffect(() => {
    if (Platform.OS === 'web') {
      localStorage.setItem('nestora_favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const addFavorite = (property: Property) => {
    if (!favorites.find(p => p.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(p => p.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(p => p.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
