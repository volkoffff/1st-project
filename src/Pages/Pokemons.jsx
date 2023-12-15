import { Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Pokemons() {

    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonData = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
            const data = response.data;
            setPokemonData(data.results);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
        }
        };

        fetchPokemonData();
    }, []); // Empty dependency array to run the effect only once on mount

    return (
        <View>
        <Text>Pokemon List</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            {pokemonData.map((pokemon) => (
              <Text key={pokemon.name}>{pokemon.name}</Text>
            ))}
          </View>
        )}
      </View>
    )
}