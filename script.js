const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

const words = ["javascript", "developer", "hangman", "programming", "python"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctLetters = [];
let wrongLetters = [];

function displayWord() {
    wordElement.innerHTML = selectedWord
        .split("")
        .map(letter => `<span>${correctLetters.includes(letter) ? letter : ""}</span>`)
        .join("");

    if (wordElement.innerText.replace(/\n/g, "") === selectedWord) {
        finalMessage.innerText = "Congratulations! You won! 🎉";
        popup.style.display = "flex";
    }
}

function updateWrongLetters() {
    wrongLettersElement.innerHTML = wrongLetters.length ? `<p>Wrong Letters:</p> ${wrongLetters.join(", ")}` : "";

    figureParts.forEach((part, index) => {
        part.style.display = index < wrongLetters.length ? "block" : "none";
    });

    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = "You lost! 😞";
        popup.style.display = "flex";
    }
}

window.addEventListener("keydown", (e) => {
    const letter = e.key.toLowerCase();
    if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) correctLetters.push(letter);
    } else if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
    }
    displayWord();
    updateWrongLetters();
});

playButton.addEventListener("click", () => {
    correctLetters = [];
    wrongLetters = [];
    selectedWord = words[Math.floor(Math.random() * words.length)];
    popup.style.display = "none";
    displayWord();
    updateWrongLetters();
});

displayWord();
