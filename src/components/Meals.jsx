import { useGlobalContext } from "../context";
import { BsHandThumbsUp } from "react-icons/bs";

export default function Meals() {
  const { meals, randomMeal, loading, handleShowModal } = useGlobalContext();

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
              <div
                className="single-meal"
                key={randomMeal.id}
                onClick={() => handleShowModal(randomMeal.id)}
              >
                <img src={randomMeal.image} alt={randomMeal.mealName} />

                <button className="like-btn">
                  <BsHandThumbsUp />
                </button>

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
                  <div
                    className="single-meal"
                    key={id}
                    onClick={() => handleShowModal(singleMeal.id)}
                  >
                    <img src={image} alt={mealName} />

                    <button className="like-btn">
                      <BsHandThumbsUp />
                    </button>

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
