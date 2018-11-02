let Game = { 
    deck: null,
    players: {},
    playersTurn: null,
    turnDirection: 1,
    topCard: null,
    topCardColor: null,
    topCardValue: null,
}

function makeNewCards(){
    const cards = [
        'red_0',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_skip', 'red_reverse', 'red_draw_two',
        'red_skip', 'red_reverse', 'red_draw_two',
        
        'green_0',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_skip', 'green_reverse', 'green_draw_two',
        'green_skip', 'green_reverse', 'green_draw_two',
        
        'blue_0',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        
        'yellow_0',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        
        'wild_draw-four','draw_four_wild', 'wild', 'wild',
        'wild_draw-four','draw_four_wild', 'wild', 'wild',
    ]    
    
    return cards
}

// create a function that takes an array of cards 
// and returns a new array of shuffled cards
function shuffle( cards ){
    // create an array to hold the shuffled cards
    const deck = [ ]
    // algorithm to shuffle a deck of cards
    // as long as there are cards in the cards array
    while (cards.length > 0) {
        // pick a random number between 0 and the length of the cards array
        let randomNumber = Math.floor(Math.random() * cards.length)
        // then use that number to pick a card
        let card = cards[randomNumber]
        // console.log('card is '+card)
        // push that card onto the new deck
        deck.push(card)
        // remove the card from the original deck
        cards.splice(randomNumber, 1)        
    }
    return deck
}

function dealCard(deck){
    return deck.shift()
}

function startNewGame(){
    //create new set of cards
    let cards = makeNewCards()
    //shuffle those cards
    let deck = shuffle(cards)
    //and attach them to the Game object
    Game.deck = deck

    
    // add up to 4 players to the game object
    //                      0           1       2       3
    const playerNames = ["Crystal", "Jerry", "Jose", "Yanaira"]
    const ALPHABET = ['A','B','C','D','E','F','G','H','I','J']
    for (let i = 0; i < playerNames.length; i++){
        //get the player name
        let name = playerNames[i]
        let id = ALPHABET[i]
        let player = createNewPlayer(name, id)
        Game.players[id] = player
    }
    
    //flip the top on the deck over the start games
    let discard = dealCard(Game.deck)
    Game.topCard = discard
    
    let color = getCardColor(discard)
    let val = getCardValue(discard)
    Game.topCardColor = color
    Game.topCardValue = val
    
    let topCard = document.querySelector('#deck')
    topCard.setAttribute('src', 'images/'+discard+'.png')
    
    Game.playersTurn = 'A'
    
    showGameObject()
}
    function createNewPlayer(playerName, id){
        //every player has to have a name
        //cards
        //points
        let player = {
            id: id,
            name: playerName,
            cards: [ ],
            pointsPerPlayer: 0,
        }
        
        for(let i = 0; i < 7; i++){
            let card = dealCard(Game.deck)
            player.cards.push(card)
        }
        
        return player
    }


function showGameObject(){
  var codeSection = document.querySelector('#game-object');
  codeSection.innerHTML = JSON.stringify(Game, null, 2);
}

//ex.'blue_7'
//ex.'yellow_9'
//ex. 'gree_draw_two'
//ex. 'wild' or 'wild_draw_four'
function getCardColor(cardName){
    // take the string card name and .split the word at '_'
    const splitCard = cardName.split('_') 
    //then grab fist index of the array
    const color = splitCard[0]
    //return the color 
    return color
    
}
//result: 'blue'
//result: 'yellow'
//result: 'green'
//result: 'wild'

//ex.'blue_7'
//ex.'yellow_9'
//ex.'blue_reverse'
//ex. 'gree_draw_two'
//ex.'red_skip'
//ex. 'wild' or 'wild_draw_four'
function getCardValue(cardName){
    // take the string card name and .split the word at '_'
    const splitCard = cardName.split('_')
    //grab the value at 1st index
    let val = splitCard[1]
    //if the length of the splitCard is 3
    //then grab the value at index 2
    //and concatenate it on to the end of the val variable
    if (splitCard.length === 3){
        val += '_'+splitCard[2]
    }
    
    
    //return the value
    return val
    
}
//result: '7'
//result: '9'
//result: 'reverse'
//result: 'draw_two'
//result: 'skip'
//result: ''

function changePlayersTurn(){
    const ALPHABET = Object.keys(Game.players)
    //get the current player's turn from the Game object
    const currentPlayerId = Game.playersTurn
    //get the turnDirection from the Game object
    const currentDirection = Game.turnDirection
    //move the current player's turn one position in
    //whatever direction it's supposed to move in
        //first, get the index of the player's turn in the alphabet
        const idx = ALPHABET.indexOf(currentPlayerId)
        //then change that index by the direction  number
        let newIdx = idx + currentDirection
        //if the new index is less than zero, set index player's last id
        if(newIdx < 0){
            //get the # of players playing
            newIdx = ALPHABET.length - 1
            //get the idx of the player's last id
        }
        //if ....
        if(newIdx >= ALPHABET.length){
            newIdx = 0
        }
        //then get id of new index in alph array
        const newPlayersTurn = ALPHABET[newIdx]
        Game.playersTurn = newPlayersTurn
}
//change the Game.playersTurn to the next's players turn

function playCard(playerId, cardName){
    //get card color
    let color = getCardColor(cardName)
    //get card value
    let val = getCardValue(cardName)
    //check to see if card is playable
    let isCardPlayable = cardIsPlayable(color, val)
    //if card is playable = true & play card
    if(isCardPlayable === true){
        // skip the player 
        if(val === 'skip'){
            skipTurn()
        }
        //reverse the direction
        if(val === 'reverse'){
            reverseTurn()
        }
        if(val === 'draw_two'){
            playerDrawTwo()
        }
        if(val === 'draw_four'){
            playerDrawFour()
        }
        if(color === 'wild'){
            playWildCard()
        }
        //play the card
       
    }else{
        alert('Invalid card. Choose different card.')
            //else = false & inform player
    }

}

function playerDrawCard(playerId){
    let player = Game.players[playerId]
    //draw one card 
    let card = dealCard(Game.deck)
    //off the top deck
    player.cards.push(card)
    //put them in player's hand
}

function skipTurn(){
    changePlayersTurn()
}

//take in player id 
function playerDrawTwo(playerId){
    playerDrawCard(playerId)
    playerDrawCard(playerId)
}

//take in player id 
function playerDrawFour(playerId){
    playerDrawCard(playerId)
    playerDrawCard(playerId)
    playerDrawCard(playerId)
    playerDrawCard(playerId)
}

function reverseTurn(){
    Game.turnDirection = Game.turnDirection * -1
}

function playWildCard(playerId, topColor){
    var wildCard = prompt("What color would you like to choose?")
    if(wildCard === 'green' || wildCard === 'blue' || wildCard === 'red', wildCard === 'yellow'){
        Game.topColor = wildCard
    }else {
        alert('Invalid color. Choose different color.')
        playWildCard();
    }
}

function cardIsPlayable(cardColor, cardValue){
    // create if statement
        //check if card matches the current card on top of the stack
        // if it has the same color or value 
        //place card on the stack
        //else if not same color or value
            //return "Card is not playable!"+ "Choose different card." to player
    if (cardColor === Game.topCardColor) {
        return true
    }
    if (cardValue === Game.topCardValue) {
        return true
    }
    if (cardColor === 'wild') {
        return true
    }

    return false    
}

function endTurn(){
    changePlayersTurn()
}