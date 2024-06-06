const numberButtons = document.querySelectorAll("[data-number]");
/*Seleciona todos os elementos do DOM que têm o atributo data-number. 
Estes são os botões de números da calculadora.*/

const operationButtons = document.querySelectorAll("[data-operator]");
/*botões de operação (como +, -, *, ÷).*/

const equalsButton = document.querySelector("[data-equals]");
// botão de igual

const deleteButton = document.querySelector("[data-delete]");
//Este é o botão de deletar (para apagar o último dígito)

const allClearButton = document.querySelector("[data-all-clear]");
//botão de limpar tudo (reset da calculadora).

const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
//exibem os operandos anterior e atual na interface da calculadora.

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  /*Define a classe Calculator que encapsula a lógica da calculadora.
  O construtor (constructor) recebe dois elementos DOM para os operandos anterior e atual.
  Os elementos DOM são armazenados como propriedades da instância da calculadora.
  Chama o método clear para inicializar os valores da calculadora. */

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  // Converte o operando atual para string e remove o último caractere usando slice(0, -1).

  calculate() {
    let result;
    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);
    //Converte os operandos anterior e atual para números (parseFloat).

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;
    //Se qualquer um dos operandos não for um número (isNaN), retorna sem fazer nada.

    //Realiza a operação com base no operador armazenado (switch).
    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "÷":
        result = _previousOperand / _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
    //Atualiza o operando atual com o resultado e redefine o operador e o operando anterior.

  }

  chooseOperation(operation) {
    //operation = conteúdo do botão de operação que ele clicar
    if (this.currentOperand === "") return;
    //Se o operando atual estiver vazio, retorna sem fazer nada.


    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    // number = conteúdo do buttton que ta clicando
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    //  guardar os valores
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

// Instância da Calculadora e Adição de Eventos

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
