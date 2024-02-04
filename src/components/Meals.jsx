import { useGlobalContext } from "../context";

export default function Meals() {
  const { meals, randomMeal, loading } = useGlobalContext();

  return (
    <main className="container">
      <section className="meals-container">
        {loading ? (
          <h4 className="no-meal-text">Loading...</h4>
        ) : meals.length === 0 ? (
          <h4 className="no-meal-text">
            Sorry, there is no result for your search. Please try again.
          </h4>
        ) : (
          <div className="meals">
            {randomMeal ? (
              // Render randomMeal if it exists
              <div className="single-meal" key={randomMeal.id}>
                <img src={randomMeal.image} alt={randomMeal.mealName} />
                <h4>{randomMeal.mealName}</h4>
                <p className="course">Course : {randomMeal.course}</p>
                <div className="meal-timing">
                  <p className="text-small">{randomMeal.totalTime}</p>
                  <p className="text-small">|</p>
                  <p className="text-small">{randomMeal.prepLevel} lvl</p>
                </div>
              </div>
            ) : (
              // Render meals if randomMeal doesn't exist
              meals.map((singleMeal) => {
                const { id, image, mealName, prepLevel, totalTime, course } =
                  singleMeal;
                return (
                  <div className="single-meal" key={id}>
                    <img src={image} alt={mealName} />
                    <h4>{mealName}</h4>
                    <p className="course">Course : {course}</p>
                    <div className="meal-timing">
                      <p className="text-small">{totalTime}</p>
                      <p className="text-small">|</p>
                      <p className="text-small">{prepLevel} lvl</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </section>
    </main>
  );
}
