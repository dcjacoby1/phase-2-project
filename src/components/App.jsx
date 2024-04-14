import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import NavBar from "./NavBar"

function App() {

  
  //state to hold the current hands that were dealt
  const [dealtCards, setDealtCards] = useState([])
  const[deckID, setDeckID] = useState({})


      //used to pull a get request for the new deck of cards
      useEffect(() => {
        //async fetch bc the second fetch needs the data from the first fetch
        const fetchData = async () => {
          try {
            //first fetch pulls the ID from the deck
            const response = await fetch(
              "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
            );
            const data = await response.json();
            //sets the state of the ID to 
            setDeckID(data.deck_id);
            //run function deal cards that pulls specific cards
            dealCards(data.deck_id);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);
      
      function dealCards(deckID) {
        fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`)
          .then((res) => res.json())
          .then((hand) => setDealtCards(hand.cards));
      }
      
     




  return (
    <>
     
    <nav><NavBar /> </nav>

    <h1>Heads Up Poker</h1>

    <Outlet context={{dealtCards, setDealtCards}}/>
    
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