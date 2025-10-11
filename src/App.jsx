import "./App.css";
import LeagueSelect from "./components/LeagueSelect";
import DifficultySelect from "./components/DifficultySelect";
import { useRef, useState } from "react";
import GameBoard from "./components/GameBoard";

function App() {
  const [difficulty, setDifficulty] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [score, setScore] = useState(0);
  const bestScore = useRef(
    localStorage.getItem("bestScore")
      ? Number.parseInt(localStorage.getItem("bestScore"))
      : 0
  );
  function handleStartGame() {
    setIsLost(false);
    setIsWin(false);
    if (!isStarted) {
      setIsStarted(true);
    } else {
      setIsStarted(false);
      setDifficulty("");
    }
  }

  function handleWin() {
    setIsWin(true);
    setIsStarted(false);
  }

  function handleLose() {
    setIsLost(true);
    setIsStarted(false);
  }

  function increaseScore() {
    if (score + 1 > bestScore.current) {
      localStorage.setItem("bestScore", score + 1);
      bestScore.current = score + 1;
    }
    setScore(score + 1);
  }

  function closeBox() {
    setIsLost(false);
    setIsWin(false);
    setScore(0);
  }

  return (
    <div className="application">
      <header className="scoreboard">
        <h1>Football Memory Game</h1>
        <div>
          <DifficultySelect
            setDifficulty={setDifficulty}
            disabled={isStarted ? true : false}
          ></DifficultySelect>
          <button
            disabled={difficulty === "" ? true : false}
            onClick={handleStartGame}
          >
            {isStarted ? "Restart" : "Start"}
          </button>
        </div>
        <div>
          <p>Score: {score}</p>
          <p>Best Score: {bestScore.current}</p>
        </div>
      </header>
      <main className="game-board">
        {isStarted && (
          <GameBoard
            difficulty={difficulty}
            isStarted={isStarted}
            increaseScore={increaseScore}
            win={handleWin}
            lose={handleLose}
          ></GameBoard>
        )}
      </main>
      {(isLost || isWin) && (
        <div className="message-box">
          <h1>{isWin ? "You Win :)" : "You Lost :("}</h1>
          <button type="button" onClick={() => closeBox()}>
            OK
          </button>
        </div>
      )}
      <footer className="copyright-footer"></footer>
    </div>
  );
}

export default App;
