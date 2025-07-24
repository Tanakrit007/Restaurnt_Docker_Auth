import React, { useState } from "react";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    const { username, name, email, password } = user;
    if (!username || !name || !email || !password) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("Register successful!");
        window.location.reload();
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };

  const handleReset = () => {
    setUser({
      username: "",
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="title justify-center text-3xl text-center m-5">
        Register
      </h1>
      <div className="mb-5 flex flex-col items-center gap-4">
        <label className="input w-full max-w-md">
          Username :
          <input
            type="text"
            name="username"
            className="grow"
            placeholder="Enter username"
            value={user.username}
            onChange={handleChange}
          />
        </label>
        <label className="input w-full max-w-md">
          Name :
          <input
            type="text"
            name="name"
            className="grow"
            placeholder="Enter name"
            value={user.name}
            onChange={handleChange}
          />
        </label>
        <label className="input w-full max-w-md">
          Email :
          <input
            type="email"
            name="email"
            className="grow"
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label className="input w-full max-w-md">
          Password :
          <input
            type="password"
            name="password"
            className="grow"
            placeholder="Enter password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="flex justify-center gap-4">
        <button className="btn btn-success" onClick={handleSubmit}>
          Register
        </button>
        <button className="btn btn-error" onClick={handleReset}>
          Cancel
        </button>
      </div>
    </div>
  );
};
