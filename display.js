let displayNumber = [];
let operationHolder = [];
let toDisplay = document.getElementById("display-num")
let num1 = 0;
let num2 = 0;

// Define all clickable keys - Number
let key_zero = document.getElementById("zero");
let key_one = document.getElementById("one");
let key_two = document.getElementById("two");
let key_three = document.getElementById("three");
let key_four = document.getElementById("four");
let key_five = document.getElementById("five");
let key_six = document.getElementById("six");
let key_seven = document.getElementById("seven");
let key_eight = document.getElementById("eight");
let key_nine = document.getElementById("nine");

// define all clickable keys - Operation
let key_plus = document.getElementById("plus");
let key_minus = document.getElementById("minus");
let key_multi = document.getElementById("multiply");
let key_divide = document.getElementById("divide");
let key_sqrt = document.getElementById("sqrt");
let key_power = document.getElementById("power");
let key_percent = document.getElementById("percent");

// define all clickable keys - Utility
let key_dot = document.getElementById("dot");
let key_equal = document.getElementById("equal");
let key_backspace = document.getElementById("backspace");
let key_clear = document.getElementById("clear");
let key_allClear = document.getElementById("allClear");

// Define eventListener - for adding number
key_zero.addEventListener("click", () => addToDisplay(displayNumber, 0));
key_one.addEventListener("click", () => addToDisplay(displayNumber, 1));
key_two.addEventListener("click", () => addToDisplay(displayNumber, 2));
key_three.addEventListener("click", () => addToDisplay(displayNumber, 3));
key_four.addEventListener("click", () => addToDisplay(displayNumber, 4));
key_five.addEventListener("click", () => addToDisplay(displayNumber, 5));
key_six.addEventListener("click", () => addToDisplay(displayNumber, 6));
key_seven.addEventListener("click", () => addToDisplay(displayNumber, 7));
key_eight.addEventListener("click", () => addToDisplay(displayNumber, 8));
key_nine.addEventListener("click", () => addToDisplay(displayNumber, 9));
key_dot.addEventListener("click", () => addToDisplay(displayNumber, "."));

// define eventListener - for removing number
key_backspace.addEventListener("click", () => deleteNumber(displayNumber));
key_clear.addEventListener("click", () => clearNumber());
key_allClear.addEventListener("click", () => clearNumber());
key_plus.addEventListener("click", () => pressAdd());

key_equal.addEventListener("click", () => pressEqual());

// Define operation object
const operator = {

    plus: false,
    minus: false,
    multiply: false,
    divide: false,

    resetOperation: function() {
        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== "function") {
                this[key] = false;
            }
        }
    },

    setOperation: function(operation) {
        if (this.hasOwnProperty(operation)) {
            this.resetOperation();
            this[operation] = true;
        }
    },

    checkOperation: function() {
        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== "function") {
                if (this[key]=true) {
                    return true;
                }
            }
        }
        return false;
    },
    
    plusOperation: function(num1, num2) {
        return num1 + num2;
    },

    runOperation: function(num1, num2) {
        switch (true) {
            case this.plus :
                console.log("Its add!")
                return this.plusOperation(num1, num2);
        }
    },
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

const resetStyle = (key) => {
    key.style.border = "0.1px solid rgba(46, 70, 98, 0.50)";
    key.style.color = "#2E4662";
    key.style.boxShadow = "3px 5px 4px rgba(0, 0, 0, 0.25), inset -6px -2px 6px rgba(46, 70, 98, 0.70), inset 1px -2px 4px rgba(46, 70, 98, 0.25), inset 3px 4px 4px rgba(46, 70, 98, 0.25)";
};

// Math operations
const pressAdd = () => {
    num1 = Number(displayNumber.join(""));
    displayNumber = [];
    operationHolder.push(key_plus);
    key_plus.style.border = "2.5px solid #FFFFFF";
    key_plus.style.color = "#FFFFFF";
    key_plus.style.boxShadow = "3px 5px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 0px rgba(46, 70, 98, 0.70), inset -1px -2px 4px rgba(46, 70, 98, 0.25), inset 1px -2px 4px rgba(46, 70, 98, 0.10)"
}

const pressEqual = () => {
    if (operator.checkOperation()) {

        if (operationHolder.length !== 0) {
            resetStyle(operationHolder[0]);
        }

        let answer = 0;
        num2 = Number(displayNumber.join(""));
        answer = operator.runOperation(num1, num2);
        toDisplay.innerHTML = answer.toString();
        displayNumber = [];
        operationHolder = [];
    }
};


// const convertToScientific = (string) => {

// }