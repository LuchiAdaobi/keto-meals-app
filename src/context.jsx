import React, { useContext, useState, useEffect } from "react";
import recipes from "./mealDb";

const AppContext = React.createContext();

function AppProvider({ children }) {
  // STATE
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // VARIABLES
  const allMeals = recipes;
  const randomMeal = [];

  // USEEFFECT
  useEffect(() => {
    setMeals(allMeals);
  }, []);

  useEffect(() => {
    // fetchMeals(`${allMeals}${searchTerm}`)
    if (!searchTerm) return;
    handleSearch()
  }, [searchTerm, allMeals]);

  // FUNCTIONS
  function handleSearch() {
    const filteredMeals = allMeals.filter((meal) =>
      meal.mealName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMeals(filteredMeals);
  }

  // function handleSearch(id){
  //     const searchResults = meals.find(meal => )
  // }

  return (
    <AppContext.Provider value={{ meals, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(AppContext);
}

export { AppContext, AppProvider };
