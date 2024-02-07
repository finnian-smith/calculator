class Calculator {
  constructor() {
    this.displayValue = "0";
    this.firstNumber = null;
    this.secondNumber = null;
    this.firstOperator = null;
    this.secondOperator = null;
    this.result = null;
    this.operationCompleted = false;
    this.methods = {
      "+": (x, y) => x + y,
      "-": (x, y) => x - y,
      "*": (x, y) => x * y,
      "/": (x, y) => (y !== 0 ? x / y : "🙅 ÷ 0"),
    };
    this.buttons = document.querySelectorAll("button");
    this.display = document.querySelector(".calculator-screen");
    this.addEventListeners();
  }

  addEventListeners() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", () => this.handleClick(button));
    });
  }

  handleClick(button) {
    const buttonType = button.classList[0];
    const buttonValue = button.value;

    switch (buttonType) {
      case "number":
        this.inputNumber(buttonValue);
        break;
      case "operator":
        this.inputOperator(buttonValue);
        break;
      case "equals":
        this.inputEquals();
        break;
      case "decimal":
        this.inputDecimal();
        break;
      case "delete":
        this.inputDelete();
        break;
      case "reset":
        this.clearDisplay();
        break;
    }
    this.updateDisplay();
  }

  updateDisplay() {
    this.display.innerText =
      this.displayValue.length > 9
        ? this.displayValue.substring(0, 9)
        : this.displayValue;
  }

  inputNumber(number) {
    // If an operation has been completed, start a new operation by resetting displayValue
    if (this.operationCompleted) {
      this.displayValue = number;
      this.operationCompleted = false;
    } else {
      if (this.displayValue === "0") {
        this.displayValue = number;
      } else {
        this.displayValue += number;
      }
    }
  }

  inputOperator(operator) {
    if (this.firstOperator && this.secondOperator === null) {
      // Evaluate the first operation if both firstOperator and secondOperator are set
      this.secondOperator = operator;
      this.secondNumber = parseFloat(this.displayValue);
      this.compute(); // Compute the result of the first operation
      this.firstNumber = this.result;
      this.displayValue = this.result.toString();
      this.firstOperator = operator; // Use the second operator for the next operation
      this.secondOperator = null;
      this.operationCompleted = true; // Indicate that an operation has been completed
    } else {
      if (this.firstOperator && this.secondOperator) {
        // If both operators are set, compute the result of the previous operation
        this.compute();
        this.firstNumber = this.result;
        this.displayValue = this.result.toString();
        this.secondNumber = null;
      } else {
        // If there's only one operator, set the first operator
        this.firstOperator = operator;
        this.firstNumber = parseFloat(this.displayValue);
      }
      this.operationCompleted = true;
    }
  }

  compute() {
    if (this.firstOperator && this.secondOperator) {
      this.result = this.methods[this.firstOperator](
        this.firstNumber,
        this.secondNumber
      );
    }
  }

  inputEquals() {
    if (this.firstOperator === null) {
      return;
    }
    const secondNumber = parseFloat(this.displayValue);
    this.displayValue = this.operate(
      this.firstNumber,
      secondNumber,
      this.firstOperator
    ).toString();
    this.firstNumber = parseFloat(this.displayValue);
    this.firstOperator = null;
    this.operationCompleted = true;
  }

  inputDecimal() {
    if (
      this.displayValue === this.firstNumber ||
      this.displayValue === this.secondNumber
    ) {
      this.displayValue = "0";
      this.displayValue += ".";
    } else if (!this.displayValue.includes(".")) {
      this.displayValue += ".";
    }
  }

  clearDisplay() {
    this.displayValue = "0";
    this.firstNumber = null;
    this.secondNumber = null;
    this.firstOperator = null;
    this.secondOperator = null;
    this.result = null;
  }

  inputDelete() {
    this.firstNumber = null;
    this.displayValue = "0";
  }

  operate(x, y, operator) {
    return this.methods[operator](x, y);
  }

  roundOutput(num, places) {
    return parseFloat(Math.round(num + "e" + places) + "e-" + places);
  }
}

const calculator = new Calculator();
