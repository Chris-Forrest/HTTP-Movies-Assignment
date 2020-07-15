import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const UpdateMovieForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
border: 1px solid rgb(210, 210, 210);
border-radius: 5px;
margin: 8px;
padding: 12px;
background-color: white;
width: 76%;
margin-left: 11%;
`


const initialMovie = {
    title: "",
    director: "",
    metascore: ""
}

export default function UpdateMovie(props) {
  
    const { push } = useHistory();
    // console.log(props.movieList);
    const { id } = useParams();
    // console.log(id);
    const [movie, setMovie] = useState(initialMovie)
    
   
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
          // console.log(res);
          setMovie(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id]);
  
    const changeMovieInputs = (e) => {
      setMovie({
        ...movie,
        [e.target.name]: e.target.value,
      });
    };
  
    const updateMovie = (e) => {
      e.preventDefault();
      axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then((res) => {
          console.log(res.data)
          push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    return (
      <UpdateMovieForm onSubmit={updateMovie}>
        <label htmlFor="title">title</label>
        <input 
        type="text"
        name="title" 
        value={movie.title} 
        onChange={changeMovieInputs} />
        <label htmlFor="director">director</label>
        <input
        type="text"
          name="director"
          value={movie.director}
          onChange={changeMovieInputs}
        />
        <label htmlFor="metascore">metascore</label>
        <input
        type="text"
          name="metascore"
          value={movie.metascore}
          onChange={changeMovieInputs}
        />
        <button>Update Movie</button>
      </UpdateMovieForm>
    );
  }

