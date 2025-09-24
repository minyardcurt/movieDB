// src/components/MovieDetails/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const APIKey = "c8e7394"; // your OMDb API key

function MovieDetails() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKey}&i=${imdbID}&plot=full`
        );
        const data = await response.json();
        if (data) {
          setMovie(data);
        }
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };
    fetchMovie();
  }, [imdbID]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px", padding: "6px 12px" }}
      >
        ← Back
      </button>

      <h2>{movie.Title} ({movie.Year})</h2>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}
          alt={movie.Title}
          style={{ width: "200px", borderRadius: "8px" }}
        />
        <div>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;