let toDisplay = document.getElementById("display-num")

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
keyZero.addEventListener("click", () => display.addToDisplay(0));
keyOne.addEventListener("click", () => display.addToDisplay(1));
keyTwo.addEventListener("click", () => display.addToDisplay(2));
keyThree.addEventListener("click", () => display.addToDisplay(3));
keyFour.addEventListener("click", () => display.addToDisplay(4));
keyFive.addEventListener("click", () => display.addToDisplay(5));
keySix.addEventListener("click", () => display.addToDisplay(6));
keySeven.addEventListener("click", () => display.addToDisplay(7));
keyEight.addEventListener("click", () => display.addToDisplay(8));
keyNine.addEventListener("click", () => display.addToDisplay(9));
keyDot.addEventListener("click", () => display.addToDisplay("."));

// define eventListener - for removing number
keyBackspace.addEventListener("click", () => utility.deleteNumber(display.currentNumberArr));
// keyClear.addEventListener("click", () => clearNumber());
// keyAllClear.addEventListener("click", () => clearAllNumber());
keyPlus.addEventListener("click", () => pressOperation(keyPlus));
keyMulti.addEventListener("click", () => pressOperation(keyMulti));
keyEqual.addEventListener("click", () => pressEqual());

// Define operation object
const operator = {

    plus: false,
    minus: false,
    multiply: false,
    divide: false,
    isHolding: false,

    resetOperation: function() {
        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== "function" && key !== "isHolding") {
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

// Define display object
const display = {

    currentNumberArr: [],
    currentNumber: "",
    
    addToDisplay: function(val) {
    // Check max length
    if (this.currentNumberArr.length === 11) {
        return
    }

    if (memory.isComplete === true) {
        this.currentNumberArr = [];
        this.currentNumber = "";
        memory.isComplete = false;
    }

    if (val === ".") {
        if (!this.currentNumberArr.includes(".")) {
            this.currentNumberArr.push(val);
        }
    } else {
        this.currentNumberArr.push(val);
    }
    this.currentNumber = this.currentNumberArr.join("");
    toDisplay.innerHTML = this.currentNumber;
    },

    checkDisplayZero: function() {
        if (this.currentNumberArr.length > 0) {
            this.currentNumber = this.currentNumberArr.join("");
        } else {
            this.currentNumber = "0";
        }
        toDisplay.innerHTML = this.currentNumber;
    },
};


// Define memory object
const memory = {
    _num1: 0,
    _num2: 0,
    _prevNum1: 0,
    _prevNum2: 0,
    prevOperation: keyPlus,
    isComplete: false,

    // Getters ans Setters
    get num1() {
        return this._num1;
    },

    set num1(val) {
        this._num1 = Number(val);
    },

    get num2() {
        return this._num2;
    },

    set num2(val) {
        this._num2 = Number(val);
    },
    
    saveToMemory: function(number) {
        if (operator.isHolding === true) {
            this.num2 = number;
        } else {
            this.num1 = number;
        }
    }
};

// Define utility keys
const utility = {

    deleteNumber: function(arr) {
        if (arr.length > 0) {
            arr.pop();
        }
        display.checkDisplayZero();
    },
    
    // clearNumber: funciton() {
    //     displayNumber = [];
    //     toDisplay.innerHTML = "0";
    // },
    
    // const clearAllNumber = () => {
    //     clearNumber();
    //     num1 = 0;
    //     num2 = 0;
    //     numberHolder1 = 0;
    //     numberHolder2 = 0;
    // }
};


// Math operations
const pressOperation = (key) => {

    if (memory.isComplete === false) {
        memory.prevOperation.classList.remove("button--pressed");
    }
    memory.num1 = display.currentNumber;
    operator.isHolding = true;
    memory.isComplete = false;
    memory.prevOperation = key;
    key.classList.add("button--pressed");
    operator.setOperation(key)
    display.currentNumberArr = [];
    display.currentNumber = "";
};

const pressEqual = () => {
    memory.saveToMemory(display.currentNumber);
    operator.isHolding = false;
    memory.isComplete = true;
    memory.prevOperation.classList.remove("button--pressed");

    let answer = operator.runOperation(memory.num1, memory.num2);
    answer = operator.roundOff(answer);
    display.currentNumber = String(answer);
    toDisplay.innerHTML = display.currentNumber;

    memory.num1 = answer;
    }
