import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";

const Card = ({ id, name, type, imageURL: imageUrl }) => {
  const { user } = useAuthContext();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "คุณแน่ใจหรือไม่ว่าต้องการลบร้านค้านี้?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        "http://localhost:5000/api/restaurants/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (response.ok) {
        alert("Restaurant deleted successfully!");
        window.location.reload();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to delete restaurant.");
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      alert("Error deleting restaurant. Please try again.");
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="h-48 w-full">
        <img
          src={
            imageUrl ||
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmMGYwZjAiLz4KPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+"
          }
          alt={name}
          className="h-48 w-full object-cover rounded-t-lg"
          loading="lazy"
          onError={(e) => {
            console.log("Image failed to load:", imageUrl);
            e.target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmMGYwZjAiLz4KPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+";
            e.target.onerror = null;
          }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{type}</p>
        <div className="card-actions justify-end">
          {user &&
            (user.authorities.includes("ROLE_ADMIN") ||
              user.authorities.includes("ROLE_MODERATOR")) && (
              <>
                <Link
                  to={`/update-restaurant/${id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                {user.authorities.includes("ROLE_ADMIN") && (
                  <button
                    onClick={() => handleDelete(id)}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                )}
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Card;
