import React, { useState } from "react";

export const Add = () => {
  const [restaurant, setRestaurants] = useState({
    name: "",
    type: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurants({ ...restaurant, [name]: value });
  };

  const handleSubmit = async () => {
    if (!restaurant.name || !restaurant.type || !restaurant.imageUrl) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/v1/restaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurant),
      });
      if (response.ok) {
        alert("Restaurant added successfully !!");
        window.location.reload();
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
      <div className="mb-5 flex justify-center items-center max-w gap-4">
        <label className="input">
          Name :
          <input
            type="text"
            name="name"
            className="grow"
            placeholder="Add Name"
            value={restaurant.name}
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
            name="imageUrl"
            className="grow"
            placeholder="Add img"
            value={restaurant.imageUrl}
            onChange={handleChange}
          />
        </label>
        {restaurant.imageUrl && (
          <div className="flex items-center gap-2">
            <img className="h-32" src={restaurant.imageUrl} alt="Preview" />
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
              name: "",
              type: "",
              imageUrl: "",
            })
          }
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
