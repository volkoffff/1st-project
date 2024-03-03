import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { PokemonsCard } from "./PokemonsCard";
import { SearchCategorieList } from "../Components/SearchCategorieList";

export function Search() {
  const [search, setSearch] = useState("");
  const [firstRender, setFirstRender] = useState(false);
  const navigation = useNavigation();
  const [visiblePokemonCount, setVisiblePokemonCount] = useState(15);
  const gap = 8;

  const updateSearch = (search) => {
    setSearch(search);
  };

  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemonData, setFilteredPokemonData] = useState([]); // [
  const [urlFetch, setUrlFetch] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=1302"
  );

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(urlFetch);
      const data = response.data;
      setPokemonData(data.results);
      setFirstRender(true);

    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  const filterPokemonData = () => {
    const filteredData = pokemonData.filter((item) =>
      item.name.includes(search.toLowerCase())
    );
    setFilteredPokemonData(filteredData);


  };
  
  useEffect(() => {
    filterPokemonData();
    
    if (firstRender === false) {
      fetchPokemonData();
    }
  }, [search]);

  const loadMorePokemon = () => {
    setVisiblePokemonCount(visiblePokemonCount + 15);
  };

  return (
    <View className="flex">
      <SearchBar
        placeholder="Type Here..."
        containerStyle={{
          backgroundColor: "transparent",
          borderWidth: 0,
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
          width: "100%",
        }}
        inputContainerStyle={{
          backgroundColor: "#E5E5E5",
          borderRadius: 10,
          height: 40,
        }}
        value={search}
        onChangeText={updateSearch}
      />

      {search === "" ? (
        <SearchCategorieList />
      ) : (
        <View className="px-2">
          {filteredPokemonData && filteredPokemonData.length > 0 ?  (
            <FlatList
              data={filteredPokemonData.slice(0, visiblePokemonCount)}
              numColumns={2}
              columnWrapperStyle={{ gap }}
              contentContainerStyle={{ gap }}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <PokemonsCard url={item.url} navigation={navigation} />
              )}
              onEndReached={loadMorePokemon}
              onEndReachedThreshold={0.5} 
            />
          ) :
          <View className="mx-auto">
            <View ><Image style={styles.logo} source={require('../../assets/pikachu_sad.png')}/></View>
            <Text className="text-gray-700">Pas de Pokemon trouvé...</Text>
          </View>  
          }
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  },
});