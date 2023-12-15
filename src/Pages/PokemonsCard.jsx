import { Text, View, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const getBackgroundColor = (type) => {
    switch (type) {
      case "normal":
        return "bg-gray-400";
      case "fighting":
        return "bg-red-500";
      case "flying":
        return "bg-blue-200";
      case "poison":
        return "bg-purple-500";
      case "ground":
        return "bg-yellow-800";
      case "rock":
        return "bg-yellow-500";
      case "bug":
        return "bg-teal-400";
      case "ghost":
        return "bg-violet-300";
      case "steel":
        return "bg-gray-00";
      case "fire":
        return "bg-red-400";
      case "water":
        return "bg-sky-300";
      case "grass":
        return "bg-emerald-300";
      case "electric":
        return "bg-yellow-400";
      case "psychic":
        return "bg-pink-400";
      case "ice":
        return "bg-blue-100";
      case "dragon":
        return "bg-red-900";
      case "dark":
        return "bg-gray-900";
      case "fairy":
        return "bg-pink-300";
      case "unknown":
        return "bg-gray-300";
      case "shadow":
        return "bg-gray-900";
      default:
        return "bg-slate-200";
    }
  };

export function PokemonsCard({name, url}) {
    const [pokemonStat, setPokemonStat] = useState({});

    useEffect(() => {
        const fetchpokemonStat = async () => {
        try {
            const response = await axios.get(`${url}`);
            setPokemonStat(response.data);
        } catch (error) {
            console.error('Error fetching Pokemon stat data:', error);
        }
        };

        fetchpokemonStat();
    }, []); 

    return (
        <View className="w-[50%] aspect-square flex items-center justify-center relative rounded">

            <View className={`absolute top-50 opacity-60 left-50 w-[100%] h-[100%] bg-slate-300 rounded ${pokemonStat.types && getBackgroundColor(pokemonStat.types[0].type.name)}`}></View>
            <View className={`absolute top-50 rounded-full opacity-40 left-50 w-[65%] h-[65%] bg-slate-300 ${pokemonStat.types && getBackgroundColor(pokemonStat.types[0].type.name)}`}></View>
            <View className={`absolute top-50 rounded-full left-50 w-[40%] h-[40%] bg-slate-300 ${pokemonStat.types && getBackgroundColor(pokemonStat.types[0].type.name)}`}></View>

            <Text className="text-slate-50 absolute bottom-6 text-4xl font-semibold capitalize">{name}</Text>
            { pokemonStat.sprites?.front_default ?
                <View ><Image style={styles.logo} source={{uri: pokemonStat.sprites.front_default}}/></View>
                :
                <View ><Image style={styles.logo} source={require('../../assets/noimage.png')}/></View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
      width: 150,
      height: 150,
    },
  });
