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
keyZero.addEventListener("click", () => display.addToDisplay("0"));
keyOne.addEventListener("click", () => display.addToDisplay("1"));
keyTwo.addEventListener("click", () => display.addToDisplay("2"));
keyThree.addEventListener("click", () => display.addToDisplay("3"));
keyFour.addEventListener("click", () => display.addToDisplay("4"));
keyFive.addEventListener("click", () => display.addToDisplay("5"));
keySix.addEventListener("click", () => display.addToDisplay("6"));
keySeven.addEventListener("click", () => display.addToDisplay("7"));
keyEight.addEventListener("click", () => display.addToDisplay("8"));
keyNine.addEventListener("click", () => display.addToDisplay("9"));
keyDot.addEventListener("click", () => display.addToDisplay("."));

// define eventListener - for removing number
keyBackspace.addEventListener("click", () => utilityKey.deleteNumber(display.currentNumberArr));
keyClear.addEventListener("click", () => utilityKey.clearNumber());
keyAllClear.addEventListener("click", () => utilityKey.clearAllNumber());
keyPlus.addEventListener("click", () => pressOperation(keyPlus));
keyMinus.addEventListener("click", () => pressOperation(keyMinus));
keyMulti.addEventListener("click", () => pressOperation(keyMulti));
keyDivide.addEventListener("click", () => pressOperation(keyDivide));
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
            case operator === keyMinus:
                this.minus = true;
            case operator === keyDivide:
                this.divide = true;
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

    subtractOperation: function(num1, num2) {
        return num1 - num2;
    },

    multiplyOperation: function(num1, num2) {
        return num1 * num2;
    },

    divisionOperation: function(num1, num2) {
        if (num2 !== 0) {
            return num1 / num2;
        } else {
            return "0 Division"
        }
    },

    runOperation: function(num1, num2) {
        switch (true) {
            case this.plus :
                return this.plusOperation(num1, num2);
            case this.multiply:
                return this.multiplyOperation(num1, num2);
            case this.minus:
                return this.subtractOperation(num1, num2);
            case this.divide:
                return this.divisionOperation(num1, num2);
        }
    },

    roundOff: function(num) {
        if (typeof num === "number") {
            return Math.round(num * 100) /100;
        } else {
            return num;
        }
    }
};

// Define display object
const display = {

    currentNumberArr: [],
    currentNumber: "",
    
    addToDisplay: function(val) {
        
        if (this.currentNumberArr.length === 11) {
            return
        }

        if (memory.isComplete === true) {
            if (utilityKey.isDeleting === false) {
                this.currentNumberArr = [];
                this.currentNumber = "";
            }
        }

        if (val === ".") {
            if (!this.currentNumberArr.includes(".")) {
                this.currentNumberArr.push(val);
            }
        } else {
            this.currentNumberArr.push(val);
        }
        memory.isComplete = false;
        utilityKey.isDeleting = false;
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

    updateNumberArr: function() {
        this.currentNumberArr = [];
        for (let char of this.currentNumber) {
            this.currentNumberArr.push(char);
        }
    }
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
const utilityKey = {

    isDeleting: false,

    deleteNumber: function(arr) {
        this.isDeleting = true;
        if (arr.length > 0) {
            arr.pop();
        }
        display.checkDisplayZero();
    },
    
    clearNumber: function() {
        display.currentNumberArr = [];
        display.currentNumber = "";
        toDisplay.innerHTML = "0";
    },
    
    clearAllNumber: function() {
        this.clearNumber();
        memory.num1 = 0;
        memory.num2 = 0;
        memory.prevOperation.classList.remove("button--pressed");
        operator.resetOperation();
        operator.isHolding = false;
        memory.isComplete = false;
        utilityKey.isDeleting = false;
    },

    checkAnswer: function(answer) {
        if (typeof answer === "number") {
            let checkedAns = utilities.checkNumberLength(answer);
            
            display.currentNumber = String(checkedAns);
            display.updateNumberArr();
            memory.num1 = checkedAns;
            return String(checkedAns)
        } else {
            memory.num1 = 0;
            display.currentNumber = "0";
            display.currentNumberArr = [];
            return answer;
        }
    }
};

// Define utility functions
const utilities = {
    /**
     * The function defines the number decimal of the number
     * @param {Number} num 
     * @returns {Number} - the number of decimal, or 0 if no decimal 
     */
    calDecimal: function(num) {
        let numberStr = String(num);
        let decimalIndex = numberStr.indexOf(".");
        if (decimalIndex === -1) {
            return 0;
        } else {
            return numberStr.length - (decimalIndex + 1);
        }
    },

    getMaxDecimal: function(num1, num2) {
        let num1Decimal = this.calDecimal(num1);
        let num2Decimal = this.calDecimal(num2);
        if (num1Decimal >= num2Decimal) {
            return num1Decimal;
        } else {
            return num2Decimal;
        }
    },

    // Return String
    roundDecimal: function(num) {
    
        let maxMemoryDecimal = this.getMaxDecimal(memory.num1, memory.num2)
        let numDecimal = this.calDecimal(num);

        let maxDecimal = 0;
        if (maxMemoryDecimal >= numDecimal) {
            maxDecimal = maxMemoryDecimal;
        } else {
            maxDecimal = numDecimal;
        }
        console.log(maxDecimal);
        if (maxDecimal > 9) {
            return Number(num.toFixed(9));
        } else {
            return Number(num.toFixed(maxDecimal));
        }
    },

    checkNumberLength: function(num) {
        if (String(num).length <= 11) {
            return num;
        } else if (this.calDecimal(num) > 11) {
            let roundNum =  this.roundDecimal(num);
            // console.log(roundNum)
            if (roundNum.length > 11) {
                // scientific
                console.log("here");
                return roundNum;
                
            } else {
                return roundNum;
            }
        }
    },

    toScientific: function(num) {
        // to implement
    }
};

// Math operations
/**
 * The function sets the math operation to the user input key
 * It saves the displaying number to the num1 in memory.
 * @param {Element} key 
 */
const pressOperation = (key) => {
    
    if (memory.isComplete === false) {
        memory.prevOperation.classList.remove("button--pressed");
    }
    utilityKey.isDeleting = false;
    memory.num1 = display.currentNumber;
    operator.isHolding = true;
    memory.isComplete = false;
    memory.prevOperation = key;
    key.classList.add("button--pressed");
    operator.setOperation(key)
    display.currentNumberArr = [];
};

const pressEqual = () => {

    if (operator.isHolding === false && memory.isComplete === false) {
        return;
    }
    utilityKey.isDeleting = false;
    memory.saveToMemory(display.currentNumber);
    operator.isHolding = false;
    memory.isComplete = true;
    memory.prevOperation.classList.remove("button--pressed");
    
    let answer = operator.runOperation(memory.num1, memory.num2);
    // Check if the answer is not an error and check decimal
    toDisplay.innerHTML = utilityKey.checkAnswer(answer);
    }
