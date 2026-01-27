import { use, useEffect, useState } from 'react';
import Search from './components/Search';


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

  const fetchMovies = async () => {
    setIsLoading(true);
    seterrorMessage('');
    try {
      const endpoint=`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response=await fetch(endpoint,API_OPTION);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }

      const data=await response.json();

      if(data.response=='False'){
        seterrorMessage(data.Error || 'Failed to fetch movies');
        setmoviesList([]);
        return;
      }
      
      setmoviesList(data.results || []);

    } catch (error) {
      console.log(`Erro fetching movies : ${error}`)
      seterrorMessage('Error fetching movies. Please try again');
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {

  }, []);

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
          <h2>All Movies</h2>

          {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </section>



      </div>
    </main>
  )
}

export default App