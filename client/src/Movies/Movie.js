import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  /************************ my delete function  ****************************************************/
  const deleteMovie = (id) => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      console.log(res)
      push("/")
      getMovieList();
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <button onClick={() => push(`/update-movie/${params.id}`)}>
        Edit Movie
      </button>

      <button onClick={() => deleteMovie(params.id)}>
        Delete Movie
      </button>

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
