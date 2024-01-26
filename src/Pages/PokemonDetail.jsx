import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Competences } from '../Components/Competences'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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


export function PokemonDetail({ route }) {
    const { pokemonDetail } = route.params;
    const navigation = useNavigation();

    return (
        <>
            <View className=" relative z-[10]">
            <TouchableOpacity onPress={() => navigation.navigate('app')} className="absolute top-12 left-4 w-14 h-14 bg-white/90 border border-slate-200 rounded-full flex justify-center items-center active:scale-90 ">
                    <Text>
                        <Ionicons name="chevron-back-outline" style={styles.love}></Ionicons>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="absolute top-12 right-4 love  w-14 h-14 bg-white/90 border border-slate-200 rounded-full flex justify-center items-center active:scale-90 ">
                    <Text>
                        <Ionicons name="heart-outline" style={styles.love}></Ionicons>
                        {/* <Ionicons name="heart" style={styles.loveSelected}></Ionicons> */}
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View className="w-[100%] aspect-square relative" style={styles.flexCenter}>
                    <View className={`absolute top-0 h-[100%] w-[100%] opacity-60 ${pokemonDetail.types && getBackgroundColor(pokemonDetail.types[0].type.name)}`}></View>
                    <View className={`absolute top-[15%] rounded-full left-[12%] w-[75%] aspect-square bg-slate-300 opacity-40 ${pokemonDetail.types && getBackgroundColor(pokemonDetail.types[0].type.name)}`}></View>
                    <View className={`absolute top-[30%] rounded-full left-[29%] w-[40%] aspect-square bg-slate-300 ${pokemonDetail.types && getBackgroundColor(pokemonDetail.types[0].type.name)}`}></View>
                    <Image style={styles.logo} source={{ uri: pokemonDetail.sprites.front_default }} />
                </View>
                <View className="w-[100%] py-4 px-4 flex gap-y-6">
                    <View>
                        <View className="flex justify-between flex-row items-center">
                            <Text className="text-3xl font-medium">{pokemonDetail.forms[0].name}</Text>
                            <View className="flex gap-2 flex-row">
                                {pokemonDetail.types.map((item, index) => {
                                    return (
                                        <View key={index} className={`text-slate-100 px-3 h-[23] rounded-full flex justify-center ${pokemonDetail.types && getBackgroundColor(item.type.name)}`}><Text className="text-slate-100">{item.type.name}</Text></View>
                                    )
                                })}
                            </View>
                        </View>
                        <Text className="text-lg font-normal text-slate-500">{pokemonDetail.height}0cm | {pokemonDetail.height}kg</Text>
                    </View>
                    <View>
                        <Text className="text-xl font-medium text-slate-800">Variante</Text>
                        <View className="flex flex-row">
                            <Image className="w-[25%] aspect-square" source={{ uri: pokemonDetail.sprites.front_default }} />
                            <Image className="w-[25%] aspect-square" source={{ uri: pokemonDetail.sprites.back_default }} />
                            <Image className="w-[25%] aspect-square" source={{ uri: pokemonDetail.sprites.front_shiny }} />
                            <Image className="w-[25%] aspect-square" source={{ uri: pokemonDetail.sprites.back_shiny }} />
                        </View>
                    </View>
                    <View>
                        <Text className="text-xl font-medium text-slate-800">Statistiques</Text>
                        {pokemonDetail.stats.map((item, index) => {
                            return (
                                <View key={index} className="flex flex-row justify-between">
                                    <Text className="text-lg font-normal text-slate-500">{item.stat.name}</Text>
                                    <Text className="text-lg font-normal text-slate-500">{item.base_stat}</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View>
                        <Text className="text-xl font-medium text-slate-800 mb-1">Spécificité</Text>
                        <View className="divide-y-2 divide-slate-200/80 flex">
                            {pokemonDetail.abilities.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <Competences url={item.ability.url} />
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View>
                        <Text className="text-xl font-medium text-slate-800">Evolutions</Text>
                        <View className="flex flex-row">
                            {pokemonDetail.forms.map((item, index) => {
                                return (
                                    <View key={index} className="flex flex-col items-center">
                                        <Image className="w-[25%] aspect-square" source={{ uri: pokemonDetail.sprites.front_default }} />
                                        <Text className="text-lg font-normal text-slate-500">{item.name}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                    <View>
                        <Text className="text-xl font-medium text-slate-800">Attaques</Text>
                        {pokemonDetail.moves.map((item, index) => {
                            return (
                                <Text key={index} className="text-lg font-normal text-slate-500">{item.move.name}</Text>
                            )
                        })}
                    </View>

                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 330,
        height: 330,
    },
    love: {
        fontSize: 30,
        marginTop: 4,
    },
    loveSelected: {
        marginTop: 4,
        fontSize: 30,
        color: '#FF0000',
    },
    flexCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
