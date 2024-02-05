import React, { useContext, useState, useEffect } from "react";
import recipes from "./mealDb";

const AppContext = React.createContext();

function AppProvider({ children }) {
  // STATE
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomMeal, setRandomMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [showIngredient, setShowIngredient] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  // VARIABLES
  const allMeals = recipes;

  // USEEFFECT
  useEffect(() => {
    setTimeout(() => {
      setMeals(allMeals);
      setSearchResults(allMeals);
      setLoading(false);
    }, 300);
  }, []);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       const randomizedMeals = [...allMeals].sort(() => Math.random() - 0.5);
  //       setMeals(randomizedMeals);
  //       setSearchResults(randomizedMeals);
  //       setLoading(false);
  //     }, 300);
  //   }, []);

  useEffect(() => {
    if (!searchTerm) return;
    handleSearch();
  }, [searchTerm, allMeals]);

  useEffect(() => {
    if (meals.length === 0) return;
    getRandomMeal();
    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm]);

  // FUNCTIONS
  function handleSearch() {
    const filteredMeals = allMeals.filter((meal) =>
      meal.mealName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredMeals);
    // setMeals(filteredMeals);
  }

  function getRandomMeal() {
    if (searchTerm && meals.length === 0) {
      handleSearch();
    } else if (!searchTerm && meals.length > 0) {
      const randomIndex = Math.floor(Math.random() * meals.length);
      const selectedRandomMeal = meals[randomIndex];
      setRandomMeal(selectedRandomMeal);
      return selectedRandomMeal;
    } else {
      console.error("No meals available");
      setRandomMeal(null);
      return null;
    }
  }
  function handleShowModal(id) {
    let meal

    meal = meals.find(meal => meal.id === id)
    setSelectedMeal(meal)
    setShowModal(true)
  }

  function handleHideModal() {
    setShowModal(false);
  }
  function handleShowRecipe() {
    showRecipe ? setShowRecipe(false) : setShowRecipe(true)
  }
  function handleShowIngredient() {
    showIngredient ? setShowIngredient(false) : setShowIngredient(true);
  }
  function handleShowNutrition() {
    showRecipe ? setShowRecipe(false) : setShowRecipe(true);
  }

  return (
    <AppContext.Provider
      value={{
        meals: searchResults,
        setMeals,
        setSearchTerm,
        getRandomMeal,
        loading,
        randomMeal,
        setRandomMeal,
        searchTerm,
        selectedMeal,
        showModal,
        handleShowModal,
        handleHideModal,
        handleShowRecipe,
        handleShowIngredient,
        handleShowNutrition,
        showRecipe,
        showIngredient,
        showNutrition,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(AppContext);
}

export { AppContext, AppProvider };
