import { useState, useEffect } from "react";

const useAllRestaurant = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            await getRestaurants()
          } catch (error) {
            console.log('unknown error occured ', error)
          }
        }
    
        fetchData()
      }, [])
    
      async function getRestaurants() {
        try {
          const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
          );
          const json = await data.json();
          const dataInArray = json.data.cards[2].card.card?.gridElements?.infoWithStyle?.restaurants
          setAllRestaurants(dataInArray);
        } catch (error) {
          console.log('unknown error occured please refresh ', error)
        }
       
      }

    return allRestaurants;
}

export default useAllRestaurant;