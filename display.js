let displayNumber = [];
let operationHolder = [];
let toDisplay = document.getElementById("display-num")
let num1 = 0;
let num2 = 0;
let numberHolder1 = 0;
let numberHolder2 = 0;
let currentOperation;
let displayHolder = [];

// Define all clickable keys - Number
let keyZero = document.getElementById("zero");
let keyOne = document.getElementById("one");
let keyTwo = document.getElementById("two");
let keyThree = document.getElementById("three");
let keyFour = document.getElementById("four");
let keyFive = document.getElementById("five");
let keySix = document.getElementById("six");
let keySeven = document.getElementById("seven");
let keyEight = document.getElementById("eight");
let keyNine = document.getElementById("nine");

// define all clickable keys - Operation
let keyPlus = document.getElementById("plus");
let keyMinus = document.getElementById("minus");
let keyMulti = document.getElementById("multiply");
let keyDivide = document.getElementById("divide");
let keySqrt = document.getElementById("sqrt");
let keyPower = document.getElementById("power");
let keyPercent = document.getElementById("percent");

// define all clickable keys - Utility
let keyDot = document.getElementById("dot");
let keyEqual = document.getElementById("equal");
let keyBackspace = document.getElementById("backspace");
let keyClear = document.getElementById("clear");
let keyAllClear = document.getElementById("allClear");

// Define eventListener - for adding number
keyZero.addEventListener("click", () => addToDisplay(displayNumber, 0));
keyOne.addEventListener("click", () => addToDisplay(displayNumber, 1));
keyTwo.addEventListener("click", () => addToDisplay(displayNumber, 2));
keyThree.addEventListener("click", () => addToDisplay(displayNumber, 3));
keyFour.addEventListener("click", () => addToDisplay(displayNumber, 4));
keyFive.addEventListener("click", () => addToDisplay(displayNumber, 5));
keySix.addEventListener("click", () => addToDisplay(displayNumber, 6));
keySeven.addEventListener("click", () => addToDisplay(displayNumber, 7));
keyEight.addEventListener("click", () => addToDisplay(displayNumber, 8));
keyNine.addEventListener("click", () => addToDisplay(displayNumber, 9));
keyDot.addEventListener("click", () => addToDisplay(displayNumber, "."));

// define eventListener - for removing number
keyBackspace.addEventListener("click", () => deleteNumber(displayNumber));
keyClear.addEventListener("click", () => clearNumber());
keyAllClear.addEventListener("click", () => clearAllNumber());
keyPlus.addEventListener("click", () => pressOperation(keyPlus));
keyMulti.addEventListener("click", () => pressOperation(keyMulti));
keyEqual.addEventListener("click", () => pressEqual());

// Define operation object
const operator = {

    plus: false,
    minus: false,
    multiply: false,
    divide: false,

    resetOperation: function() {
        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== "function") {
                this[`${key}`] = false;
            }
        }
    },

    setOperation: function(operator) {
        this.resetOperation();
        switch (true) {
            case operator === keyPlus:
                this.plus = true;
            case operator === keyMulti:
                this.multiply = true;
        }
    },

    checkOperation: function() {
        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== "function") {
                if (this[key]) {
                    return true;
                }
            }
        }
        return false;
    },
    
    plusOperation: function(num1, num2) {
        return num1 + num2;
    },

    multiplyOperation: function(num1, num2) {
        return num1 * num2;
    },

    runOperation: function(num1, num2) {
        switch (true) {
            case this.plus :
                return this.plusOperation(num1, num2);
            case this.multiply:
                return this.multiplyOperation(num1, num2);
        }
    },

    roundOff: function(num) {
        return Math.round(num * 100) /100;
    }
};

// Display functions
const addToDisplay  = (arr, val) => {

    // Check max length
    if (arr.length === 11) {
        return
    }

    if (val === ".") {
        if (!arr.includes(".")) {
            arr.push(val);
        }
    } else {
        arr.push(val);
    }
    toDisplay.innerHTML = arr.join("");
};

const deleteNumber = (arr) => {
    if (arr.length > 0) {
        arr.pop();
    }
    checkDisplayZero(arr);
}

const checkDisplayZero = (arr) => {
    if (arr.length > 0) {
        toDisplay.innerHTML = displayNumber.join("");
    } else {
        toDisplay.innerHTML = "0";
    }
}

const clearNumber = () => {
    displayNumber = [];
    toDisplay.innerHTML = "0";
}

const clearAllNumber = () => {
    clearNumber();
    num1 = 0;
    num2 = 0;
    numberHolder1 = 0;
    numberHolder2 = 0;
}

// Math operations
const pressOperation = (key) => {

    // Check chain
    if (Number(toDisplay.innerHTML) !== Number(displayHolder[0])) {
        num1 = Number(displayNumber.join(""));
    } else {
        num1 = numberHolder1;
    }

    displayNumber = [];
    operationHolder = [];
    currentOperation = key;
    operator.setOperation(key)
    key.classList.add("button--pressed");
};

const pressEqual = () => {

    currentOperation.classList.remove("button--pressed");

    if (operationHolder.length !== 0) {
        operator.setOperation(operationHolder[0]);
        num2 = numberHolder2;
        num1 = numberHolder1;
        } else {
            num2 = Number(displayNumber.join(""));
            numberHolder2 = num2;
        }

        let answer = operator.runOperation(num1, num2);
        answer = operator.roundOff(answer);
        toDisplay.innerHTML = answer;

        numberHolder1 = answer;
        operator.resetOperation();
        operationHolder = [currentOperation];
        displayHolder = [answer];
        displayNumber = [];
    }



// const convertToScientific = (string) => {

// }