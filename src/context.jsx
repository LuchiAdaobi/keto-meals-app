import React, { useContext, useState, useEffect } from "react";
import recipes from "./mealDb";

const AppContext = React.createContext();

function AppProvider({ children }) {
  // STATE
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomMeal, setRandomMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  //   const [isInitialLoad, setIsInitialLoad] = useState(true);

  // VARIABLES
  const allMeals = recipes;

  // USEEFFECT
  useEffect(() => {
    setTimeout(() => {
      setMeals(allMeals);
      setLoading(false);
    }, 1000);
  }, [allMeals]);

  useEffect(() => {
    if (!searchTerm) return;
    handleSearch();
  }, [searchTerm, allMeals]);


  useEffect(() => {
    if (meals.length === 0) return;
    getRandomMeal();
  }, []);

  // FUNCTIONS
  function handleSearch() {
    const filteredMeals = allMeals.filter((meal) =>
      meal.mealName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMeals(filteredMeals);
  }

  function getRandomMeal() {
    if (meals.length === 0) return

    const randomIndex = Math.floor(Math.random() * meals.length);
    const selectedRandomMeal = meals[randomIndex];
    setRandomMeal(selectedRandomMeal);
    console.log(selectedRandomMeal)
    return selectedRandomMeal;
  }

  return (
    <AppContext.Provider
      value={{
        meals,
        setMeals,
        setSearchTerm,
        getRandomMeal,
        loading,
        randomMeal,
        // setIsInitialLoad,
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
