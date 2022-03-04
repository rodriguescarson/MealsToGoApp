import camelize from "camelize";
import { locations } from "./location.mock";

export const locationRequest = (searchTerm) => {
    return new Promise((resolve, reject) => {
        const locationMock = locations[searchTerm];
        if (!locationMock) {
            reject("Not found")
        }
        resolve(locationMock)
    })
    //firebase return
    // return fetch(
    //     `http://localhost:5001/mealstogo-bbcf1/us-central1/geocode/?city=${searchTerm}`
    // ).then((res) => {
    //     return res.json();
    // });
}


export const locationTransform = (result) => {
    const formattedResponse = camelize(result)
    const { geometry = {} } = formattedResponse.results[0];
    const { lat, lng } = geometry.location;

    return { lat, lng, viewport: geometry.viewport };

}