import PlayerCards from "./PlayerCards"
import ComputerCards from "./ComputerCards"
import { useState, useEffect } from "react"

function Home() {
    //state for cards

    //state to hold deck ID, needed in a few places
    const[deckID, setDeckID] = useState({})

    //state to hold the current hands that were dealt
    const [dealtCards, setDealtCards] = useState([])

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
      
      console.log(dealtCards);
      console.log("hello")


    return(
        <>
        <h1>hello</h1>
        <ComputerCards cards={dealtCards}/>
        <PlayerCards />
        
        <div id="selector">
        <button>Call</button>
        <button>Fold</button>

        </div>
        </>
        
    )
}
export default Home