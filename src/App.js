import React, { useEffect, useState } from "react";
import Header from "./UI/Header";
import MovieForm from "./Form/MovieForm";
import MovieList from "./Form/MovieList";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response = await fetch(
          "https://movie-project-28d8c-default-rtdb.firebaseio.com/movies.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        let movieArr = [];
        for (let key in data) {
          movieArr.push({
            id: key,
            ...data[key],
          });
        }

        setList(movieArr);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovies();
  }, []);

  const addHandler = (movie) => {
    return setList((prev) => [...prev, movie]);
  };
  return (
    <div>
      <Header />
      <MovieForm onAdd={addHandler} />
      <MovieList list={list} />
    </div>
  );
}

export default App;
