function ComputerCards ({cards}) {
    //this prevents an error of cards not existing before the fetch runs
    //without it, ComputerCards checks for cards before state updates and says cards doesn't exist
    if (cards.length <4) {
        return null
    }
    return(
      <>  
        <div id="computer-cards" >
            <img className="left-card" src={cards[0].image} alt="Computer Card" title="Computer Card" width={120} height={150}/>
            <img className="right-card" src={cards[1].image} alt="Computer Card" title="Computer Card" width={120} height={150}/>
        </div>
        <div id="player-cards" >
        <img className="left-card" src={cards[2].image} alt="Computer Card" title="Computer Card" width={120} height={150}/>
        <img className="right-card" src={cards[3].image} alt="Computer Card" title="Computer Card" width={120} height={150}/>
    </div>
    </>

    )
}
export default ComputerCards
