import { useGlobalContext } from "../context";
import { BsHandThumbsUp } from "react-icons/bs";

export default function Meals() {
  const {
    meals,
    randomMeal,
    loading,
    handleShowModal,
    addToFavorites,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    searchTerm,
  } = useGlobalContext();

  const indexOfLastMeal = currentPage * itemsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

  // Pagination Logic
  let pageNumber = [];
  for (let i = 1; i <= Math.ceil(meals.length / itemsPerPage); i++) {
    pageNumber.push(i);
  }

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
                <img
                  src={randomMeal.image}
                  alt={randomMeal.mealName}
                  onClick={() => handleShowModal(randomMeal.id)}
                />

                <button className="like-btn">
                  <BsHandThumbsUp
                    onClick={() => addToFavorites(randomMeal.id)}
                  />
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
              currentMeals.map((singleMeal) => {
                const { id, image, mealName, prepLevel, totalTime, course } =
                  singleMeal;
                return (
                  <div className="single-meal" key={id}>
                    <div className="content">
                      <img
                        src={image}
                        alt={mealName}
                        onClick={() => handleShowModal(singleMeal.id)}
                      />

                      <button className="like-btn">
                        <BsHandThumbsUp onClick={() => addToFavorites(id)} />
                      </button>

                      <h4>{mealName}</h4>
                      <p className="course">Course : {course}</p>
                      <div className="meal-timing">
                        <p className="text-small">{totalTime}</p>
                        <p className="text-small">|</p>
                        <p className="text-small">{prepLevel} lvl</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
        {/* PAGINATION */}
        {meals.length > 0 && !randomMeal && !searchTerm && (
          <div className="pagination">
            <button
              className={currentPage === 1 ? "btn disabled" : "btn"}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage == 1}
            >
              Prev
            </button>

            {pageNumber.map((number) => (
              <button
                className={number === currentPage ? "btn active" : "btn"}
                key={number}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            ))}

            <button
              className={
                currentPage === pageNumber.length ? "btn disabled" : "btn"
              }
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageNumber.length}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
