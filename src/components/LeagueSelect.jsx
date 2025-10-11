import { useEffect, useState } from "react";
import "../styles/LeagueSelect.css";

export default function LeagueSelect({ onSelect }) {
  const [options, setOptions] = useState([]);
  const [selectedOpt, setSelectedOpt] = useState("");
  useEffect(() => {
    fetch("https://www.thesportsdb.com/api/v1/json/123/all_leagues.php")
      .then((data) => data.json())
      .then((val) => setOptions(val.leagues));
  }, []);

  function handleChange(selectedOption) {
    setSelectedOpt(selectedOption);
    onSelect(selectedOption);
    console.log(selectedOption);
  }
  return (
    <select
      onChange={(e) => handleChange(e.target.value)}
      value={selectedOpt}
      className="league-select"
    >
      <option value="" disabled defaultValue>
        Select a league
      </option>
      {options.map((option) => (
        <option key={option.idLeague} value={option.strLeague}>
          {option.strLeague}
        </option>
      ))}
    </select>
  );
}
