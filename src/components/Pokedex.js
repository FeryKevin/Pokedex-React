import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PokedexComponent() {
    const [pokemon, setPokemon] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearchInput, setDebouncedSearchInput] = useState("");

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0")
            .then(res => res.json())
            .then(data => {
                setPokemon(data.results);
            });
    }, []);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedSearchInput(searchInput);
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }, [searchInput]);

    const filteredPokemon = pokemon.filter(p =>
        p.name.toLowerCase().includes(debouncedSearchInput.toLowerCase())
    );

    return (
        <>
            <h1>Pokedex</h1>
            <input type="text" placeholder="Pokemon" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
            {filteredPokemon.map((pokemon) => (
                <div key={pokemon.name}>
                    {pokemon.name}
                    <Link to={`/pokemon/${pokemon.name}`}>
                        <button>Voir</button>
                    </Link>
                    <br />
                </div>
            ))}
        </>
    );
}

export default PokedexComponent;
