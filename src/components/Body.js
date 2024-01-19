import { restaurantList } from "../contants";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";
import useAllRestaurant from "../utils/useAllRestaurant";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const { user, setUser } = useContext(UserContext);
  const allRestaurants = useAllRestaurant();
  const [filteredRestaurants, setFilteredRestaurants] = useState(allRestaurants);
  
  useEffect(() => {
    setFilteredRestaurants(allRestaurants)
  }, [allRestaurants])

  const isOnline = useOnline()

  if (!allRestaurants) return null;
  console.log('All data', allRestaurants)
  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container p-5 bg-pink-50 my-5">
        <input
          data-testid="search-input"
          type="text"
          className="focus:bg-green-200 p-2 m-2"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          data-testid="search-btn"
          className="p-2 m-2 bg-purple-900 hover:bg-gray-500 text-white rounded-md"
          onClick={() => {
            //need to filter the data
            console.log(searchText)
            const data = filterData(searchText, allRestaurants);
            console.log('data', data)
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
        <input
          value={user.name}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
        ></input>
        <input
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
        ></input>
      </div>
      <div className="flex flex-wrap " data-testid="res-list">
        
        {filteredRestaurants?.length === 0 ? <div>No data found</div> : filteredRestaurants.map((restaurant) => {
          return  (
            <Link
              to={"/restaurant/" + restaurant.info.id}
              key={restaurant.info.id}
            >
              <RestaurantCard {...restaurant.info} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Body;
