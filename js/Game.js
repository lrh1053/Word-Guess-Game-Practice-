// Game.js to create a Game class with methods for starting and ending the game, 
// handling interactions, getting random phrases, checking for a win, 
// and removing a life counter.

class Game {
    constructor (missed, phrases) {
        // used to track the number of missed guesses by the player.
        this.missed = missed;     
        // need to use map to make phrases the list of Phrase objects
        this.phrases = phrases.map((phrase) => new Phrase(phrase));
    }
    
    // get random quote
    getRandomPhrase() {
        const randomIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomIndex];
    }

    // handle the game interation (each character input player chose)
    handleInteraction(letterObj) {
        let result = this.getRandomPhrase().checkLetter(letterObj);
        if (result === true) {
            this.getRandomPhrase().showMatchedLetter(letterObj);
            letterObj.setAttribute('class', 'chosen');
            if (pressedCorrectKeys.includes(letterObj.textContent) === false){
                pressedCorrectKeys.push(letterObj.textContent);
            }
            this.checkForWin();
        } else {
            letterObj.setAttribute('class', 'wrong');
            if (pressedWrongKeys.includes(letterObj.textContent) === false){
                pressedWrongKeys.push(letterObj.textContent);
            }
            this.missed += 1;
            this.removeLife();
        }
    }

    // remove heart when player chose wrong character
    removeLife() {
        let heart = document.querySelector('.tries');
        if (this.missed < 4) {
            heart.parentNode.removeChild(heart);
        } else {
            heart.parentNode.removeChild(heart);
            this.checkForWin()
        }
    }

    // check the win condition
	checkForWin() {
		const lost = 'YOU LOST';
		const win = 'YOU WON';
		if (this.missed === 5) {
			this.gameOver(lost);
		} else if (shownLetters === phraseLetters.filter((ch) => ch !== " ").length) {
			this.gameOver(win);
		} else {

		}
	}
    
    // show game result when it's game over (either win or lose)
    gameOver(result) {
        document.getElementById('overlay').style.display = "flex";
        const results = document.querySelector('#game-over-message');
        startButton.textContent = "New Game";
        if (result === 'YOU LOST') {
            results.textContent = 'YOU LOST';
        } else {
            results.textContent = 'YOU WON!';
        }
        this.gameReset();
    }

    // start a new game (first time)
    startGame() {
        this.getRandomPhrase().addPhraseToDisplay();
    }

    // start another game (after first game finished)
    gameReset() {
		this.missed = 0;
		shownLetters = 0;
        phraseLetters = [];
        pressedCorrectKeys = [];
        pressedWrongKeys = [];
        const scoreboardOl = document.querySelector('#scoreboard ol');
		for (let i=0; i < lives.length; i++) {
            scoreboardOl.appendChild(lives[i]);
		}
        let chosenKeys = $(':disabled');
        
		for (let i = 0; i < chosenKeys.length; i++) {
			chosenKeys[i].removeAttribute('disabled');
			chosenKeys[i].setAttribute('class', 'key');
		}
		let letters = document.querySelectorAll('#phrase li');
		for (let i = 0; i < letters.length; i++) {
			letters[i].remove();
        }
        this.startGame();

	}
}