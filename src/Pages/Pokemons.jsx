import { Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PokemonsCard } from './PokemonsCard';
import { useNavigation } from '@react-navigation/native';


export function Pokemons() {

    const navigation = useNavigation();
    const [pokemonData, setPokemonData] = useState([]);
    const [urlFetch, setUrlFetch] = useState('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20')
    const gap = 8

    const fetchPokemonData = async () => {
    try {
        const response = await axios.get(urlFetch);
        const data = response.data;
        setUrlFetch(data.next)
        setPokemonData([ ...pokemonData, ...data.results]);

    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
    }
    };

    useEffect(() => {
        fetchPokemonData();
    }, [])
    
    const nextPage = (() => {

        fetchPokemonData();
    })

    return (
        <View>
        <Text className="text-xl text-black font-bold py-4 pl-2">Pokemon List</Text>
          <View>
            {pokemonData &&
                <FlatList
                data={pokemonData}
                numColumns={2}
                columnWrapperStyle={{gap}}
                contentContainerStyle={{gap}}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => <PokemonsCard url={item.url} navigation={navigation}/>}
                onEndReached={nextPage}
                onEndReachedThreshold={0.5} 
              />
            }
          </View>
      </View>
    )
}