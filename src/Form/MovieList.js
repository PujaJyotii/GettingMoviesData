import Card from "../UI/Card";
import classes from "./MovieList.module.css";

function MovieList(props) {
  return (
    <Card className={classes.container}>
      <ul>
        {props.list.map((movie) => (
          <li key={movie.name}>
            Movie Name:{movie.name} - Year of Releasing:{movie.year} - Genre:
            {movie.genre}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default MovieList;
