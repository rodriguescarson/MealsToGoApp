import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { SettingsNavigator } from "./settings.navigator";

import { RestaurantsContextProvider } from "../../../src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../../src/services/location/location.context";
import { FavourtiesContextProvider } from "../../../src/services/favourites/favourites.context";
import { colors } from "../../infrastructure/theme/colors";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Restaurants: "md-restaurant",
    Map: "md-map",
    Settings: "md-settings"
};

const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];
    return {
        headerShown: false,
        tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
        tabBarOptions: {
            activeTintColor: colors.brand.primary,
            inactiveTintColor: colors.brand.muted
        },
        tabBarActiveTintColor: colors.brand.primary,
        tabBarInactiveTintColor: colors.brand.muted,
        tabBarStyle: [
            {
                display: "flex"
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
                    <Tab.Navigator screenOptions={createScreenOptions}>
                        <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
                        <Tab.Screen name="Map" component={MapScreen} />
                        <Tab.Screen name="Settings" component={SettingsNavigator} />
                    </Tab.Navigator>
                </RestaurantsContextProvider>
            </LocationContextProvider>
        </FavourtiesContextProvider>
    );
};
