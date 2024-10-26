// script.js
const words = [
    "apple", "banana", "grape", "orange", "mango", "peach", "pear", "plum", "kiwi", "melon",
    "watermelon", "pineapple", "strawberry", "blueberry", "raspberry", "blackberry", "cherry",
    "coconut", "apricot", "fig", "date", "lemon", "lime", "pomegranate", "papaya", "passionfruit",
    "carrot", "broccoli", "spinach", "lettuce", "cabbage", "onion", "garlic", "potato", "sweet potato",
    "tomato", "pepper", "cucumber", "zucchini", "eggplant", "radish", "turnip", "beet", "asparagus",
    "cauliflower", "corn", "peas", "bean", "chickpea", "lentil", "barley", "oat", "rice", "quinoa",
    "bread", "pasta", "noodle", "pizza", "burger", "sandwich", "taco", "sushi", "salad", "soup",
    "cake", "cookie", "brownie", "pie", "donut", "candy", "chocolate", "ice cream", "pudding", "jelly",
    "milk", "cheese", "yogurt", "butter", "cream", "egg", "beef", "chicken", "pork", "fish",
    "shrimp", "lobster", "crab", "turkey", "ham", "sausage", "bacon", "tofu", "seitan", "tempeh",
    "car", "bike", "bus", "train", "airplane", "boat", "ship", "helicopter", "scooter", "skateboard",
    "motorcycle", "van", "pickup", "tractor", "subway", "trolley", "rocket", "yacht", "hovercraft", "jet",
    "computer", "laptop", "tablet", "smartphone", "television", "camera", "printer", "scanner", "monitor", "keyboard",
    "mouse", "speaker", "microphone", "router", "modem", "hard drive", "flash drive", "battery", "charger", "cable",
    "software", "application", "program", "website", "database", "server", "cloud", "network", "internet", "email",
    "social media", "blog", "forum", "wiki", "search engine", "browser", "game", "video", "music", "podcast",
    "book", "novel", "magazine", "newspaper", "journal", "comic", "textbook", "manual", "guide", "dictionary",
    "map", "atlas", "globe", "calendar", "planner", "notebook", "journal", "sketchbook", "diary", "ledger",
    "tool", "hammer", "screwdriver", "wrench", "pliers", "saw", "drill", "level", "tape measure", "chisel",
    "paintbrush", "roller", "bucket", "ladder", "wheelbarrow", "shovel", "rake", "hoe", "spade", "axe",
    "fishing rod", "guitar", "piano", "drum", "violin", "trumpet", "flute", "saxophone", "cello", "harp",
    "trombone", "accordion", "ukulele", "banjo", "synthesizer", "microphone", "speaker", "amplifier", "headphones", "earbuds"
]; // List of words to guess
let word = words[Math.floor(Math.random() * words.length)]; // Randomly select a word
let wordHidden = Array(word.length).fill('_'); // Hide the word with underscores
let lives = 10;
let usedLetters = [];

// Select HTML elements
const wordHiddenEl = document.getElementById('word-hidden');
const hangmanEl = document.getElementById('hangman');
const messageEl = document.getElementById('message');
const letterInput = document.getElementById('letter');
const btnPropose = document.getElementById('btn-propose');
const btnReplay = document.getElementById('btn-replay');

// Display the hidden letters as boxes
function displayHiddenWord() {
    wordHiddenEl.innerHTML = ''; // Clear the element before re-filling
    wordHidden.forEach(letter => {
        const letterBox = document.createElement('div');
        letterBox.className = 'letter-box';
        letterBox.textContent = letter; // Show either the letter or "_"
        wordHiddenEl.appendChild(letterBox);
    });
}

// Update the display of the hangman (number of errors)
function displayHangman() {
    hangmanEl.textContent = `Errors: ${10 - lives}`;
}

// Check if the letter is in the word and update the boxes
function checkLetter(letter) {
    if (usedLetters.includes(letter)) {
        alert("You have already guessed that letter.");
        return;
    }

    usedLetters.push(letter); // Add the letter to the used letters

    if (word.includes(letter)) {
        // If the letter is correct, display it in the correct positions
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                wordHidden[i] = letter;
            }
        }
    } else {
        // If the letter is incorrect, lose a life
        lives--;
    }

    displayHiddenWord();
    displayHangman();

    // If the player has won
    if (!wordHidden.includes('_')) {
        messageEl.textContent = "Congratulations! You've won 🎉";
        btnPropose.disabled = true; // Disable the button
        btnReplay.style.display = 'inline-block'; // Show the "Play Again" button
    }

    // If the player has lost
    if (lives === 0) {
        messageEl.textContent = `Sorry! The word was "${word}". You lost.`;
        btnPropose.disabled = true; // Disable the button
        btnReplay.style.display = 'inline-block'; // Show the "Play Again" button
    }
}

// Handle the letter submission
btnPropose.addEventListener('click', function() {
    const letter = letterInput.value.toLowerCase();
    if (letter.match(/[a-z]/) && letter.length === 1) {
        checkLetter(letter);
    } else {
        alert("Please enter a valid letter.");
    }
    letterInput.value = ''; // Reset the input
});

// Initialization
displayHiddenWord();
displayHangman();
