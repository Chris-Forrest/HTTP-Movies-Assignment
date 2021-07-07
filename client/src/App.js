import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from "./Movies/UpdateMovie";
import Loader from 'react-loader-spinner';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  /************************** added a loader  *************************************/
  const [ isFetching, setIsFetching] = useState(true);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data)
        setIsFetching(false)
      })
      
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
      {isFetching ? <Loader type="Circles" color="#00bfff" height={100} width={100} />: <MovieList movies={movieList} />}
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} getMovieList={getMovieList}/>
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovie  movieList={movieList} setMovieList={setMovieList} getMovieList={getMovieList} />
      </Route>
    </>
  );
};

export default App;
