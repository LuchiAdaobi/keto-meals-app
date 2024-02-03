import React, { useContext, useState, useEffect } from "react";
import recipes from "./mealDb"; 

const AppContext = React.createContext()

function AppProvider({children}){
    // STATE
    const [meals, setMeals] = useState([])
    // VARIABLES
    const allMeals = recipes
    const randomMeal = []
    // USEEFFECT
    useEffect(()=>{
        fetchMeals()
    }, [])
    // FUNCTIONS
    function fetchMeals(){
        setMeals(allMeals)
    }
    return(
        <AppContext.Provider
        value={{meals}}>
            {children}
        </AppContext.Provider>
    )
}

export function useGlobalContext(){
    return useContext(AppContext)
}

export {AppContext, AppProvider}