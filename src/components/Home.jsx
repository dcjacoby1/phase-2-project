import PlayerCards from "./PlayerCards"
import ComputerCards from "./ComputerCards"
import { useState} from "react"
import { useOutletContext } from "react-router-dom"

function Home() {
    //state for showing cards
    const [flipCard, setFlipCard] = useState(true)
    //state for which buttons to show
    const [hideButton, setHideButton] = useState(true)



    
    const context = useOutletContext()
    const shuffleCards = context.dealCards
    const dealtCards = context.dealtCards
    const setPlayerScore = context.setPlayerScore
    const setCpuScore = context.setCpuScore
    const playerScore = context.playerScore
    const cpuScore = context.cpuScore
    const winRound = context.winRound
    const setWinRound = context.setWinRound
    const currentHand = context.currentHand
    const setCurrentHand = context.setCurrentHand
    const handWinner = context.handWinner
    const setHandWinner = context.setHandWinner
    // //only used for shuffle (not yet introduced), may not need
    // const deckID = context.deckID
    // //not used
    // const setDealtCards = context.setDealtCards



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
    
        let cpuHighCard, cpuLowCard, playerHighCard, playerLowCard
    
        if (cpuCard1 >= cpuCard2) {
            cpuHighCard = cpuCard1
            cpuLowCard = cpuCard2
        } else {
            cpuHighCard = cpuCard2
            cpuLowCard = cpuCard1
        }
    
        if (playerCard1 >= playerCard2) {
            playerHighCard = playerCard1
            playerLowCard = playerCard2
        } else {
            playerHighCard = playerCard2
            playerLowCard = playerCard1
        }
    
        let playerGreater
    
        if (playerHighCard > cpuHighCard) {
            playerGreater = true
        } else if (playerHighCard < cpuHighCard) {
            playerGreater = false
        } else {
            if (playerLowCard >= cpuLowCard) {
                playerGreater = true
            } else {
                playerGreater = false
            }
        }
        if (playerGreater === isCall) {
            setPlayerScore(playerScore + 1)
            setWinRound(true)
            setCurrentHand(currentHand + 1)
            setHandWinner("Player")
            console.log(handWinner)
            console.log(currentHand)
        } else if(playerGreater !== isCall){
            setCpuScore(cpuScore + 1)
            setWinRound(false)
            setCurrentHand(currentHand + 1)
            setHandWinner("CPU")
            console.log(handWinner)
            console.log(currentHand)
        }
    }



    return(
        <>
        <h1>Current Score: </h1>
        <h2>CPU:{cpuScore}</h2>
        <h2>Player:{playerScore}</h2>
        {currentHand > 0 && (
            <h1 className="winner-text">{winRound ? "You Won!" : "You Lost!"}</h1>
        )}
        <ComputerCards flipCard={flipCard} cards={dealtCards} />
        <PlayerCards />
        
        <div id="selector" onClick={handleClick}>
        {hideButton?(<div id="button-container"><button onClick={handleCall} class="call-button" class="button">Call</button> 
        <button onClick={handleFold}class="fold-button" className="button">Fold</button></div>) :
        (<button onClick={nextRound} className="button">Next Round</button>)}
        </div>
        </>
        
    )
}
export default Home