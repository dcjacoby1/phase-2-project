import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

function App() {
  


  return (
    <>
     
    <nav><NavBar /> </nav>

    <h1>Heads Up Poker</h1>

    <Outlet />
    
    </>
  )
}

export default App


//routing --> multiple pages
//server --> json-server

//Restful routes (for crud , the end of the url tells us where it is going )
//Get /movies --> data for all movies
//Get /movies/1 --> movie with id 1
//Post /movies --> create data for a movie
//Patch /movies/1 --> update data for movie with id 1
//Delete /movies/1 --> delete movie 1

//frontend (same goes for routing)
// Get /home --> shows home page