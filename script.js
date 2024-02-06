function Calculator() {
  this.methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  this.calculate = function operate(str) {
    let split = str.split(" "),
      a = +split[0],
      operator = split[1],
      b = +split[2];

    return this.methods[operator](a, b);
  };
}

// GENERATE BUTTONS
const buttonSection = document.querySelector(".calculator-buttons");

const buttons = [
  "7",
  "8",
  "9",
  "DEL",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "-",
  ".",
  "0",
  "/",
  "x",
  "RESET",
  "=",
];

function createButton(buttonText, isLastTwo) {
  const button = document.createElement("button");
  button.textContent = buttonText;
  button.setAttribute("value", buttonText);
  button.classList.add("calculator-button");
  if (isLastTwo) {
    button.classList.add("calculator-button-full-width");
  }
  button.addEventListener("click", handleClick);
  buttonSection.appendChild(button);
}

buttons.forEach((button, index) => {
  const isLastTwo = index >= buttons.length - 2;
  createButton(button, isLastTwo);
});

let currentDisplayValue = "";
let completedCalculation = false;

// handles calculator button click -> should handle display? or split into it's own function and call here?
// maybe make a function for each if statement?
function handleClick(event) {
  const operators = ["+", "-", "x", "/"];
  let buttonValue = event.target.textContent;
  const calc = new Calculator();

  // this logic needs to be applied in the "=" condition
  // only handles 2 numbers at present
  // will an array work for splitting out into what maths needs done?
  // e.g. 2 + 2 - 4
  // get sum of 2 + 2 = 4
  // previous = 4
  // now previous - 4 = 0
  // return 0

  if (!isNaN(buttonValue) || buttonValue === ".") {
    if (completedCalculation) {
      currentDisplayValue = buttonValue;
      completedCalculation = false;
      console.log(currentDisplayValue);
    } else {
      currentDisplayValue += buttonValue;
      console.log(currentDisplayValue);
    }
  } else if (operators.includes(buttonValue)) {
    const lastChar = currentDisplayValue.trim().slice(-1);
    if (!operators.includes(lastChar)) {
      currentDisplayValue += " " + buttonValue + " ";
    }
    console.log(currentDisplayValue);
  } else if (buttonValue === "DEL") {
    const lastSpaceIndex = currentDisplayValue.lastIndexOf(" ");
    if (currentDisplayValue.slice(-1) !== " ") {
      currentDisplayValue = currentDisplayValue.slice(0, -1);
    } else if (lastSpaceIndex !== -1) {
      currentDisplayValue = currentDisplayValue.slice(0, lastSpaceIndex);
    }
    console.log(currentDisplayValue);
    console.log(currentDisplayValue);
  } else if (buttonValue === "RESET") {
    currentDisplayValue = "";
    console.log(currentDisplayValue);
    console.log("Display Value Reset");
  } else if (buttonValue === "=") {
    currentDisplayValue = currentDisplayValue.replace("x", "*");
    console.log(calc.calculate(currentDisplayValue));
    currentDisplayValue = calc.calculate(currentDisplayValue);
    completedCalculation = true;
  }
  screenOutput(currentDisplayValue);
}

// checks for existing display and removes if true
// creates a new display
function screenOutput(buttonValue) {
  const screen = document.querySelector(".calculator-screen");
  const existingDisplay = screen.querySelector("p");
  if (existingDisplay) {
    screen.removeChild(existingDisplay);
  }
  const display = document.createElement("p");
  display.textContent = buttonValue;
  screen.appendChild(display);
}
