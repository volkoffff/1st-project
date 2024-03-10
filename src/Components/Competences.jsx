import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

export function Competences({ url }) {
    const [pokemonCompetences, setPokemonCompetences] = useState([]);

    useEffect(() => {
        const fetchpokemonCompetences = async () => {
            try {
                const response = await axios.get(`${url}`);
                setPokemonCompetences(response.data);
            } catch (error) {
                console.error('Error fetching Pokemon stat data:', error);
            }
        };

        fetchpokemonCompetences();
    }, []);

    return (
        <View className="py-1.5">
            <Text className="text-base font-medium text-slate-800">
                {pokemonCompetences.name}
            </Text>
            <Text>
            {pokemonCompetences.flavor_text_entries && pokemonCompetences.flavor_text_entries.map((item, index) => {
                    // Check if the language is "fr"
                    if (item.language.name === "fr" && item.version_group.name === "x-y") {
                        return (
                            <Text key={index} className="text-lg font-normal text-slate-500">
                                {item.flavor_text}
                            </Text>
                        );
                    }
                    // If language is not "fr", return null (or an empty fragment)
                    return null;
                })}
            </Text>
        </View>
    );
}
