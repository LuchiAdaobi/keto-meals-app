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
      {/* <Favorites /> */}
      {/* <Search /> */}
      <Meals />
      {/* <Modal /> */}
    </>
  );
}

export default App;
