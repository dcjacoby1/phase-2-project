import { useState } from "react"

function ComputerCards ({cards, flipCard}) {
    //if statement prevents an error of cards not existing before the fetch runs
    //without it, ComputerCards checks for cards before state updates and says cards doesn't exist 
    if (cards.length <4) {
        return null
    }

    return(
      <div id="cards">  
        {/* depending on boolean value of flipCard, front or back of card will show  */}
        <div id="computer-cards" >
         {flipCard? (<img className="left-card" src="https://www.deckofcardsapi.com/static/img/back.png" alt="Computer Card Front" title="Computer Card" width={120} height={150}/>):
         (<img className="left-card" src={cards[0].image} alt="Computer Card Front" title="Computer Card" width={120} height={150}/>)}
         {flipCard? (<img className="left-card" src="https://www.deckofcardsapi.com/static/img/back.png" alt="Computer Card Front" title="Computer Card" width={120} height={150}/>):
         (<img className="left-card" src={cards[1].image} alt="Computer Card Front" title="Computer Card" width={120} height={150}/>)}    
        
        </div>
        <div id="player-cards" >
        <img className="left-card" src={cards[2].image} alt="Player Card" title="Player Card" width={120} height={150}/>
        <img className="right-card" src={cards[3].image} alt="Player Card" title="Player Card" width={120} height={150}/>
    </div>
    </div>

    )
}
export default ComputerCards
