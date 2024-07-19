function Rules() {
    return(
        <div className="modal-container-1">
            <div id="rules-text">
            <h1>Rules</h1>
            
            <h2>Objective</h2>
            <p>Determine if your hand is stronger than the CPU's hand</p>
            <h2>Gameplay</h2>
            <p> Player draws 2 cards from a deck face up, the CPU draws 2 cards face down
                <br></br> 
                The player must decide if their hand is greater than the CPUs (call) hand or worse (fold)
                <br></br> If their guess is correct, the player earns a point
                <br></br> If their guess is incorrect, the CPU earns a point
            </p>
            <h2>Hierarchy of Hands</h2>
            <p > The value of each card is in ascending value [2,3,4,5,6,7,8,9,10,J,Q,K,A]
                <br></br> To determine the greater hand, the higher card of the player gets compared to the higher card of the CPU
                <br></br> If the higher cards are equal, the lower cards are compared - tie goes to the player 
            </p>
            </div>
        </div>
        
    )
}
export default Rules