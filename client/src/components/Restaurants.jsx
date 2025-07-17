import React from "react";
import Card from "./Card";

const Restaurants = ({ restaurants, onDelete }) => {
  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
  };

  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center gap-4">
        {restaurants &&
          restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              type={restaurant.type}
              imageUrl={restaurant.imageUrl}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default Restaurants;
