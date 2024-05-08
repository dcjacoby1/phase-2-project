import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import NavBar from "./NavBar"

function App() {

  
  //state to hold the current hands that were dealt
  const [dealtCards, setDealtCards] = useState([])
  //state to hold the ID of the deck of cards
  const [deckID, setDeckID] = useState({})

    //get request useState for history
    const [history, setHistory] = useState([])


//adds to player score when winning a hand
  const [playerScore, setPlayerScore] = useState(0)
  //adds to cpu score when losing a hand
  const [cpuScore, setCpuScore] = useState(0)

  //used for "you won!" or "you lost!"
  const [winRound, setWinRound] = useState(null)
  //these 2 states are used for post request
  const [currentHand, setCurrentHand] = useState(0)
  const [handWinner, setHandWinner] = useState('')

      //used to pull a get request for the new deck of cards
      useEffect((createDeck),[])

      //use effect that waits for a change in the deck ID to run dealCards function
      useEffect((dealCards),[deckID])

       //getRequest for handinfo. updates history state...
       //which is used for displaying logs on history page
      useEffect(() => {
        fetch("http://localhost:3000/history")
        .then(r => r.json())
        .then(data => setHistory(data))
      },[])


      //function used for first useEffect 
      function createDeck() {
        //first fetch pulls the ID from the deck
        fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => response.json())
        .then(data => 
        //sets the state of the ID
          setDeckID(data.deck_id)
        )
        .catch(error => console.log(error))

      }
      
      //dealCards function draws cards from the deck
      function dealCards() {
        //prevents initial render from running 404 not found
        //this is because deckID has no value until state of ID updates
        if (Object.keys(deckID).length === 0){
          return
        //once deckID is updated, the fetch for drawing cards will run
        } else {
        fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`)
          .then((res) => res.json())
          //updates state of 
          .then((hand) => setDealtCards(hand.cards));
        }
      }

    
      
     

  return (
    <>
     
    <nav><NavBar setHistory={setHistory} history={history} createDeck={createDeck}/> </nav>

    <h1 id="header-text">Two Card War</h1>

    <Outlet context={{dealtCards, deckID, setDealtCards, dealCards, setPlayerScore, playerScore, setCpuScore, cpuScore, winRound, setWinRound, currentHand, setCurrentHand, handWinner, setHandWinner, setHistory, history}}/>
    
    </>
  )
}

export default App

