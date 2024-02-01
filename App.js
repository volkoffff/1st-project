import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Pokemons } from './src/Pages/Pokemons';
import { Settings } from './src/Pages/Settings';
import { Search } from './src/Pages/Search';
import { Equipe } from './src/Pages/Equipe';
import {PokemonDetail} from './src/Pages/PokemonDetail';
import { SearchCategorie } from './src/Pages/SearchCategorie';


function PokemonsScreen() {
  return (
    <Pokemons />
  );
}

function SearchScreen() {
  return (
    <Search />
  );
}

function EquipeScreen() {
  return (
    <Equipe />
  );
}

function SettingsScreen() {
  return (
    <Settings />
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown:false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings-sharp' : 'settings-sharp';
          }
          else if (route.name === 'Équipe') {
            iconName = focused ? 'logo-ionic' : 'logo-ionic';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      
      <Tab.Screen name="Home" component={PokemonsScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Équipe" component={EquipeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />

    </Tab.Navigator>
  );
}

const MainNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={({ route }) => ({
      headerShown:false
    })}
      >
      <Stack.Screen name="app" component={MyTabs} />
      <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
      <Stack.Screen name="SearchCategorie" component={SearchCategorie} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <MainNavigator />
          </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});