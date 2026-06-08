// Mock Movie Dataset
const initialMovies = [
  {
    id: "1",
    title: "3 Idiots",
    genre: "Comedy",
    director: "Rajkumar Hirani",
    year: 2009,
    rating: 8.4,
    language: "Hindi",
    runtime: "170 min",
    cast: "Aamir Khan, R. Madhavan, Sharman Joshi, Kareena Kapoor",
    trailerUrl: "https://www.youtube.com/embed/K10ufh7u1pk",
    synopsis: "Two friends are searching for their long lost companion. They revisit their college days, recalling memories of their friend who inspired them to think differently, even as the rest of the world called them idiots.",
    posterUrl: "/three_idiots.jpg",
    featured: true
  },
  {
    id: "2",
    title: "Dangal",
    genre: "Drama",
    director: "Nitesh Tiwari",
    year: 2016,
    rating: 8.3,
    language: "Hindi",
    runtime: "161 min",
    cast: "Aamir Khan, Sakshi Tanwar, Fatima Sana Shaikh",
    trailerUrl: "https://www.youtube.com/embed/x_7YlGv9u1g",
    synopsis: "Mahavir Singh Phogat, a former wrestler, decides to fulfill his dream of winning a gold medal for his country by training his daughters Geeta and Babita for the Commonwealth Games despite societal stigma.",
    posterUrl: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/38E5/production/_93356541_mediaitem93356538.jpg",
    featured: true
  },
  {
    id: "3",
    title: "Drishyam",
    genre: "Thriller",
    director: "Nishikant Kamat",
    year: 2015,
    rating: 8.2,
    language: "Hindi",
    runtime: "163 min",
    cast: "Ajay Devgn, Tabu, Shriya Saran",
    trailerUrl: "https://www.youtube.com/embed/AuuX2j14U7w",
    synopsis: "A common cable operator takes desperate measures to save his family from the dark side of the law after they accidentally commit a crime, using his movie-watching knowledge to construct an alibi.",
    posterUrl: "https://lensmenreviews.com/wp-content/uploads/2015/08/drishyam-movie-review.jpg",
    featured: true
  },
  {
    id: "4",
    title: "Sholay",
    genre: "Action",
    director: "Ramesh Sippy",
    year: 1975,
    rating: 8.1,
    language: "Hindi",
    runtime: "204 min",
    cast: "Amitabh Bachchan, Dharmendra, Hema Malini, Amjad Khan",
    trailerUrl: "https://www.youtube.com/embed/dt8fIuE23_4",
    synopsis: "After his family is murdered by the notorious dacoit Gabbar Singh, a retired police officer hires two colorful outlaws to capture him alive.",
    posterUrl: "https://static.wikia.nocookie.net/bollywood/images/c/c1/Screenshot_2020-03-28_at_8.24.06_AM.png/revision/latest?cb=20200328122541",
    featured: false
  },
  {
    id: "5",
    title: "Tumbbad",
    genre: "Sci-Fi",
    director: "Rahi Anil Barve",
    year: 2018,
    rating: 8.2,
    language: "Hindi",
    runtime: "104 min",
    cast: "Sohum Shah, Jyoti Malshe, Anita Date",
    trailerUrl: "https://www.youtube.com/embed/sN75pM_vguU",
    synopsis: "A mythological story about a family that builds a temple for Hastar, a monster god who should not be worshipped, and inherits a cursed treasure of gold that leads to greed and devastation.",
    posterUrl: "/tumbbad.png",
    featured: true
  },
  {
    id: "6",
    title: "Zindagi Na Milegi Dobara",
    genre: "Drama",
    director: "Zoya Akhtar",
    year: 2011,
    rating: 8.2,
    language: "Hindi",
    runtime: "155 min",
    cast: "Hrithik Roshan, Farhan Akhtar, Abhay Deol, Katrina Kaif",
    trailerUrl: "https://www.youtube.com/embed/NX7QLXMc3x4",
    synopsis: "Three childhood friends embark on a bachelor road trip in Spain where they participate in ultimate adventure sports, face their deepest fears, and re-discover love and friendship.",
    posterUrl: "https://cdn.district.in/movies-assets/images/cinema/Zindagi-Na-Milegi-Dobara_Gallery-6676df00-4b3d-11f0-bdae-31cf0cb4d840.jpg?im=Resize,width=960",
    featured: false
  },
  {
    id: "7",
    title: "Dilwale Dulhania Le Jayenge",
    genre: "Romance",
    director: "Aditya Chopra",
    year: 1995,
    rating: 8.0,
    language: "Hindi",
    runtime: "189 min",
    cast: "Shah Rukh Khan, Kajol, Amrish Puri",
    trailerUrl: "https://www.youtube.com/embed/c25GKl5UXws",
    synopsis: "Raj and Simran meet on a European vacation and fall in love. When Raj discovers Simran's father has already promised her hand in marriage to someone else in India, he travels across the world to win over her family.",
    posterUrl: "https://cdn.district.in/movies-assets/images/cinema/Dilwale-Dulhania-Le-Jayenge-Hindi-App-poster-608x800-2d992fe7-a908-48fc-8447-e73ca47a2105-dbf4bad0-533f-11f1-aa6c-1be757dca935.jpg?im=Resize,width=960",
    featured: true
  },
  {
    id: "8",
    title: "Hera Pheri",
    genre: "Comedy",
    director: "Priyadarshan",
    year: 2000,
    rating: 8.2,
    language: "Hindi",
    runtime: "156 min",
    cast: "Akshay Kumar, Sunil Shetty, Paresh Rawal",
    trailerUrl: "https://www.youtube.com/embed/Sc6pC57aVfM",
    synopsis: "Three broke roommates find themselves in the middle of a kidnapping plot when they receive a wrong telephone call from a notorious gangster, leading to a series of hilarious comedy errors.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/a/a5/Hera_Pheri_2000_poster.jpg",
    featured: false
  },
  {
    id: "9",
    title: "Lagaan",
    genre: "Drama",
    director: "Ashutosh Gowariker",
    year: 2001,
    rating: 8.1,
    language: "Hindi",
    runtime: "224 min",
    cast: "Aamir Khan, Gracy Singh, Rachel Shelley",
    trailerUrl: "https://www.youtube.com/embed/N6O1M_zT-3E",
    synopsis: "In Victorian India, a young farmer accepts the challenge of a cruel British commander to play a game of cricket in order to waive the high taxes of their drought-stricken village.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/b/b6/Lagaan.jpg",
    featured: false
  },
  {
    id: "10",
    title: "Bajrangi Bhaijaan",
    genre: "Drama",
    director: "Kabir Khan",
    year: 2015,
    rating: 8.1,
    language: "Hindi",
    runtime: "163 min",
    cast: "Salman Khan, Kareena Kapoor, Harshaali Malhotra",
    trailerUrl: "https://www.youtube.com/embed/4y33h81co1M",
    synopsis: "An open-hearted man with a magnanimous spirit embarks on a dangerous journey to reunite a mute six-year-old Pakistani girl with her family after she gets separated in India.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/d/dd/Bajrangi_Bhaijaan_Poster.jpg",
    featured: false
  },
  {
    id: "11",
    title: "Jawan",
    genre: "Action",
    director: "Atlee",
    year: 2023,
    rating: 7.8,
    language: "Hindi",
    runtime: "168 min",
    cast: "Shah Rukh Khan, Nayanthara, Vijay Sethupathi",
    trailerUrl: "https://www.youtube.com/embed/COv5277II60",
    synopsis: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society, addressing corruption with a team of skilled women.",
    posterUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202309/shah-rukh-khan--jawan--srk-films-295651-3x4.jpg?VersionId=RGX_q3pk2AWWdkkOYhypoZSFxDHwV.vF",
    featured: true
  },
  {
    id: "12",
    title: "Pathaan",
    genre: "Action",
    director: "Siddharth Anand",
    year: 2023,
    rating: 6.5,
    language: "Hindi",
    runtime: "146 min",
    cast: "Shah Rukh Khan, Deepika Padukone, John Abraham",
    trailerUrl: "https://www.youtube.com/embed/vqu4z34wENw",
    synopsis: "An Indian spy takes on a rogue mercenary group led by an ex-colleague who has dangerous bio-weapon plans to target the nation.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/c/c3/Pathaan_film_poster.jpg",
    featured: true
  },
  {
    id: "13",
    title: "Andhadhun",
    genre: "Thriller",
    director: "Sriram Raghavan",
    year: 2018,
    rating: 8.2,
    language: "Hindi",
    runtime: "139 min",
    cast: "Ayushmann Khurrana, Tabu, Radhika Apte",
    trailerUrl: "https://www.youtube.com/embed/2iVYI99VGxs",
    synopsis: "A visually impaired pianist accidentally witness the murder of a former film star, throwing him into a web of deceit, black market organ trades, and dark secrets.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/4/47/Andhadhun_poster.jpg",
    featured: false
  },
  {
    id: "14",
    title: "Krrish",
    genre: "Sci-Fi",
    director: "Rakesh Roshan",
    year: 2006,
    rating: 6.4,
    language: "Hindi",
    runtime: "175 min",
    cast: "Hrithik Roshan, Priyanka Chopra, Naseeruddin Shah",
    trailerUrl: "https://www.youtube.com/embed/3qa3L9rTEG0",
    synopsis: "Krishna, a young man with superhuman abilities inherited from his father, travels to Singapore to meet his love interest, where he is forced to adopt a superhero identity called Krrish to save his father and stop a mad scientist.",
    posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRblPlFDOtOjRchPfVkzB5OReemwKh37Gl32g&s",
    featured: false
  }
];

// Mock User Booking / Reviewer Accounts Dataset
const initialBookings = [
  {
    id: "b1",
    name: "John Doe",
    email: "john.doe@gmail.com",
    phone: "9876543210",
    gender: "Male",
    favoriteGenre: "Sci-Fi",
    subscribe: true,
    movieInterest: "Tumbbad"
  },
  {
    id: "b2",
    name: "Jane Smith",
    email: "jane.smith@yahoo.com",
    phone: "8765432109",
    gender: "Female",
    favoriteGenre: "Romance",
    subscribe: true,
    movieInterest: "Dilwale Dulhania Le Jayenge"
  },
  {
    id: "b3",
    name: "Rajesh Kumar",
    email: "rajesh.k@outlook.com",
    phone: "7654321098",
    gender: "Male",
    favoriteGenre: "Action",
    subscribe: false,
    movieInterest: "Sholay"
  },
  {
    id: "b4",
    name: "Aiko Tanaka",
    email: "aiko@tanaka.jp",
    phone: "6543210987",
    gender: "Female",
    favoriteGenre: "Drama",
    subscribe: true,
    movieInterest: "3 Idiots"
  },
  {
    id: "b5",
    name: "Carlos Estevan",
    email: "carlos.e@gmail.com",
    phone: "5432109876",
    gender: "Male",
    favoriteGenre: "Thriller",
    subscribe: false,
    movieInterest: "Drishyam"
  }
];

// SessionStorage Keys
const MOVIES_KEY = "cinebook_movies_db_v8";
const BOOKINGS_KEY = "cinebook_bookings_db_v8";

export function isBrowser() {
  return typeof window !== "undefined";
}

// Seeding Function
export function seedDatabase() {
  if (!isBrowser()) return;
  
  if (!sessionStorage.getItem(MOVIES_KEY)) {
    sessionStorage.setItem(MOVIES_KEY, JSON.stringify(initialMovies));
  }
  
  if (!sessionStorage.getItem(BOOKINGS_KEY)) {
    sessionStorage.setItem(BOOKINGS_KEY, JSON.stringify(initialBookings));
  }
}

// Movie CRUD Operations
export function getMovies() {
  if (!isBrowser()) return initialMovies;
  seedDatabase();
  const data = sessionStorage.getItem(MOVIES_KEY);
  return data ? JSON.parse(data) : initialMovies;
}

export function saveMovies(movies) {
  if (!isBrowser()) return;
  sessionStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
}

export function getMovieById(id) {
  const movies = getMovies();
  return movies.find(m => m.id === id);
}

export function addMovie(movie) {
  const movies = getMovies();
  const newMovie = {
    ...movie,
    id: Date.now().toString()
  };
  movies.unshift(newMovie);
  saveMovies(movies);
  return newMovie;
}

export function updateMovie(updatedMovie) {
  const movies = getMovies();
  const index = movies.findIndex(m => m.id === updatedMovie.id);
  if (index !== -1) {
    movies[index] = updatedMovie;
    saveMovies(movies);
    return true;
  }
  return false;
}

export function deleteMovie(id) {
  const movies = getMovies();
  const filtered = movies.filter(m => m.id !== id);
  saveMovies(filtered);
  return true;
}

// Bookings CRUD Operations
export function getBookings() {
  if (!isBrowser()) return initialBookings;
  seedDatabase();
  const data = sessionStorage.getItem(BOOKINGS_KEY);
  return data ? JSON.parse(data) : initialBookings;
}

export function saveBookings(bookings) {
  if (!isBrowser()) return;
  sessionStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function addBooking(booking) {
  const bookings = getBookings();
  const newBooking = {
    ...booking,
    id: "b_" + Date.now().toString()
  };
  bookings.unshift(newBooking);
  saveBookings(bookings);
  return newBooking;
}

export function updateBooking(updatedBooking) {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === updatedBooking.id);
  if (index !== -1) {
    bookings[index] = updatedBooking;
    saveBookings(bookings);
    return true;
  }
  return false;
}

export function deleteBooking(id) {
  const bookings = getBookings();
  const filtered = bookings.filter(b => b.id !== id);
  saveBookings(filtered);
  return true;
}
