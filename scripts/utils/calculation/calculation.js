import { tokenize, classifyToken } from "./classification.js";
import { storeHistory } from "../history_store.js";
// Helper function to calculate factorial (n!)
function factorial(n) {
    if (n === 0 || n === 1)
        return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
function log(n) {
    if (n <= 0)
        throw new Error("Logarithm undefined for non-positive values.");
    return Math.log10(n); // Logarithm base 10
}
// Track current mode (DEG or RAD)
let currentMode = "DEG"; // Default is DEG (degree)
// Function to get the current mode
function getCurrentMode() {
    const degButton = document.getElementById("deg-toggle");
    const radButton = document.getElementById("rad-toggle");
    if (degButton && degButton.innerHTML === "DEG") {
        currentMode = "DEG";
    }
    else if (radButton && radButton.innerHTML === "RAD") {
        currentMode = "RAD";
    }
    return currentMode;
}
// Helper function to convert degrees to radians
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
function evaluateFunction(fn, arg) {
    const mode = getCurrentMode();
    if (mode === "DEG") {
        arg = degreesToRadians(arg);
    }
    switch (fn) {
        case "sin": return Math.sin(arg);
        case "cos": return Math.cos(arg);
        case "tan": return Math.tan(arg);
        case "sec": return 1 / Math.cos(arg);
        case "cot": return 1 / Math.tan(arg);
        case "ln": return Math.log(arg);
        case "sqrt": return Math.sqrt(arg);
        case "rand": return Math.random();
        case "ceil": return Math.ceil(arg);
        case "floor": return Math.floor(arg);
        default: throw new Error(`Unknown function: ${fn}`);
    }
}
export function calculate(expression) {
    try {
        if (!expression.trim())
            throw new Error("Empty expression.");
        let tokens = tokenize(expression);
        if (!tokens)
            throw new Error("Invalid tokenization.");
        let stack = [];
        let outputQueue = [];
        let resultStack = [];
        const operators = new Set(["+", "-", "*", "/", "^", "%", "!"]);
        const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3, "%": 2, "!": 4 };
        const functions = new Set(["sin", "cos", "tan", "sqrt", "rand", "ceil", "floor", "log", "ln"]);
        let previousToken = undefined;
        tokens.forEach(token => {
            const classifiedToken = classifyToken(token, previousToken);
            previousToken = token;
            if (classifiedToken.type === "Number") {
                outputQueue.push(parseFloat(classifiedToken.value));
            }
            else if (classifiedToken.type === "Operator") {
                while (stack.length && operators.has(stack[stack.length - 1]) &&
                    precedence[stack[stack.length - 1]] >= precedence[classifiedToken.value]) {
                    outputQueue.push(stack.pop());
                }
                stack.push(classifiedToken.value);
            }
            else if (classifiedToken.type === "Factorial") {
                let number = outputQueue.pop();
                outputQueue.push(factorial(number));
            }
            else if (classifiedToken.type === "Log" || classifiedToken.type === "Ln") {
                stack.push(classifiedToken.value);
            }
            else if (classifiedToken.type === "TrigonometricFunction" || classifiedToken.type === "MathFunction") {
                stack.push(classifiedToken.value);
            }
            else if (classifiedToken.type === "Parenthesis") {
                if (classifiedToken.value === "(") {
                    stack.push("(");
                }
                else {
                    while (stack.length && stack[stack.length - 1] !== "(") {
                        outputQueue.push(stack.pop());
                    }
                    stack.pop(); // Pop the '('
                }
            }
            else if (classifiedToken.type === "Root") {
                stack.push(classifiedToken.value);
            }
        });
        while (stack.length) {
            let poppedOperator = stack.pop();
            if (poppedOperator === "(")
                throw new Error("Mismatched parentheses.");
            outputQueue.push(poppedOperator);
        }
        outputQueue.forEach(token => {
            if (typeof token === "number") {
                resultStack.push(token);
            }
            else if (operators.has(token)) {
                let b = resultStack.pop();
                let a = resultStack.pop();
                switch (token) {
                    case "+":
                        resultStack.push(a + b);
                        break;
                    case "-":
                        resultStack.push(a - b);
                        break;
                    case "*":
                        resultStack.push(a * b);
                        break;
                    case "/":
                        if (b === 0)
                            throw new Error("Division by zero.");
                        resultStack.push(a / b);
                        break;
                    case "^":
                        resultStack.push(Math.pow(a, b));
                        break;
                    case "%":
                        resultStack.push(a % b);
                        break;
                    case "!":
                        resultStack.push(factorial(a));
                        break;
                }
            }
            else if (functions.has(token)) {
                let arg = resultStack.pop();
                resultStack.push(evaluateFunction(token, arg));
            }
            else if (token === "√") {
                let val = resultStack.pop();
                if (val < 0)
                    throw new Error("Cannot take the square root of a negative number.");
                resultStack.push(Math.sqrt(val));
            }
        });
        if (resultStack.length !== 1)
            throw new Error("Invalid expression result.");
        const finalResult = resultStack[0]; // This ensures finalResult is initialized after processing
        storeHistory(new Date(), expression, finalResult.toString()); // Make sure to store the result as a string
        return finalResult;
    }
    catch (error) {
        console.error("Error: ", error.message);
        return `Error: ${error.message}`;
    }
}
