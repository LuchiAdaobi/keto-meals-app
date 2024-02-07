import { useGlobalContext } from "../context";

export default function Modal() {
  const {
    selectedMeal,
    handleHideModal,
    showRecipe,
    handleShowRecipe,
    showIngredient,
    handleShowIngredient,
    showNutrition,
    handleShowNutrition,
    activeContent,
    showAllIngredients,
    setShowAllIngredients
  } = useGlobalContext();
  const {
    mealName,
    overview,
    totalTime,
    image,
    recipe,
    nutritionalFacts,
    originalSource,
    course,
    prepTime,
    cookTime,
  } = selectedMeal;
  return (
    <section className="container">
      <div className="modal-overlay">
        <img src={image} alt={mealName} className="image" />
        <div className="modal">
          <div className="modal-title">
            <h4>{mealName}</h4>
            <div className="timer">
              <img src="/clock4.jpg" alt="timer" />
              <p>{totalTime}</p>
            </div>
          </div>
          <p className="overview">{overview}</p>
          <div className="meal-summary">
            <p>
              <span>Course: </span>
              {course}
            </p>
            <p>
              <span>Prep Time: </span>
              {prepTime}
            </p>
            {cookTime && (
              <p>
                <span>Cook Time: </span>
                {cookTime}
              </p>
            )}
            <p>
              <span>Total Time: </span>
              {totalTime}
            </p>
            {nutritionalFacts.servings && (
              <p>
                <span>Serving: </span>
                {nutritionalFacts.servings}
              </p>
            )}
            <p>
              <span>Calories: </span>
              {nutritionalFacts.calories}
            </p>
          </div>

          <div className="modal-button-container">
            <button
              className={`btn ${
                activeContent === "recipe" && showRecipe ? "active" : ""
              }`}
              onClick={handleShowRecipe}
            >
              Recipe
            </button>
            <button
              className={`btn ${
                activeContent === "ingredient" && showIngredient ? "active" : ""
              }`}
              onClick={handleShowIngredient}
            >
              Ingredients
            </button>
            <button
              className={`btn ${
                activeContent === "nutrition" && showNutrition ? "active" : ""
              }`}
              onClick={handleShowNutrition}
            >
              Nutrition
            </button>
          </div>

          {showRecipe ? (
            <div className="recipe">
              {recipe.instructions.map((instruction, index) => (
                <p key={index}>{instruction}</p>
              ))}
            </div>
          ) : showNutrition ? (
            <div className="nutrition">
              {/* Render each nutritional fact if it exists */}
              {nutritionalFacts.calories && (
                <p>Calories: {nutritionalFacts.calories}</p>
              )}
              {nutritionalFacts.servings && (
                <p>Servings: {nutritionalFacts.servings}</p>
              )}
              {nutritionalFacts.fat && <p>Fat: {nutritionalFacts.fat}</p>}
              {nutritionalFacts.protein && (
                <p>Protein: {nutritionalFacts.protein}</p>
              )}
              {nutritionalFacts.carbs && <p>Carbs: {nutritionalFacts.carbs}</p>}
              {nutritionalFacts.carbohydrates && (
                <p>Carbohydrates: {nutritionalFacts.carbohydrates}</p>
              )}
              {nutritionalFacts.netCarbohydrates && (
                <p>Net Carbs: {nutritionalFacts.netCarbohydrates}</p>
              )}
              {nutritionalFacts.totalCarbohydrates && (
                <p>
                  Total Carbohydrates: {nutritionalFacts.totalCarbohydrates}
                </p>
              )}
              {nutritionalFacts.SaturatedFat && (
                <p>Saturated Fat: {nutritionalFacts.SaturatedFat}</p>
              )}
              {nutritionalFacts.transFat && (
                <p>Trans Fat: {nutritionalFacts.transFat}</p>
              )}
              {nutritionalFacts.PolyunsaturatedFat && (
                <p>
                  Polyunsaturated Fat: {nutritionalFacts.PolyunsaturatedFat}
                </p>
              )}
              {nutritionalFacts.MonounsaturatedFat && (
                <p>
                  Monounsaturated Fat: {nutritionalFacts.MonounsaturatedFat}
                </p>
              )}
              {nutritionalFacts.Cholesterol && (
                <p>Cholesterol: {nutritionalFacts.Cholesterol}</p>
              )}
              {nutritionalFacts.Sodium && (
                <p>Sodium: {nutritionalFacts.Sodium}</p>
              )}
              {nutritionalFacts.Potassium && (
                <p>Potassium: {nutritionalFacts.Potassium}</p>
              )}
              {nutritionalFacts.Fiber && <p>Fiber: {nutritionalFacts.Fiber}</p>}
              {nutritionalFacts.Sugar && <p>Sugar: {nutritionalFacts.Sugar}</p>}
              {nutritionalFacts.VitaminA && (
                <p>Vitamin A: {nutritionalFacts.VitaminA}</p>
              )}
              {nutritionalFacts.VitaminC && (
                <p>Vitamin C: {nutritionalFacts.VitaminC}</p>
              )}
              {nutritionalFacts.Calcium && (
                <p>Calcium: {nutritionalFacts.Calcium}</p>
              )}
              {nutritionalFacts.Iron && <p>Iron: {nutritionalFacts.Iron}</p>}

              <p className="note">
                <span>Note:</span> The information shown is from the{" "}
                <a href={originalSource} target="_blank">
                  source website
                </a>
                . It should not be considered a substitute for a professional
                nutritionist’s advice.
              </p>
            </div>
          ) : (
            showIngredient && (
              <div className="ingredients">
                {recipe.ingredients
                  .slice(0, showAllIngredients ? recipe.ingredients.length : 6)
                  .map((ingredient, index) => (
                    <div className="ingredient-card" key={index}>
                      <img src={ingredient.image} alt={ingredient.name} />
                      <p>{ingredient.name}</p>
                    </div>
                  ))}
              </div>
            )
          )}
          {showIngredient && <button
            className="btn view"
            onClick={() => setShowAllIngredients(!showAllIngredients)}
          >
            {showAllIngredients ? "View Less" : "View All"}
          </button>}
          <div className="source">
            <a href={originalSource} target="_blank" className="source">
              Original Source
            </a>
          </div>
          <button className="btn close" onClick={handleHideModal}>
            x
          </button>
        </div>
      </div>
    </section>
  );
}

