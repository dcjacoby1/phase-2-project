import PlayerCards from "./PlayerCards"
import ComputerCards from "./ComputerCards"
import { useEffect, useState} from "react"
import { useOutletContext } from "react-router-dom"

function Home() {
    //state for showing cards
    const [flipCard, setFlipCard] = useState(true)
    //state for which buttons to show
    const [hideButton, setHideButton] = useState(true)
    



    //used to pull props from App
    const context = useOutletContext()

    //runse the dealCards useEffect that draws 4 cards
    const shuffleCards = context.dealCards

    //array of 4 cards dealt
    const dealtCards = context.dealtCards

    //setter and getter function used to add to player score when they win a hand
    const setPlayerScore = context.setPlayerScore
    const playerScore = context.playerScore

     //setter and getter function used to add to CPU score when they win a hand
    const setCpuScore = context.setCpuScore
    const cpuScore = context.cpuScore

    // setter and getter for current hand winner (used for displaying "you won or you lost")
    const winRound = context.winRound
    const setWinRound = context.setWinRound

    //setter and getter for keeping track of hand number - for post request
    const currentHand = context.currentHand
    const setCurrentHand = context.setCurrentHand

    //setter and getter for keeping track of current hand winner - for post request
    const handWinner = context.handWinner
    const setHandWinner = context.setHandWinner

    //setter anf getter for entire history log
    const history = context.history
    const setHistory = context.setHistory
    


    //used to map value attribute of get request data to numerical values
    const cardValues = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'JACK': 11,
        'QUEEN': 12,
        'KING': 13,
        'ACE': 14
    }

    //post each round to the log on history page
    useEffect(() =>{
    //prevents initial render empty log
        if (currentHand > 0) {
            fetch("http://localhost:3000/history", {
            method: 'POST',
            headers: {
            'Content-Type':
            'application/json',
            'Accept': 'application/json'
            },
    //sends the currentHand and handWinner
            body: JSON.stringify({
                currentHand: currentHand,
                handWinner: handWinner
            })
            })
            .then(r => r.json())
    //adds the new object to existing objects in our history array
            .then(newFormObj => {
              setHistory([...history, newFormObj])
            })
        }
       
    // dependancy, only runs a new post when next current hand occurs
    }, [currentHand])
    

    //whenever the nextRound button is clicked, new cards come out
    function nextRound() {
            // fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
            // .then((res) => res.json())
            // .then(cards => setDealtCards(cards))

        //swaps the current cards for new cards    
        shuffleCards(dealtCards)
    }

    //when a call or fold button is clicked, the computer cards are shown and the next round button replaces the call/fold buttons
    //when the next round button is clicked, the new computer cards are hidden and the call/fold buttons replace the next round button
    function handleClick() {
        setFlipCard(!flipCard)
        setHideButton(!hideButton)
    }

    //if the player selects call or fold, their decision will be compared to...
    // the true value of if they won or not
    function handleCall() {
        processWinner(true)
    }

    function handleFold() {
        processWinner(false)
    }
    function processWinner(isCall) {
    //maps each card to their value in valueCards
        const cpuCard1 = cardValues[dealtCards[0].value]
        const cpuCard2 = cardValues[dealtCards[1].value]
        const playerCard1 = cardValues[dealtCards[2].value]
        const playerCard2 = cardValues[dealtCards[3].value]
    
    //variable declared outside if-else for scoping reasons
        let cpuHighCard, cpuLowCard, playerHighCard, playerLowCard
    
    //determines high and low cards for for CPU 
        if (cpuCard1 >= cpuCard2) {
            cpuHighCard = cpuCard1
            cpuLowCard = cpuCard2
        } else {
            cpuHighCard = cpuCard2
            cpuLowCard = cpuCard1
        }
    //determines high and low cards for for player
        if (playerCard1 >= playerCard2) {
            playerHighCard = playerCard1
            playerLowCard = playerCard2
        } else {
            playerHighCard = playerCard2
            playerLowCard = playerCard1
        }
    
        let playerGreater
    //determines who has a greater hand
        if (playerHighCard > cpuHighCard) {
            playerGreater = true
        } else if (playerHighCard < cpuHighCard) {
            playerGreater = false
    //runs through scenario if the first card ties, compare lower cards
        } else {
            if (playerLowCard >= cpuLowCard) {
                playerGreater = true
            } else {
                playerGreater = false
            }
        }
        //compares player decision to true winner of hand as argument
        //adds to winner score, chooses what text to display , adds to round count for post, shows hand winner for post 
        if (playerGreater === isCall) {
            setPlayerScore(playerScore + 1)
            setWinRound(true)
            setCurrentHand(currentHand + 1)
            setHandWinner("Player")

        } else if(playerGreater !== isCall){
            setCpuScore(cpuScore + 1)
            setWinRound(false)
            setCurrentHand(currentHand + 1)
            setHandWinner("CPU")
        }
    }



    return(
        <>
        <h1>Current Score: </h1>
        <h2>CPU:{cpuScore}</h2>
        <h2>Player:{playerScore}</h2>
        {(currentHand > 0) && (
            <h1 className="winner-text">{winRound ? "You Won!" : "You Lost!"}</h1>
        )}
        <ComputerCards flipCard={flipCard} cards={dealtCards} />
        <PlayerCards />
        
        <div id="selector" onClick={handleClick}>
        {hideButton?(<div id="button-container"><button onClick={handleCall}  className="button">Call</button> 
        <button onClick={handleFold} className="button">Fold</button></div>) :
        (<button onClick={nextRound} className="button">Next Round</button>)}
        </div>
        </>
        
    )
}
export default Home