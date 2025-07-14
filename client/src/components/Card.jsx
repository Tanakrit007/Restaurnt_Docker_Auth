import React from "react";

const Card = (props) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบร้านค้านี้?");
    if (!confirmDelete) return;
    try {
      const response = await fetch("http://localhost:3000/restaurants/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Restaurant added successfully !!");
      } else {
        alert("Failed to add restaurant.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={props.img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {props.title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{props.type}</p>
        <div className="card-actions justify-end">
          <a href={"/update/" + props.id} className="btn btn-warning">
            Edit
          </a>
          <button
            onClick={() => handleDelete(props.id)}
            className="btn btn-error"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
