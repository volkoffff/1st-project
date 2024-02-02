import React from 'react';
import { Text, View, FlatList } from 'react-native';
import useFavorites from '../Utils/UseFavorite';
import { PokemonsCard } from './PokemonsCard';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';


export function Equipe() {
    const navigation = useNavigation();
    const { favorites, refreshFavorites  } = useFavorites();


    useFocusEffect(
        React.useCallback(() => {
            // refreshFavorites() will be called every time this screen comes into focus
            console.log('Screen focus');
            refreshFavorites();
            
            return () => {
                console.log('Screen is unfocused');
            };
        }, [])
    );

    return (
        <View>
            <Text className="mx-auto py-2 text-xl font-medium">Equipe {favorites.length} / 6</Text>
            <View className="px-2 min-h-full">
                {favorites && favorites.length > 0 ? (
                    <FlatList
                        data={favorites}
                        numColumns={2}
                        columnWrapperStyle={{ gap: 8 }}
                        contentContainerStyle={{ gap: 8 }}
                        keyExtractor={(item) => item} // Assuming favorites is an array of Pokemon IDs or something similar
                        renderItem={({ item }) => <PokemonsCard url={`https://pokeapi.co/api/v2/pokemon/${item}`} navigation={navigation} />}
                    />
                ) : (
                    <Text>Pas encore de Pokemon dans votre équipe.</Text>
                )}
            </View>
        </View>
    );
}
