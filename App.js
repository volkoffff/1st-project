import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Pokemons } from './src/Pages/Pokemons';
import { Settings } from './src/Pages/Settings';
import { Search } from './src/Pages/Search';
import { Equipe } from './src/Pages/Equipe';

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

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
