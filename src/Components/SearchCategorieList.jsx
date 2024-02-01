import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

const getBackgroundImage = (type) => {
  switch (type) {
    case "normal":
      return "Type_normal.png";
    case "fighting":
      return "Type_fighting.png";
    case "flying":
      return "Type_flying.png";
    case "poison":
      return "Type_poison.png";
    case "ground":
      return "Type_ground.png";
    case "rock":
      return "Type_rock.png";
    case "bug":
      return "Type_bug.png";
    case "ghost":
      return "Type_ghost.png";
    case "steel":
      return "Type_steel.png";
    case "fire":
      return "Type_fire.png";
    case "water":
      return "Type_water.png";
    case "grass":
      return "Type_grass.png";
    case "electric":
      return "Type_electric.png";
    case "psychic":
      return "Type_psychic.png";
    case "ice":
      return "Type_ice.png";
    case "dragon":
      return "Type_dragon.png";
    case "dark":
      return "Type_dark.png";
    case "fairy":
      return "Type_fairy.png";
    case "unknown":
      return "Type_unknown.png";
    case "shadow":
      return "Type_shadow.png";
    default:
      return "bg-slate-200";
  }
};

export function SearchCategorieList() {
  const navigation = useNavigation();

  const [typeData, setTypeData] = useState([]);

  const fetchTypeData = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      const data = response.data;
      setTypeData(data.results);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  useEffect(() => {
    fetchTypeData();
  }, []);

  return (
    <ScrollView className="w-full min-h-full grow-1 px-2">
      <View className="flex flex-row flex-wrap mx-auto gap-2">
        {typeData.map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SearchCategorie", {
                urlFetch: item.url,
              })
            }
            className={`h-[180] min-w-[40%] flex-1 rounded-lg ${
              index % 4 === 0 && "min-w-[98%]"
            }`}
            key={index}
          >
            <View
              className={`absolute top-50 opacity-60 left-50 w-[100%] h-[100%] bg-slate-300 rounded-lg ${getBackgroundColor(
                item.name
              )}`}
            ></View>
            <View
              className={`absolute top-50 rounded-full opacity-40 left-50 w-[65%] h-[65%] bg-slate-300 ${getBackgroundColor(
                item.name
              )}`}
            ></View>
            <View
              className={`absolute top-50 rounded-full left-50 w-[40%] h-[40%] bg-slate-300 ${getBackgroundColor(
                item.name
              )}`}
            ></View>
            <View className="w-full flex mx-auto">
              <View>
                <Image
                  style={styles.logo}
                  source={require('../../assets/types/'+getBackgroundImage(item.name))}
                />
              </View>
              <Text className="text-slate-50 text-4xl font-semibold capitalize">
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  },
});
