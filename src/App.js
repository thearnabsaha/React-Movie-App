import React,{useState} from 'react'
import Search from './search.svg'
import Card from './Components/Card'
import ("./App.css")
const API_URL= "http://www.omdbapi.com/?apikey=22b16ba0";

const App = () => {
  const [movie, setMovie] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const fetchMovies=async(title)=>{
    const res= await fetch(`${API_URL}&s=${title}`)
    const data = await res.json()
    setMovie(data.Search)
    console.log(movie);
  }
  const handleEnter=(e)=>{
    if(e.key==="Enter"){
      fetchMovies(searchTerm)
      searchTerm=""
    }
  }
  return (
    <>
      <div className="app">
        <h1>TAS Movies</h1>
        <input type="text" value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} placeholder="Search For Movies" className="search" onKeyUp={handleEnter}/>
        <img src={Search} alt="search" onClick={()=>{fetchMovies(searchTerm)}}/>
        {movie?.length>0?(
          <div className="container">
            {
              movie.map((e)=>{
                return(
                  <div>
                    <Card data={e}/>
                  </div>
                )
              })
            }
          </div>
        ):(
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  )
}

export default App