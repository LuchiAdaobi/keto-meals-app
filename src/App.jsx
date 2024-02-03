import { useState } from "react";
import Header from "./components/Header";
import Favorites from "./components/Favorites";
import Search from "./components/Search";
import Meals from "./components/Meals";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <Header />
      <div className="wrapper">
        <Search />
        {/* <Favorites /> */}
        <Meals />
        {/* <Modal /> */}
      </div>
    </>
  );
}

export default App;
