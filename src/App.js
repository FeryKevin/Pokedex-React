import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PokedexComponent from "./components/Pokedex";
import PokemonDetails from "./components/Pokemon";

function App() {
  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<PokedexComponent />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
