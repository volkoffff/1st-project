import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { PokemonsCard } from "./PokemonsCard";
import { FlatList } from "react-native-gesture-handler";

export function SearchCategorie({ route }) {
  const { urlFetch } = route.params;
  const navigation = useNavigation();
  const [pokemonData, setPokemonData] = useState([]);
  const [visiblePokemonCount, setVisiblePokemonCount] = useState(15);
  const gap = 8;

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(urlFetch);
      const data = response.data;
      setPokemonData(data.pokemon);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const loadMorePokemon = () => {
    setVisiblePokemonCount(visiblePokemonCount + 15);
  };

  return (
    <View className="px-2">
      {pokemonData && (
          <FlatList
            data={pokemonData.slice(0, visiblePokemonCount)}
            numColumns={2}
            columnWrapperStyle={{ gap }}
            contentContainerStyle={{ gap }}
            keyExtractor={(item) => item.pokemon.name}
            renderItem={({ item }) => (
              <PokemonsCard url={item.pokemon.url} navigation={navigation} />
            )}
            onEndReached={loadMorePokemon}
            onEndReachedThreshold={0.5} 
          />
      )}
    </View>
  );
}
