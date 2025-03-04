import React, { useState, useEffect } from "react";
import "./RoleCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const RoleCard = ({ role }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        console.log("role id:", role.name);
        const response = await fetch(
          "http://localhost:5000/media/favorite/role/status",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: localStorage.getItem("user_id"),
              role_id: role.role_id,
            }),
          }
        );
        if (response.status === 200) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };
    fetchFavorite();
  }, [role.role_id]);

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    try {
      await fetch("http://localhost:5000/media/favorite/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          role_id: role.id,
          is_favorite: !isFavorite,
        }),
      });
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className="role-card111">
      <img src={role.img} alt={role.name} className="role-img111" />
      <div className="role-info111">
        <h4>{role.name}</h4>
        <p>{role.role_type}</p>
      </div>
    </div>
  );
};

export default RoleCard;
