//import { useState } from "react";
import { AddCard } from "./components/AddCard";
import { Header } from "./components/Header";
import { Card } from "./components/Card";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

interface PokemonCard {
  name: string;
  id: number;
  types: TypeSlot[];
  image: string;
  hp: number;
  weight: number;
  height: number;
}

interface Type {
  name: PokemonType;
  url: string;
}

interface TypeSlot {
  slot: number;
  type: Type;
}

type PokemonType =
  | "X"
  | "normal"
  | "fire"
  | "water"
  | "grass"
  | "flying"
  | "fighting"
  | "poison"
  | "electric"
  | "ground"
  | "rock"
  | "psychic"
  | "ice"
  | "bug"
  | "ghost"
  | "steel"
  | "dragon"
  | "dark"
  | "fairy";

export default function App() {
  const [cardList, setCardList] = useState<PokemonCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<PokemonType>("X");
  const [darkMode, setDarkMode] = useState(false);

  const pokemonTypes: PokemonType[] = [
    "X",
    "normal",
    "fire",
    "water",
    "grass",
    "flying",
    "fighting",
    "poison",
    "electric",
    "ground",
    "rock",
    "psychic",
    "ice",
    "bug",
    "ghost",
    "steel",
    "dragon",
    "dark",
    "fairy",
  ];

  useEffect(() => {
    console.log(cardList);
  }, [cardList]);

  const addCard = async (input: string) => {
    try {
      if (!Number(input)) {
        input.toLowerCase;
        //console.log("Is a string");
      }
      setIsLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${input}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }
      //console.log("Response ok! " + input);
      const data = await response.json().finally(() => setIsLoading(false));
      //console.log("got the JSON");

      const pokemonCard: PokemonCard = {
        name: data.name,
        id: data.id,
        types: data.types,
        image: data.sprites.front_default,
        hp: data.stats[0].base_stat,
        weight: data.weight,
        height: data.height,
      };
      //console.log("pokemon card");

      setCardList([...cardList, pokemonCard]);
      //console.log(cardList);
    } catch (error) {
      setIsLoading(false);
      alert("Couldn't fetch the pokemon, sorry!");
      console.error(error);
    }
  };

  console.log(darkMode);

  const checkForType = (types: TypeSlot[]) => {
    if (filter === "X") return true;
    for (let i = 0; i < types.length; i++) {
      if (types[i].type.name === filter) return true;
    }
    return false;
  };

  return (
    <div className="app" data-theme={darkMode ? "dark" : "light"}>
      <div className="header-container">
        <button
          className="darkModeToggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          Dark Mode
        </button>
        <Header />
        <AddCard onAdd={addCard} />
        {isLoading && <CircularProgress color="success" sx={{ mt: 3 }} />}
      </div>
      <div className="filters_container">
        {pokemonTypes.map((item) => (
          <button key={item} onClick={() => setFilter(item)} className={item}>
            {item}
          </button>
        ))}
      </div>
      <div className="cards-container">
        {cardList.map(
          (item, index) =>
            checkForType(item.types) && (
              <Card
                key={index + item.id}
                name={item.name}
                image={item.image}
                id={item.id}
                types={item.types}
                hp={item.hp}
                weight={item.weight}
                height={item.height}
              />
            )
        )}
      </div>
    </div>
  );
}
