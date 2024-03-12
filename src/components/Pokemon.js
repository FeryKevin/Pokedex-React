import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function PokemonDetails() {
    const [pokemon, setPokemon] = useState(null);
    const [location, setLocation] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => res.json())
            .then(data => {
                setPokemon(data);
            });
    }, []);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/encounters`)
            .then(res => res.json())
            .then(data => {
                setLocation(data);
            });
    }, []);

    if(!pokemon){
        return <div>Indéfinie</div>;
    }

    if(!location){
        return <div>Null</div>;
    }

    return (
        <div>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
            <img src={pokemon.sprites.front_shiny} alt={pokemon.name}/>
            <img src={pokemon.sprites.back_default} alt={pokemon.name}/>
            <img src={pokemon.sprites.back_shiny} alt={pokemon.name}/><br></br>
            <audio src={pokemon.cries.latest} controls></audio>
            <h3>Taille : {pokemon.height/10} m</h3>
            <h3>Poids : {pokemon.weight/10} kg</h3>
            <h3>Type(s)</h3>
            {pokemon.types.map(type => (
                <li>{type.type.name}</li>
            ))}
            <h3>Talents</h3>
            {pokemon.abilities.map(ability => (
                <li>{ability.ability.name}</li>
            ))}
            <h3>Base stats</h3>
            {pokemon.stats.map(stat => (
                <li>{stat.stat.name} : {stat.base_stat}</li>
            ))}
            <h3>Localisations</h3>
            {location.map(location => (
                <li>{location.location_area.name}</li>
            ))}
            <Link to={`/`}>
                <button>Retour</button>
            </Link>
        </div>
    );
}

export default PokemonDetails;
