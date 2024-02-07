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
  const [showIngredient, setShowIngredient] = useState(true);
  const [showNutrition, setShowNutrition] = useState(false);
  const [activeContent, setActiveContent] = useState("ingredient");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favKetoMeals")) || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllIngredients, setShowAllIngredients] = useState(false);

  // VARIABLES
  const allMeals = recipes;
  const itemsPerPage = 12;

  // USEEFFECT
  useEffect(() => {
    setTimeout(() => {
      setMeals(allMeals);
      setSearchResults(allMeals);
      setLoading(false);
    }, 300);
  }, []);

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
  function handleShowModal(id, favorites) {
    let meal;
    if (favorites) {
      meal = favorites.find((meal) => meal.id === id);
      setSelectedMeal(meal);
      setShowModal(true);
      setActiveContent("ingredient");
      setShowIngredient(true);
      setShowNutrition(false);
      setShowRecipe(false);
    } else {
      meal = meals.find((meal) => meal.id === id);
      setSelectedMeal(meal);
      setShowModal(true);
      setActiveContent("ingredient");
      setShowIngredient(true);
      setShowNutrition(false);
      setShowRecipe(false);
    }
  }

  function handleHideModal() {
    setShowModal(false);
  }

  function handleShowRecipe() {
    setShowRecipe((prevShowRecipe) => !prevShowRecipe);
    setActiveContent("recipe");
    setShowIngredient(false);
    setShowNutrition(false);
  }

  function handleShowIngredient() {
    setShowIngredient((prevShowIngredient) => !prevShowIngredient);
    setActiveContent("ingredient");
    setShowRecipe(false);
    setShowNutrition(false);
  }

  function handleShowNutrition() {
    setShowNutrition((prevShowNutrition) => !prevShowNutrition);
    setActiveContent("nutrition");
    setShowRecipe(false);
    setShowIngredient(false);
  }

  function addToFavorites(id) {
    const alreadyFav = favorites.find((fav) => fav.id === id);
    if (alreadyFav) return;
    const favoriteMeals = meals.map((meal) => {
      return meal.id === id;
    });
    const selectedMeal = meals.find((meal) => meal.id === id);
    if (!selectedMeal) return;

    const updatedFavorites = [...favorites, selectedMeal];
    setFavorites(updatedFavorites);
    localStorage.setItem("favKetoMeals", JSON.stringify(updatedFavorites));
  }
  function removeFromFavorites(id) {
    const updatedFavorites = favorites.filter((meal) => meal.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favKetoMeals", JSON.stringify(updatedFavorites));
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
        activeContent,
        setActiveContent,
        addToFavorites,
        removeFromFavorites,
        favorites,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        showAllIngredients,
        setShowAllIngredients
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
