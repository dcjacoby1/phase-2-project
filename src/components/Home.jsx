import PlayerCards from "./PlayerCards"
import ComputerCards from "./ComputerCards"
import { useState} from "react"
import { useOutletContext } from "react-router-dom"

function Home() {
    //state for cards

    //state to hold deck ID, needed in a few places
    // const[deckID, setDeckID] = useState({})
    
    const contexts = useOutletContext()
    console.log(`context: ${contexts}`)
    const dealtCardss = contexts.dealtCards
    const setDealtCardss = contexts.setDealtCards
    // console.log(`context: ${dealtCardss}`)
    



    return(
        <>
        <h1>hello</h1>
        <ComputerCards cards={dealtCardss}/>
        <PlayerCards />
        
        <div id="selector">
        <button>Call</button>
        <button>Fold</button>

        </div>
        </>
        
    )
}
export default Home