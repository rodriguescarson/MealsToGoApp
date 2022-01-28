import React, { createContext, useState, useEffect, useDebugValue } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavouritesContext = createContext();

export const FavourtiesContextProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([])

    useEffect(() => {
        loadFavourites(favourites)
    }, [])

    useEffect(() => {
        saveFavourites(favourites)
    }, [favourites])

    const saveFavourites = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@favourites', jsonValue)
        } catch (e) {
            // saving error
            console.log("Error loading", e)
        }
    }

    const loadFavourites = async () => {
        try {
            const value = await AsyncStorage.getItem('@favourites')
            if (value !== null) {
                setFavourites(JSON.parse(value))
            }
        } catch (e) {
            // error reading value
            console.log("Error storing", e)
        }
    }


    const add = (restaurant) => {
        setFavourites([...favourites, restaurant])
    }

    const remove = (restaurant) => {
        const newFavourites = favourites.filter(
            (x) => x.placeId !== restaurant.placeId
        );

        setFavourites(newFavourites);
    };
    return (
        <FavouritesContext.Provider
            value={{
                favourites,
                addToFavourites: add,
                removeFromFavourites: remove,
            }}
        >
            {
                children
            }
        </FavouritesContext.Provider>

    )
}