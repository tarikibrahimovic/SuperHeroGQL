import { useState } from "react";
import classes from "./SearchBar.module.css";

export default function SearchBar({ setDisplayedData, data }) {

  const [search, setSearch] = useState("");

  return (
    <form
      className={classes.searchBar}
      onSubmit={(e) => {
        e.preventDefault();
        let fitlered = data.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase());
        })
        setDisplayedData(fitlered);
      }}
    >
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className={classes.searchInput}
      />
      <button className={classes.searchButton} type="submit">Search</button>
    </form>
  );
}
