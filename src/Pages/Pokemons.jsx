import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { PokemonsCard } from './PokemonsCard';


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
    )
}