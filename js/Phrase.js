// Phrase.js to create a Phrase class to handle the creation of phrases
class Phrase{
    constructor (phrase) {
        this.phrase = phrase;
    }
    
    // display the phrase.
    addPhraseToDisplay() {
        let phrase = this.phrase;
        for (let i = 0; i < phrase.length; i++) {
            phraseLetters.push(phrase[i]);
            let phraseLi = document.createElement('li');
            if (phrase[i] === " ") {
                phraseLi.className = `hide space`;
            } else {
                phraseLi.className = `hide letter ${phrase[i]}`;
                phraseLi.textContent = phrase[i];
            }
            document.querySelector('#phrase ul').append(phraseLi);
        }
    }

    // check if the character player chose is in the goal word
    checkLetter(letterObj) {
        return phraseLetters.includes(letterObj.textContent);
    }
    
    // only show characters that are matched
    showMatchedLetter(letterObj) {
        const letter = letterObj.textContent;
        const matchedLetters = document.querySelectorAll(`.hide.letter.${letter}`);
        matchedLetters.forEach((e)=>{
            e.classList.remove('hide');
            e.classList.add('show');
            shownLetters += 1;
        })   
    }
}
