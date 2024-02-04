import { useGlobalContext } from "../context";
import { useState } from "react";

export default function Search() {
  const {setSearchTerm} = useGlobalContext()
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
    if (text){
      setSearchTerm(text)
    }
    
  }

  function handleChange(e){
    setText(e.target.value)
  }
  return (
    <main className="container">
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="egusi soup" className="form-input" value={text} onChange={handleChange}/>
          <button className="btn" type="submit">
            Search
          </button>
          <button className="btn btn-hipster" type="button">
            Surprise Me
          </button>
        </form>
      </div>
    </main>
  );
}
