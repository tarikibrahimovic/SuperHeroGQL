import classes from "./SearchBar.module.css";

export default function SearchBar() {
    return (
        <div className={classes.searchBar}>
        <input type="text" placeholder="Search" />
        <button>Search</button>
        </div>
    );
}