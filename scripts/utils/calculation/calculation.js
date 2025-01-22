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

// Helper function to evaluate mathematical functions
function evaluateFunction(fn, arg) {
    switch (fn) {
        case 'sin':
            return Math.sin(arg);
        case 'cos':
            return Math.cos(arg);
        case 'tan':
            return Math.tan(arg);
        case 'log':
            return Math.log(arg);  // natural log
        case 'ln':
            return Math.log(arg);  // natural log (same as log)
        case 'sqrt':
            return Math.sqrt(arg); // square root
        default:
            return arg;  // If the function is not recognized, return the argument as is
    }
}

// Main calculation function
export function calculate(expression) {
    let tokens = tokenize(expression);
    console.log("Tokenized Expression: ", tokens);

    let stack = [];
    let outputQueue = [];
    let operators = new Set(['+', '-', '*', '/', '^', '%', '!']);
    let precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3, '%': 2, '!': 4 };
    let functions = new Set(['sin', 'cos', 'tan', 'log', 'ln', 'sqrt']);
    let previousToken = undefined;

    if (!tokens) return "Invalid expression.";

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
            // Apply factorial function to the last number in the outputQueue
            let number = outputQueue.pop(); // Get the number before the factorial
            let result = factorial(number);  // Apply the factorial
            outputQueue.push(result);  // Push the result back into the outputQueue
            console.log(`Applied factorial: ${result} to ${number}`);
        }

        // Handle functions like sin, cos, log
        else if (classifiedToken.type === 'TrigonometricFunction' || classifiedToken.type === 'LogarithmicFunction') {
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

        // Handle root (√)
        else if (classifiedToken.type === 'root') {
            console.log("Root triggered");

            // Pop the number for root calculation (e.g., 25)
            let val = outputQueue.pop();
            
            // Pop the base for the root calculation (e.g., 2)
            let base = outputQueue.pop();
            
            console.log("Base: ", base);
            console.log("Value: ", val);
        
            if (base === 2) {
                let ans = Math.sqrt(val);  // Calculate the square root
                console.log("Square Root Result: " + ans);
                outputQueue.push(ans);  // Push the result back into the queue
            } else {
                console.log("Cube Root or Higher Root Calculation");
                // You can extend this for cube root (base === 3) or other higher roots
                let ans = Math.pow(val, 1 / base);  // Generic nth root calculation
                console.log("Root Result: " + ans);
                outputQueue.push(ans);  // Push the result back into the queue
            }
        }
    });

    // Step 2: Pop any remaining operators from the stack to outputQueue
    while (stack.length) {
        let poppedOperator = stack.pop();
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
                    console.log("Factorial result: ", result);
                    break;
            }
            resultStack.push(result);
            console.log(`Applied operator: ${token} result: ${result}`);
        } else if (functions.has(token)) {
            let arg = resultStack.pop();
            let result = evaluateFunction(token, arg);
            resultStack.push(result);
            console.log(`Applied function: ${token} result: ${result}`);
        }
    });

    console.log("Final Result: ", resultStack[0]);
    return resultStack[0];  // Final result
}
