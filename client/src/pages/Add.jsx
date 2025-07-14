import React, { useState } from "react";
import NavBar from "../components/NavBar";

export const Add = () => {
  const [restaurant, setRestaurants] = useState({
    title: "",
    type: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurants({ ...restaurant, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurant),
      });
      if (response.ok) {
        alert("Restaurant added successfully !!");
        setRestaurants({
          title: "",
          type: "",
          img: "",
        });
      } else {
        alert("Failed to add restaurant.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="title justify-center text-3xl text-center m-5 gap-x-5">
          Add Restaurant
        </h1>
      </div>
      <div className="mb-5 flex justify-center items-center max-w">
        <label className="input">
          Name :
          <input
            type="text"
            name="title"
            className="grow"
            placeholder="Add Name"
            value={restaurant.title}
            onChange={handleChange}
          />
        </label>
        <label className="input">
          Details :
          <input
            type="text"
            name="type"
            className="grow"
            placeholder="Add details"
            value={restaurant.type}
            onChange={handleChange}
          />
        </label>
        <label className="input">
          Img :
          <input
            type="text"
            name="img"
            className="grow"
            placeholder="Add img"
            value={restaurant.img}
            onChange={handleChange}
          />
        </label>
        {restaurant.img && (
          <div className="flex items-center gap-2">
            <img className="h-32" src={restaurant.img} alt="Preview" />
          </div>
        )}
      </div>
      <div>
        <button className="btn btn-soft btn-success" onClick={handleSubmit}>
          Add
        </button>
        <button
          className="btn btn-soft btn-error "
          onClick={() =>
            setRestaurants({
              title: "",
              type: "",
              img: "",
            })
          }
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
