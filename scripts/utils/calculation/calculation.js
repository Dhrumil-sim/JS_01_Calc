import { tokenize, classifyToken } from "./classification.js";

// Helper function to calculate factorial (n!)
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Track current mode (DEG or RAD)
let currentMode = 'DEG';  // Default is DEG (degree)

// Function to get the current mode
function getCurrentMode() {
    const degButton = document.getElementById('deg-toggle');
    const radButton = document.getElementById('rad-toggle');
    
    if (degButton && degButton.innerHTML === 'DEG') {
        currentMode = 'DEG';
    } else if (radButton && radButton.innerHTML === 'RAD') {
        currentMode = 'RAD';
    }

    return currentMode;
}

// Helper function to convert degrees to radians
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}


function evaluateFunction(fn, arg) {

    const mode = getCurrentMode();
    
    // If in DEG mode, convert the argument to radians for trig functions
    if (mode === 'DEG') {
        arg = degreesToRadians(arg);  // Convert to radians if in DEG mode
    }
    switch (fn) {
        case 'sin':
            return Math.sin(arg);
        case 'cos':
            return Math.cos(arg);
        case 'tan':
            return Math.tan(arg);
        case 'cot':  // Add cotangent function here
            return 1 / Math.tan(arg);  // cot(x) = 1 / tan(x)
        case 'log':
            return Math.log(arg);  // natural log
        case 'ln':
            return Math.log(arg);  // natural log (same as log)
        case 'sqrt':
            return Math.sqrt(arg); // square root
        case 'rand':
            return Math.random(arg); // random number between 0 and 1
        case 'ceil':
            return Math.ceil(arg); // ceiling of a number
        case 'floor':
            return Math.floor(arg); // floor of a number
        default:
            return arg;  // If the function is not recognized, return the argument as is
    }
}

export function calculate(expression) {
    try {
        if (!expression || expression.trim() === '') {
            throw new Error("Empty expression.");
        }

        let tokens = tokenize(expression);
        console.log("Tokenized Expression: ", tokens);

        let stack = [];
        let outputQueue = [];   
        let operators = new Set(['+', '-', '*', '/', '^', '%', '!']);
        let precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3, '%': 2, '!': 4 };
        let functions = new Set(['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'rand', 'ceil', 'floor']);
        let previousToken = undefined;

        if (!tokens) throw new Error("Invalid tokenization.");

        // Step 1: Tokenization and classification
        tokens.forEach(token => {
            const classifiedToken = classifyToken(token, previousToken);
            console.log(`Classified Token: ${classifiedToken.type} => ${classifiedToken.value}`);
            previousToken = token;

            // Handle numbers
            if (classifiedToken.type === 'Number') {
                outputQueue.push(parseFloat(classifiedToken.value));
                console.log(`Pushed number: ${classifiedToken.value} into outputQueue`);
            }

            // Handle operators
            else if (classifiedToken.type === 'Operator') {
                while (
                    stack.length &&
                    operators.has(stack[stack.length - 1]) &&
                    precedence[stack[stack.length - 1]] >= precedence[classifiedToken.value]
                ) {
                    let poppedOperator = stack.pop();
                    outputQueue.push(poppedOperator);
                    console.log(`Popped operator: ${poppedOperator} into outputQueue`);
                }
                stack.push(classifiedToken.value);
                console.log(`Pushed operator: ${classifiedToken.value} into stack`);
            }

            // Handle factorial (i.e., '!')
            else if (classifiedToken.type === 'fact') {
                let number = outputQueue.pop(); // Get the number before the factorial
                let result = factorial(number);  // Apply the factorial
                outputQueue.push(result);  // Push the result back into the outputQueue
                console.log(`Applied factorial: ${result} to ${number}`);
            }

            // Handle functions like sin, cos, log
            else if (classifiedToken.type === 'TrigonometricFunction' || classifiedToken.type === 'LogarithmicFunction' || classifiedToken.type === 'Mathemetic function') {
                stack.push(classifiedToken.value);
                console.log(`Pushed function: ${classifiedToken.value} into stack`);
            }

            // Handle parentheses
            else if (classifiedToken.type === 'Parenthesis') {
                if (classifiedToken.value === '(') {
                    stack.push('(');
                    console.log("Pushed '(' into stack");
                } else {
                    while (stack.length && stack[stack.length - 1] !== '(') {
                        let popped = stack.pop();
                        outputQueue.push(popped);
                        console.log(`Popped operator/function from stack to outputQueue: ${popped}`);
                    }
                    stack.pop();  // Remove the '('
                    console.log("Popped '(' from stack");
                }
            }
            else if (classifiedToken.type === 'root') {
                stack.push(classifiedToken.value);
                console.log("Pushed root operator into stack");
            }
        });

        // Step 2: Pop any remaining operators from the stack to outputQueue
        while (stack.length) {
            let poppedOperator = stack.pop();
            if (poppedOperator === '(') throw new Error("Mismatched parentheses.");
            outputQueue.push(poppedOperator);
            console.log(`Popped remaining operator: ${poppedOperator} into outputQueue`);
        }

        console.log("Output Queue after processing all tokens: ", outputQueue);

        // Step 3: Evaluate the expression from the outputQueue
        let resultStack = [];
        outputQueue.forEach(token => {
            console.log(`Processing token: ${token}`);

            if (typeof token === 'number') {
                resultStack.push(token);
                console.log(`Pushed number: ${token} into resultStack`);
            } else if (operators.has(token)) {
                let b = resultStack.pop();
                let a = resultStack.pop();
                let result;
                switch (token) {
                    case '+':
                        result = a + b;
                        break;
                    case '-':
                        result = a - b;
                        break;
                    case '*':
                        result = a * b;
                        break;
                    case '/':
                        if (b === 0) throw new Error("Division by zero.");
                        result = a / b;
                        break;
                    case '^':
                        result = Math.pow(a, b);
                        break;
                    case '%':
                        result = a % b;
                        break;
                    case '!':
                        result = factorial(a);  // Apply factorial on the number a
                        break;
                }
                resultStack.push(result);
                console.log(`Applied operator: ${token} result: ${result}`);
            } else if (functions.has(token)) {
                let arg = resultStack.pop();
                if (isNaN(arg)) throw new Error(`Invalid argument for function: ${token}`);
                let result = evaluateFunction(token, arg);
                resultStack.push(result);
                console.log(`Applied function: ${token} result: ${result}`);
            }
            else if (token === '√') {
                let val = resultStack.pop();  // Pop the value (e.g., 25)
                if (val < 0) throw new Error("Cannot take the square root of a negative number.");
                let ans = Math.sqrt(val);  // Calculate the square root
                resultStack.push(ans);  // Add the result
                console.log("Square Root Result: " + ans);
            }
        });

        // Ensure there's only one result left in the stack
        if (resultStack.length !== 1) throw new Error("Invalid expression result.");

        console.log("Final Result: ", resultStack[0]);
        return resultStack[0];  // Final result
    } catch (error) {
        console.error("Error: ", error.message);
        return `Error: ${error.message}`;
    }
}
