// app.js to perform basic DOM selection, 
// add event handlers, and to reset the game when it ends
const phraseArray = [
    // "love is blind",
    // "word for word",
    // "team treehouse",
    // "tech degree",
    "javascript course"
    // "full stack",
    // "front end",
    // "back end",
    // "christmas eve",
]
let missed;
let phraseLetters = [];
let startButton = document.querySelector("#btn__reset");
const lives = document.querySelectorAll('.tries');
let shownLetters = 0;
let game = new Game(0, phraseArray);
let keys = document.querySelectorAll('.key');
let pressedCorrectKeys = [];
let pressedWrongKeys = [];

// reset display 
function resetDisplay() {
    document.getElementById('overlay').style.display = "none";
}

// calling the function handling the game interation
function markButton(key) {
    key.setAttribute('disabled', 'true');
    game.handleInteraction(key);
}

// start button
startButton.addEventListener('click', function() {
    resetDisplay();
    game.startGame();
});

// add markButton to keys event listener
keys.forEach(key => {
    key.addEventListener('click', function (e) {
        markButton(e.target);
    });
});

// add the keyboard input functionality
document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    keys.forEach(key => {
        if (key.textContent === keyName && pressedWrongKeys.includes(keyName) === false) {
            markButton(key);
        }
    });
    if (document.getElementById('overlay').style.display === 'flex') {
        if (keyName === 'Enter') {
            resetDisplay();
            game.gameReset();
        }
    }
    if (document.getElementById('overlay').style.display === '') {
        if (keyName === 'Enter') {
            resetDisplay();
            game.startGame();
        }
    }
});



