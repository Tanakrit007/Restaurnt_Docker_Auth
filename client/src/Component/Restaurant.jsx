import React from "react";
import Card from "./Card";

const Restaurants = ({ restaurants }) => {
  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center gap-4">
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              type={restaurant.type}
              imageURL={restaurant.imageURL || restaurant.img}
            />
          ))
        ) : (
          <div className="text-center p-4">
            <h2 className="text-xl font-semibold mb-2">No restaurants found</h2>
            <p className="text-gray-600">
              Please try again later or refine your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
