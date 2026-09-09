import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  image: string;
}

export default function Index() {
  
  /*
  React useState is a hook that allows functional componenets to manage local state,
  enabling them to store and update data across renders without using class-based systax
  */
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  /*
  useEffect is a React Hook that allows function components to perfrom side effects and synchronize with
  external systems after the component has rendered to the DOM.
  Handels : Data Fetching, DOM Manipulation, Subscriptions, Timer
  */
  useEffect(() => {
    // fetch pokemon
    fetchPokemon()
  }, [])

  async function fetchPokemon() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=10"
      );

      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
          };
        })
      );

      setPokemon(detailedPokemons);
     

    } catch(e) {
      console.log(e);
    }

  }

  return (
    <ScrollView> 
      {
        pokemon.map((pokemon) => (
          <View key={pokemon.name}>
            <Text>{pokemon.name}</Text>
            <Image
              source={{uri: pokemon.image}} 
              style={{width: 100, height: 100}}         
            /> 
          </View>
        ))
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
