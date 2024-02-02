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
const buttons = document.querySelector(".calculator-buttons");

function createButtons() {
  for (let i = 0; i < 18; i++) {
    let button = document.createElement("button");
    button.classList.add("calculator-button-style");
    buttons.appendChild(button);
  }
}

createButtons();
