import {  useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';


//api-set of rules that allows one sw app to talk to another

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTION = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


const App = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, seterrorMessage] = useState('');

  const[moviesList,setmoviesList]=useState([]);

  const[isLoading,setIsLoading]=useState(false);

  const fetchMovies = async (query='') => {
    setIsLoading(true);
    seterrorMessage('');
    try {
      //put together api base url, /discover/movie?sort_by=popularity.desc; 
      const endpoint=query
      ?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;


      //fetch is often used to get data from api to display on the website
      const response=await fetch(endpoint,API_OPTION);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }
      
      //if response is ok
      const data=await response.json();
 
      setmoviesList(data.results || []);

    } catch (error) {
      console.log(`Error fetching movies : ${error}`)
      seterrorMessage('Error fetching movies. Please try again');
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main>

      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src="/hero.png" alt='hero-banner'></img>
          <h1>Find <span className='text-gradient'>Movies</span> You'll enjoy wihtout Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>

          {isLoading?(
            <Spinner/>
          ): errorMessage ?(
            <p className='text-red-500'>{errorMessage}</p>
          ): (
            <ul>
              {moviesList.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
                // <li key={movie.id} className='text-white'>{movie.title}</li>
              ))}
            </ul>
          )
        
        
          
        }

          {/* {errorMessage && <p className='error-message'>{errorMessage}</p>} */}
        </section>



      </div>
    </main>
  )
}

export default App