import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import NavBar from "./NavBar"

function App() {

  
  //state to hold the current hands that were dealt
  const [dealtCards, setDealtCards] = useState([])
  //state to hold the ID of the deck of cards
  const [deckID, setDeckID] = useState({})

  const [playerScore, setPlayerScore] = useState(0)
  const [cpuScore, setCpuScore] = useState(0)

  const [winRound, setWinRound] = useState(true)
  const [currentHand, setCurrentHand] = useState(0)
  const [handWinner, setHandWinner] = useState('')

      //used to pull a get request for the new deck of cards
      useEffect((createDeck),[])

      //use effect that waits for a change in the deck ID to run dealCards function
      useEffect((dealCards),[deckID])

      // useEffect(() => {
      //   fetch("http://localhost:3000/history"), {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type':
      //       'application/json',
      //       'Accept': 'application/json'
      //   },
      //     body: JSON.stringify({
      //       currentHand: '',
      //       handWinner: ''
      //     })
      //   }
      //   .then(r => r.json())
        
      // },[winRound])


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
     
    <nav><NavBar /> </nav>

    <h1>Heads Up Poker</h1>

    <Outlet context={{dealtCards, deckID, setDealtCards, dealCards, setPlayerScore, playerScore, setCpuScore, cpuScore, winRound, setWinRound, currentHand, setCurrentHand, handWinner, setHandWinner}}/>
    
    </>
  )
}

export default App

