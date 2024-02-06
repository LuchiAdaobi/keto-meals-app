import { useState } from "react";
import Header from "./components/Header";
import Favorites from "./components/Favorites";
import Search from "./components/Search";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import { useGlobalContext } from "./context";

function App() {
  const {showModal, favorites} = useGlobalContext()
  return (
    <>
      <Header />
      <div className="wrapper">
        <Search />
        {favorites.length > 0 && <Favorites />}
        <Meals />
        {showModal && <Modal />}
      </div>
    </>
  );
}

export default App;
