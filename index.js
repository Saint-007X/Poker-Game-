
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

function createDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ rank, suit });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap
    }
}

function dealCards(deck, numPlayers, cardsPerPlayer) {
    const hands = Array.from({ length: numPlayers }, () => []);
    for (let i = 0; i < cardsPerPlayer; i++) {
        for (let j = 0; j < numPlayers; j++) {
            if (deck.length > 0) {
                hands[j].push(deck.pop());
            }
        }
    }
    return hands;
}

function evaluateHand(hand) {
    const values = hand.map(card => ranks.indexOf(card.rank)).sort((a, b) => b - a);
    const isFlush = hand.every(card => card.suit === hand[0].suit);
    const isStraight = values[0] - values[4] === 4 && new Set(values).size === 5;
    
    const counts = {};
    values.forEach(value => {
        counts[value] = (counts[value] || 0) + 1;
    });

    const pairs = Object.values(counts).filter(count => count === 2).length;
    const threeOfAKind = Object.values(counts).filter(count => count === 3).length;
    const fourOfAKind = Object.values(counts).filter(count => count === 4).length;

    if (isFlush && isStraight) return 'Straight Flush';
    if (fourOfAKind) return 'Four of a Kind';
    if (threeOfAKind && pairs) return 'Full House';
    if (isFlush) return 'Flush';
    if (isStraight) return 'Straight';
    if (threeOfAKind) return 'Three of a Kind';
    if (pairs === 2) return 'Two Pair';
    if (pairs === 1) return 'One Pair';
    
    return 'High Card';
}

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.chips = 100; // Starting chips
        this.currentBet = 0;
    }

    placeBet(amount) {
        if (amount > this.chips) {
            throw new Error(`${this.name} does not have enough chips!`);
        }
        this.chips -= amount;
        this.currentBet += amount;
    }

    resetBet() {
        this.currentBet = 0;
    }
}

function playGame(numPlayers) {
    const deck = createDeck();
    shuffleDeck(deck);

    const players = Array.from({ length: numPlayers }, (_, i) => new Player(`Player ${i + 1}`));

    // Pre-flop: Deal 2 cards to each player
    dealCards(deck, numPlayers, 2);

    // Initial betting round
    for (const player of players) {
        console.log(`${player.name}, you have ${player.chips} chips. Place your bet (or type 0 to check):`);
        // Simulating player bets (in a real game, you would take user input)
        const bet = Math.floor(Math.random() * 20); // Simulating a random bet
        if (bet > 0) {
            player.placeBet(bet);
            console.log(`${player.name} bets ${bet} chips.`);
        } else {
            console.log(`${player.name} checks.`);
        }
    }

    // Flop: Deal 3 community cards
    const communityCards = dealCards(deck, 1, 3)[0];
    console.log(`Community Cards: ${JSON.stringify(communityCards)}`);

    // Second betting round
    for (const player of players) {
        console.log(`${player.name}, you have ${player.chips} chips. Place your bet (or type 0 to check):`);
        const bet = Math.floor(Math.random() * 20); // Simulating a random bet
        if (bet > 0) {
            player.placeBet(bet);
            console.log(`${player.name} bets ${bet} chips.`);
        } else {
            console.log(`${player.name} checks.`);
        }
    }

    // Turn: Deal 1 community card
    const turnCard = dealCards(deck, 1, 1)[0][0];
    console.log(`Turn Card: ${JSON.stringify(turnCard)}`);

    // Third betting round
    for (const player of players) {
        console.log(`${player.name}, you have ${player.chips} chips. Place your bet (or type 0 to check):`);
        const bet = Math.floor(Math.random() * 20); // Simulating a random bet
        if (bet > 0) {
            player.placeBet(bet);
            console.log(`${player.name} bets ${bet} chips.`);
        } else {
            console.log(`${player.name} checks.`);
        }
    }

    // River: Deal 1 community card
    const riverCard = dealCards(deck, 1, 1)[0][0];
    console.log(`River Card: ${JSON.stringify(riverCard)}`);

    // Final betting round
    for (const player of players) {
        console.log(`${player.name}, you have ${player.chips} chips. Place your bet (or type 0 to check):`);
        const bet = Math.floor(Math.random() * 20); // Simulating a random bet
        if (bet > 0) {
            player.placeBet(bet);
            console.log(`${player.name} bets ${bet} chips.`);
        } else {
            console.log(`${player.name} checks.`);
        }
    }

    // Determine winner
    players.forEach(player => {
        const fullHand = [...player.hand, ...communityCards];
        const evaluation = evaluateHand(fullHand);
        console.log(`${player.name} hand: ${JSON.stringify(fullHand)} - Evaluation: ${evaluation}`);
    });

    // Note: This will need a proper comparison of evaluations to determine the winner
}

// Start a game with 4 players
playGame(4);
