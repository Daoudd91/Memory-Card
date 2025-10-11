import { useState } from "react";
import "../styles/LeagueSelect.css";

export default function DifficultySelect({ setDifficulty, disabled }) {
  const difficulties = ["easy", "medium", "hard"];
  const [selectedOpt, setSelectedOpt] = useState("");
  function handleChange(val) {
    setSelectedOpt(val);
    setDifficulty(val);
  }
  return (
    <select
      onChange={(e) => handleChange(e.target.value)}
      value={selectedOpt}
      className="league-select"
      disabled={disabled}
    >
      <option value="" disabled defaultValue>
        Select Difficulty
      </option>
      {difficulties.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
