import React from "react";
import { useGlobalContext } from "../context";

export default function Favorites() {
  const { favorites, removeFromFavorites, handleShowModal } = useGlobalContext();
  return (
    <section className="container">
      <div className="favorites">
        <h4>Favorites</h4>
        <div className="favorite-container">
          {favorites.map((fav) => {
            const { id, mealName, image } = fav;
           return( <div className="single-fav" key={id}>
              <img src={image} alt={mealName} onClick={() => handleShowModal(id)}/>
              <button className="remove-btn" onClick={() => removeFromFavorites(id)}>
                remove
              </button>
            </div>);
          })}
        </div>
      </div>
    </section>
  );
}
