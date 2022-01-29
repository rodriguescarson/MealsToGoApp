import React, { useContext } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text, Button } from "react-native";

import { SafeArea } from "../../components/utility/safe-area.component";
import { RestaurantsNavigator } from './restaurants.navigator'
import { MapScreen } from '../../features/map/screens/map.screen';
import { AuthenticationContext } from '../../services/authentication/authentication.context';

import { RestaurantsContextProvider } from "../../../src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../../src/services/location/location.context";
import { FavourtiesContextProvider } from "../../../src/services/favourites/favourites.context";


const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Restaurants: "md-restaurant",
    Map: "md-map",
    Settings: "md-settings",
};

const Settings = () => {
    const { onLogout } = useContext(AuthenticationContext)
    return (
        <SafeArea>
            <Button title="logout" onPress={() => onLogout()} />
        </SafeArea>
    )
}

const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];
    return {
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
            <Ionicons name={iconName} size={size} color={color} />
        ),
        tabBarOptions: {
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
        },
        "tabBarActiveTintColor": "tomato",
        "tabBarInactiveTintColor": "gray",
        "tabBarStyle": [
            {
                "display": "flex"
            },
            null
        ]

    };
};

export const AppNavigator = () => {
    return (
        <FavourtiesContextProvider>
            <LocationContextProvider>
                <RestaurantsContextProvider>
                    <Tab.Navigator
                        screenOptions={createScreenOptions}
                    >
                        <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
                        <Tab.Screen name="Map" component={MapScreen} />
                        <Tab.Screen name="Settings" component={Settings} />
                    </Tab.Navigator>
                </RestaurantsContextProvider>
            </LocationContextProvider>
        </FavourtiesContextProvider>
    )
}
