// Letters

const Letters = "abcdefghijklmnopqrstuvwxyz";
// get array from letters
let lettersArray = Array.from(Letters);
// select Letters container
let lettersContainer = document.querySelector(".letters");
// generate Letters
lettersArray.forEach((letter) => {
  // create span
  let span = document.createElement("span");
  // create letter text node
  let theLetter = document.createTextNode(letter);
  // append Letter to span
  span.appendChild(theLetter);
  // add class on span
  span.className = "letter-box";
  // append span to the letters container
  lettersContainer.appendChild(span);
});

// Object of words & categores
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "prestige",
    "inception",
    "parasite",
    "interstellar",
    "whiplash",
    "memento",
    "coco",
    "up",
  ],
  people: [
    "albert einstein",
    "hitchcock",
    "alexander",
    "cleopatra",
    "mahatma ghandi",
  ],
  countries: ["egypt", "palestine", "yemen", "syria", "bahrain"],
};
// get random property

let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

let randomPropName = allKeys[randomPropNumber];

let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

let randomValue = randomPropValue[randomValueNumber];
console.log(randomValue);
// set category info

document.querySelector(".category span").innerHTML = randomPropName;

// select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

// convert the word to array

let lettersAndSpace = Array.from(randomValue.toLowerCase());
// increase success counter

let successCounter = 0;
// create spans depends on word
lettersAndSpace.forEach((letter) => {
  // create empty span
  let emptySpan = document.createElement("span");
  // if letter is space
  if (letter === " ") {
    emptySpan.className = "has-space";
    // increase success counter
    successCounter++;
  }
  // append span to the guess container
  lettersGuessContainer.appendChild(emptySpan);
});

//  select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong attempts

let wrongAttempts = 0;
// select draw element
let theDraw = document.querySelector(".hangman-draw");

// success counter

// handle clicking on letters
document.addEventListener("click", (e) => {
  // set the choose status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // get clicked letter
    let theClickedLatter = e.target.innerHTML.toLowerCase();
    lettersAndSpace.forEach((wordLatter, wordIndex) => {
      // if the clickedLatter == on of the Chosen word latter
      if (wordLatter === theClickedLatter) {
        // set status to true
        theStatus = true;
        // loop on all guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLatter;
            // increase success counter
            successCounter++;
          }
        });
      }
    });
    // if letter is wrong
    if (theStatus !== true) {
      // increase the wrong attempts
      wrongAttempts++;
      // add class wrong in wrong  element
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      // play fail sound
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        endGame(`Game Over !, The Word Is ${randomValue}.`);
      }
    } else {
      // play success sound
      document.getElementById("success").play();
      if (successCounter === lettersAndSpace.length) {
        endGame(`You Win , You Made ${wrongAttempts} Wrong Attempts.`);
      }
    }
  }
});

// end game function

function endGame(txt) {
  lettersContainer.classList.add("finished");
  // create div
  let div = document.createElement("div");
  //create text
  let text = document.createTextNode(txt);
  // append text to div
  div.appendChild(text);
  // add class on div
  div.className = "popup";
  // append div to the body
  document.body.appendChild(div);
}
