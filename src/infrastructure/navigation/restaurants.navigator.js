import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen"
const RestaurantStack = createStackNavigator()
import { RestaurantDetailScreen } from '../../features/restaurants/screens/restaurant-detail.screen'
export const RestaurantsNavigator = () => {
    return (
        <RestaurantStack.Navigator
            screenOptions={{
                ...TransitionPresets.ModalPresentationIOS,
                headerShown: false
            }}
        >
            <RestaurantStack.Screen
                name="RestaurantsScreen"
                component={RestaurantsScreen}
            />
            <RestaurantStack.Screen
                name="RestaurantDetail"
                component={RestaurantDetailScreen}
            />
        </RestaurantStack.Navigator>
    )
}