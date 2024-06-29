import { useState } from "react";
import Card from "../UI/Card";
import classes from "./MovieForm.module.css";
import Modal from "../UI/Modal";

function MovieForm(props) {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (name.length === 0 || year.length < 4 || genre.length === 0) {
      setError({
        title: "Invalid Input",
        message:
          "Something went wrong check your input and provide data accordingly.",
      });

      return;
    }
    let movie = {
      name: name,
      year: year,
      genre: genre,
    };

    const response = await fetch(
      "https://movie-project-28d8c-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    movie.id = data.name;
    props.onAdd(movie);
    setName("");
    setYear("");
    setGenre("");
  };

  const closeHandler = () => {
    setError(false);
  };
  return (
    <>
      {error && (
        <Modal
          message={error.message}
          title={error.title}
          onClose={closeHandler}
        />
      )}
      <Card className={classes.container}>
        <form onSubmit={submitHandler}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Year of Releasing:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <button>Add Movie</button>
        </form>
      </Card>
    </>
  );
}

export default MovieForm;
