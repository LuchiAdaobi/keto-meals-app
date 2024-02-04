import { useGlobalContext } from "../context";

export default function Meals() {
  const { meals } = useGlobalContext();

  return (
    <main className="container">
      <section className="meals-container">
        {meals.length < 1 && (
          <h4 className="no-meal-text">
            Sorry, there is no result for your search. Please try again.
          </h4>
        )}

        <div className="meals">
          {meals.map((singleMeal) => {
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
          })}
        </div>
      </section>
    </main>
  );
}