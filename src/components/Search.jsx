import { useGlobalContext } from "../context";
import { useState, useEffect } from "react";

export default function Search() {
  const { setSearchTerm, getRandomMeal, setMeals,randomMeal, setIsInitialLoad } = useGlobalContext();
  const [text, setText] = useState("");

  useEffect(() => {
    getRandomMeal();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
    }
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleRandomMeal() {
    setSearchTerm("");
    setText("");
    getRandomMeal()
  }


  return (
    <main className="container">
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="egusi soup"
            className="form-input"
            value={text}
            onChange={handleChange}
          />
          <button className="btn" type="submit">
            Search
          </button>
          <button
            className="btn btn-hipster"
            type="button"
            onClick={handleRandomMeal}
          >
            Surprise Me
          </button>
        </form>
      </div>
    </main>
  );
}
