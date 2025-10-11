import { useEffect, useRef, useState } from "react";
import "../styles/GameBoard.css";

const leagues = [
  "English Premier League",
  "English League Championship",
  "German Bundesliga",
  "Italian Serie A",
  "French Ligue 1",
  "Spanish La Liga",
];

const settings = [
  {
    settingName: "easy",
    cardsPerRound: 10,
    cardsOnScreen: 4,
  },
  {
    settingName: "medium",
    cardsPerRound: 20,
    cardsOnScreen: 8,
  },
  {
    settingName: "hard",
    cardsPerRound: 30,
    cardsOnScreen: 12,
  },
];

function getMaxPerRound(difficulty) {
  return settings.find((x) => x.settingName === difficulty).cardsPerRound;
}

function getScreenItemsCount(difficulty) {
  return settings.find((x) => x.settingName === difficulty).cardsOnScreen;
}

function generateScreenCards(arr, length) {
  let arr1 = arr.slice();
  let newArr = [];
  for (let i = 0; i < length; i++) {
    let item = arr1.splice(Math.floor(Math.random() * arr1.length), 1);
    newArr.push(item);
  }
  return newArr.flat();
}

/* async function fetchDataFromAPI(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse the JSON data from the response
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error; // Re-throw the error to be caught by Promise.all's catch block
  }
} */

export default function GameBoard({
  difficulty,
  isStarted,
  increaseScore,
  win,
  lose,
}) {
  function isVisited(val) {
    return visitedCards.current.includes(val) ? true : false;
  }
  function handleClick(idTeam) {
    if (isVisited(idTeam)) {
      lose();
      visitedCards.current = [];
    } else {
      if (visitedCards.current.length == getMaxPerRound(difficulty)) {
        win();
        visitedCards.current = [];
      } else {
        visitedCards.current.push(idTeam);
        increaseScore();
        setScreenCards(
          generateScreenCards(allCards.current, getScreenItemsCount(difficulty))
        );
      }
    }
  }
  let cachedCards = localStorage.getItem("allCards");
  let allCards = useRef(cachedCards ? JSON.parse(cachedCards) : []);

  const [screenCards, setScreenCards] = useState(
    isStarted
      ? generateScreenCards(allCards.current, getScreenItemsCount(difficulty))
      : []
  );
  const visitedCards = useRef([]);
  useEffect(() => {
    if (!cachedCards) {
      const baseUrl =
        "https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=";
      Promise.all(
        leagues.map((l) => fetch(baseUrl + l).then((r) => r.json()))
      ).then((data) => {
        cachedCards = [];
        data.forEach((item) => {
          cachedCards.push(item.teams);
        });
        cachedCards = cachedCards.flat();
        allCards.current = cachedCards;
        localStorage.setItem("allCards", JSON.stringify(cachedCards));
        setScreenCards(
          generateScreenCards(allCards.current, getScreenItemsCount(difficulty))
        );
      });
    }
  }, []);
  return (
    <>
      {isStarted &&
        screenCards.map((c) => (
          <div
            key={c.idTeam}
            className="card"
            onClick={() => handleClick(c.idTeam)}
          >
            <h1>{c.strTeam}</h1>
            <img src={c.strBadge}></img>
          </div>
        ))}
    </>
  );
}
