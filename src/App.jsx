function App() {
  import About from "./components/About"
  import Contact from "./components/Contact"
  import Home from "./components/Home"


  return (
    <>
     <h1>Heads Up Poker</h1>
    
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