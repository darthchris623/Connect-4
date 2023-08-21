console.log('Connect Four');

// Start game button
const startButton = document.createElement('button'); // Start button added dynamically via JS DOM manipulation
startButton.setAttribute('id', 'new-game-button');
startButton.innerText = 'Start new game';
document.body.append(startButton);
startButton.addEventListener('click', startNewGame);

// End button added dynamically via JS DOM manipulation
// but not visible until you press the "start game button".
const endButton = document.createElement('button');

// Start-new-game function
function startNewGame() {
    console.log('New game has begun');
    const gameBoard = document.createElement('div');
    gameBoard.setAttribute('id', 'gameboard');
    document.body.append(gameBoard);
    for (let c = 1; c < 8; c++){
        const column = document.createElement('div') // Creates each column
        column.setAttribute('id', `column${c}`)
        for (let r = 1; r < 7; r++){ // Creates each row for each column
            const chipSlots = document.createElement('div'); // creates the slots for the black and red chips
            chipSlots.setAttribute('class', 'chipslot');
            chipSlots.setAttribute('name', `r${r}c${c}`);
            chipSlots.addEventListener('click', function (event) {
                console.log(event.target);
                console.log(`r${r}c${c}`);
            });
            column.append(chipSlots);
            gameBoard.append(column);
        };
    };
    startButton.remove();
    endButton.setAttribute('id', 'end-game-button');
    endButton.innerText = 'Quit current game';
    document.body.append(endButton);
};

// End game button
endButton.addEventListener('click', function () {
    if (confirm('Are you sure you want to quit?')) {
        // End of game
        console.log('Game over.');
    }
    else {
        // Continue playing
        console.log('Keep playing');
        return
    }
    const gameBoard = document.getElementById('gameboard');
    // console.log('Game over');
    gameBoard.remove();
    endButton.remove();
    document.body.append(startButton);
    // const areYouSure = document.createElement('div')
    // const newGame = document.createElement('div'); // div for new button
    // const newGameButton = document.createElement('button'); // creates new button element
    // const header = document.createElement('h1');
    // header.innerText = 'Are you REALLY sure you want to quit?'
    // newGame.setAttribute('id', 'new-game');
    // newGameButton.innerText = 'Yes, I want to quit and start a new game.';
    // newGameButton.setAttribute('id', 'new-game-button');
    // areYouSure.classList = 'are-you-sure';
    // areYouSure.style.zIndex = 1; // places div above the game board
    // newGameButton.addEventListener('click', endGame);
    // areYouSure.append(header);
    // newGame.append(newGameButton);
    // areYouSure.append(newGame);
});



// End game function
// function endGame() {
//     const newGameButton = document.getElementsByClassName('are-you-sure')
//     const gameBoard = document.getElementById('gameboard');
//     console.log('Game over');
//     gameBoard.remove();
//     endButton.remove();
//     document.body.append(startButton);
//     newGameButton.addEventListener('click', function () {
//         areYouSure.remove();
//     });
// };


// function endOfGame() {
//     const gameWon = document.createElement('div'); // victory notification div
//     const newGame = document.createElement('div'); // div for new button
//     const newGameButton = document.createElement('button'); // creates new button element
//     const header = document.createElement('h1');
//     const caption = document.createElement('p');
    
// };

let redPlayer = 'R';
let blackPlayer = 'B';
let playersTurn = 'R'

function makeYourMove(event) {
    const clickedSlot = event.target;

};