
import { useState } from "react";

function showPokemon() {
    const [pokemon, setPokemon] = useState([]);

    async function fetchPokemon() {
        try {
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon/?limit=20"
            );
            const data = await response.json()
            setPokemon(data)
        } catch(e) {
            console.log(e)
        }
    }

    fetchPokemon();
    console.log(pokemon)
}

showPokemon()