// useFavorites.js
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const updateFavoritesInStorage = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error updating favorites in storage:", error);
    }
  };

  const addFavorite = async (pokemonId) => {
    const updatedFavorites = [...favorites, pokemonId];

    if (updatedFavorites.length > 6) {
      return "Vous avez déjà 6 favoris";
    }
  
    await updateFavoritesInStorage(updatedFavorites);
    setFavorites(updatedFavorites);
    
    return "Ajouté aux favoris";
  };

  const removeFavorite = async (pokemonId) => {
    const updatedFavorites = favorites.filter((id) => id !== pokemonId);
    await updateFavoritesInStorage(updatedFavorites);
    setFavorites(updatedFavorites);
  };

  const isFavorite = (pokemonId) => favorites.includes(pokemonId);

  const refreshFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error refreshing favorites:", error);
    }
  };

  useEffect(() => {
    refreshFavorites();
  }, []); // Only run this effect on component mount

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    refreshFavorites,
  };
};

export default useFavorites;
