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
const whosTurn = document.createElement('h3'); // Keeps track of who's turn it is.
// Start-new-game function
function startNewGame() {
    gameOver = false;
    const gameBoard = document.createElement('div');
    whosTurn.innerText = `It's ${playersTurn}'s turn.`;
    for (let c = 0; c < 7; c++) {
        const column = document.createElement('div') // Creates each column
        column.setAttribute('id', `column${c}`)
        for (let r = 0; r < 6; r++) { // Creates each row for each column
            const chipSlots = document.createElement('div'); // creates the slots for the black and red chips
            chipSlots.setAttribute('class', 'chipslot');
            chipSlots.setAttribute('id', `${r}-${c}`);
            chipSlots.addEventListener('click', makeYourMove);
            column.append(chipSlots);
            gameBoard.append(column);
        };
        gameBoard.setAttribute('id', 'gameboard');
        document.body.append(gameBoard);
        document.body.append(whosTurn);
        startButton.remove();
        endButton.setAttribute('id', 'end-game-button');
        endButton.innerText = 'Quit current game';
        document.body.append(endButton);
    };
};

// End game button
endButton.addEventListener('click', function () {
    // Alert: OK to start over
    if (confirm('Are you sure you want to quit?')) {
    }
    // Keep playing
    else {
        return
    }
    const gameBoard = document.getElementById('gameboard');
    gameBoard.remove();
    endButton.remove();
    for (let r = 0; r < gameBoardArray.length; r++){ // Resets the gameBoardArray when button is pushed
        for (let c = 0; c < gameBoardArray[r].length; c++){
            gameBoardArray[r][c] = 0;
        }
    }
    bottomUp = [5, 5, 5, 5, 5, 5, 5];
    document.body.append(startButton);
});

// JS gameboard keeps track of red and blue chips with the numbers 1 and 2 respectively.
let gameBoardArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
let bottomUp = [5, 5, 5, 5, 5, 5, 5]; // This will fill the bottom chipslot first

// Logic for player's moves
let redPlayer = 'Red';
let bluePlayer = 'Blue';
let playersTurn = bluePlayer; // Starting player
let winner; // Not used yet
let gameOver = false;

function makeYourMove(event) {
    const clickedSlot = event.target;
    if (gameOver === true) { // When true, no more moves are allowed
        return;
    }
    let coords = clickedSlot.id.split('-'); // example [1, 4]
    let r = parseInt(coords[0]); // 1
    let c = parseInt(coords[1]); // 4
    

    r = bottomUp[c]; // Bottom chipslot first. This code redefines the r coordinate variable. [1, 4] becomes [5, 4],
    if (r < 0) { // This code prevents filling the column more.
        return;
    }
    // console.log(r, c); // Checks to see if the coords are being accessed
    gameBoardArray[r][c] = playersTurn
    const chipslot = document.getElementById(r.toString() + '-' + c.toString()); // id = 1-4
    // console.log(chipslot); // Checks the actual chip coordinates
    if (playersTurn === redPlayer) {
        chipslot.style.backgroundColor = 'red';
        playersTurn = bluePlayer;
        gameBoardArray[r][c] = 1;
        // clickedSlot.innerText = 'RED'
        chipslot.removeEventListener('click', makeYourMove);
    }
    else {
        chipslot.style.backgroundColor = 'blue';
        playersTurn = redPlayer;
        gameBoardArray[r][c] = 2;
        // clickedSlot.innerText = 'BLUE'
        chipslot.removeEventListener('click', makeYourMove);
    }
    whosTurn.innerText = `It's ${playersTurn}'s turn.`;
    r -= 1; // updating row height for the column. Same column will be [4, 4].
    bottomUp[c] = r; // updating the array
    checkMatch();
};

function checkMatch() {
    // Checking horizontally for 4 in a row
    for (let r = 0; r < 6; r++){
        for (let c = 0; c < 7; c++){
            if (gameBoardArray[r][c] != 0) {
                if (gameBoardArray[r][c] == gameBoardArray[r][c + 1] &&
                    gameBoardArray[r][c + 1] == gameBoardArray[r][c + 2] &&
                    gameBoardArray[r][c + 2] == gameBoardArray[r][c + 3]) {
                    console.log('horizontal winner');
                    endOfGame(r, c);
                    return;
                }
            }
        }
    }
    // Checking vertically for 4 in a row
    for (let r = 0; r < 3; r++){
        for (let c = 0; c < 7; c++){
            if (gameBoardArray[r][c] != 0){
                if (gameBoardArray[r][c] == gameBoardArray[r + 1][c] &&
                    gameBoardArray[r + 1][c] == gameBoardArray[r + 2][c] &&
                    gameBoardArray[r + 2][c] == gameBoardArray[r + 3][c]) {
                    console.log('vertical winner');
                    endOfGame(r, c);
                    return;
                }
            }
        }
    }
    // Check diagonally up-left for 4 in a row
    for (let r = 3; r < 6; r++){
        for (let c = 0; c < 7; c++){
            if (gameBoardArray[r][c] != 0){
                if (gameBoardArray[r][c] == gameBoardArray[r - 1][c - 1] &&
                    gameBoardArray[r - 1][c - 1] == gameBoardArray[r - 2][c - 2] &&
                    gameBoardArray[r - 2][c - 2] == gameBoardArray[r - 3][c - 3]) {
                    console.log('diagonal left winner');
                    endOfGame(r, c);
                    return;
                }
            }
        }
    }
    //Checking diagonally up-right
    for (let r = 3; r < 6; r++){
        for (let c = 0; c < 7; c++){
            if (gameBoardArray[r][c] != 0){
                if (gameBoardArray[r][c] == gameBoardArray[r - 1][c + 1] &&
                    gameBoardArray[r - 1][c + 1] == gameBoardArray[r - 2][c + 2] &&
                    gameBoardArray[r - 2][c + 2] == gameBoardArray[r - 3][c + 3]) {
                    console.log('diagonal right winner');
                    endOfGame(r, c);
                    return;
                }
            }
        }
    }
};

// End game function
function endOfGame(r, c) {
    if (gameBoardArray[r][c] == 1) {
        winner = redPlayer;
        document.querySelector('h3').innerText = `${winner} wins the game!`
    }
    else if (gameBoardArray[r][c] == 2) {
        winner = bluePlayer;
        document.querySelector('h3').innerText = `${winner} wins the game!`
    }
    gameOver = true;
};
