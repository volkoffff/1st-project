import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, View, FlatList, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { PokemonsCard } from "./PokemonsCard";

export function Search() {
  const [search, setSearch] = useState("");
  const [firstRender, setFirstRender] = useState(false);
  const navigation = useNavigation();
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
        <ScrollView className="w-full min-h-full grow-1 px-2">
          <View className="w-full flex flex-row mx-auto">
            <TouchableOpacity onPress={() => navigation.navigate('SearchCategorie', {urlFetch: "https://pokeapi.co/api/v2/type/10"})} className="h-[180] flex-1 bg-red-400 rounded-lg"></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SearchCategorie', {urlFetch: "https://pokeapi.co/api/v2/type/4"})} className="h-[180] flex-1 bg-green-200 rounded-lg ml-2"></TouchableOpacity>
          </View>
          <View className="w-full h-[180] bg-green-200 rounded-lg mt-2"></View>
          <View className="w-full flex flex-row mx-auto mt-2">
            <View className="h-[180] flex-1 bg-orange-300 rounded-lg"></View>
            <View className="h-[180] flex-1 bg-orange-300 rounded-lg ml-2 "></View>
          </View>
          <View className="w-full h-[180] bg-red-200 rounded-lg mt-2"></View>
        </ScrollView>
      ) : (
        <View className="px-2">
          {filteredPokemonData && (
            <FlatList
              data={filteredPokemonData}
              numColumns={2}
              columnWrapperStyle={{ gap }}
              contentContainerStyle={{ gap }}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <PokemonsCard url={item.url} navigation={navigation} />
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}
