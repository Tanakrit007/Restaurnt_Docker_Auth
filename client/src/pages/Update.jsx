import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const Update = () => {
  //1. get id from URL
  const { id } = useParams();
  const [restaurant, setRestaurants] = useState({
    title: "",
    type: "",
    img: "",
  });
  //2. get restaurant by id
  useEffect(() => {
    fetch("http://localhost:3000/restaurants/" + id)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setRestaurants(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurants({ ...restaurant, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/restaurants/" + id, {
        method: "PUT",
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
          Update Restaurant
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
        <button
          className="btn btn-info justify-self-center text-1xl text-center m-2 gap-x-5 space-x-5"
          onClick={handleSubmit}
        >
          Update
        </button>
        <button
          className="btn btn-secondary justify-self-center justify-center  text-1xl text-center m-2 gap-x-5 space-x-5"
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

export default Update;
