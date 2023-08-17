import React, { useState } from 'react';
import './App.css';

// MovieCard component
const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterURL} alt={movie.title} />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <p>Rating: {movie.rating}</p>
      </div>
    </div>
  );
};

// MovieList component
const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
};

// Filter component
const Filter = ({ onFilterChange }) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const handleTitleChange = (event) => {
    setTitleFilter(event.target.value);
    onFilterChange({ title: event.target.value, rating: ratingFilter });
  };

  const handleRatingChange = (event) => {
    setRatingFilter(event.target.value);
    onFilterChange({ title: titleFilter, rating: event.target.value });
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filter by Title"
        value={titleFilter}
        onChange={handleTitleChange}
      />
      <input
        type="number"
        placeholder="Filter by Rating"
        value={ratingFilter}
        onChange={handleRatingChange}
      />
    </div>
  );
};

// AddMovieForm component
const AddMovieForm = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posterURL, setPosterURL] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && description && posterURL && rating) {
      onAddMovie({
        title,
        description,
        posterURL,
        rating: parseFloat(rating),
      });
      setTitle('');
      setDescription('');
      setPosterURL('');
      setRating('');
    }
  };

  return (
    <form className="add-movie-form" onSubmit={handleSubmit}>
      <h2>Add a New Movie</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Poster URL"
        value={posterURL}
        onChange={(e) => setPosterURL(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        step="0.1"
        min="0"
        max="5"
        required
      />
      <button type="submit">Add Movie</button>
    </form>
  );
};

// Main App component
const App = () => {
  const [movies, setMovies] = useState([
    {
      title: 'Inception',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      posterURL: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg      ',
      rating: 4.8,
    },
    {
      title: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      posterURL: 'https://images.squarespace-cdn.com/content/v1/5c75dfa97d0c9166551f52b1/9351f4e2-94f9-42e2-81df-003d5fe7b8e0/9964546b0ba1f6e14a6045e34b341f8ca2a3569752c5afed95b89682fcde1a68._RI_V_TTW_.jpg',
      rating: 4.9,
    },
    {
      title: 'Oppenheimer',
      description: 'During World War II, Lieutenant General Leslie Groves Jr. appointed physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spent years developing and designing the atomic bomb.',
      posterURL: '	https://alternativemovieposters.com/wp-content/uploads/2023/01/Dalton-Frizzell_OPPENHEIMER-1.jpg',
      rating: 4.3,
    }, {
      title: 'Indiana Jones and the Dial of Destiny',
      description: 'After spending over a decade teaching at Hunter College in New York, esteemed Dr. Jones, a professor of archaeology, is on the brink of retirement and looking forward to peaceful days.Everything changes after a surprise visit from his goddaughter, Helena Shaw, who is in search of a rare artifact that her father entrusted to Indy years ago: the famous Archimedes dial, a relic believed to have the power to locate temporal fissures. A skilled con artist, Helena steals the object and hastily leaves the country to sell it to the highest bidder. Indy has no choice but to embark on a pursuit. He dons his fedora and leather jacket once again for one last adventure...',
      posterURL: '	https://kinojanosik.pl/wp-content/uploads/2023/06/8071089.3.jpg',
      rating: 3.5,
    },
  ]);

  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleFilterChange = ({ title, rating }) => {
    const filtered = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(title.toLowerCase()) && movie.rating >= rating;
    });
    setFilteredMovies(filtered);
  };

  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
    setFilteredMovies([...filteredMovies, newMovie]);
  };

  return (
    <div className="App">
      <h1>Movie App</h1>
      <Filter onFilterChange={handleFilterChange} />
      <AddMovieForm onAddMovie={addMovie} />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default App;
