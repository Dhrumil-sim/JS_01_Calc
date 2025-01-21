// Function to tokenize the input expression
function tokenize(expression) {
    // Match numbers, operators, functions, constants, and absolute value symbol '|'
    const regex = /\d+(\.\d*)?|\+|\-|\*|\/|\^|\(|\)|%|sqrt|abs|sin|cos|tan|log|ln|e|pi|rand|\||!/g;
    return expression.match(regex);
}
// Function to evaluate expressions inside parentheses
function evaluateParentheses(tokens) {
    let stack = [];
    let resultTokens = [];

    for (let token of tokens) {
        if (token === '(') {
            stack.push(resultTokens);
            resultTokens = [];
        } else if (token === ')') {
            let subResult = evaluateTokens(resultTokens);
            resultTokens = stack.pop();
            resultTokens.push(subResult);
        } else {
            resultTokens.push(token);
        }
    
    }
    

    return resultTokens;
}

// Evaluate the tokens (handle exponentiation, multiplication/division, and addition/subtraction)
function evaluateTokens(tokens) {
    tokens = processExponentiation(tokens);
    tokens = processMultiplicationDivision(tokens);
    tokens = processAdditionSubtraction(tokens);
    return tokens[0]; // Return the final result after all operations
}

// Process exponentiation
function processExponentiation(tokens) {
    let i = 0;
    while (i < tokens.length) {
        if (tokens[i] === '^') {
            let base = parseFloat(tokens[i - 1]);
            let exponent = parseFloat(tokens[i + 1]);
            tokens.splice(i - 1, 3, Math.pow(base, exponent)); // Replace exponentiation with result
            i--;
        }
        i++;
    }
    return tokens;
}

// Process multiplication, division, and modulus
function processMultiplicationDivision(tokens) {
    let i = 0;
    while (i < tokens.length) {
        if (tokens[i] === '*' || tokens[i] === '/' || tokens[i] === '%') {
            let left = parseFloat(tokens[i - 1]);
            let right = parseFloat(tokens[i + 1]);
            if (tokens[i] === '/' && right === 0) {
                throw new Error('Error: Division by Zero');
            }
            let result;
            switch (tokens[i]) {
                case '*': result = left * right; break;
                case '/': result = left / right; break;
                case '%': result = left % right; break;
            }
            tokens.splice(i - 1, 3, result); // Replace operator with result
            i--;
        }
        i++;
    }
    return tokens;
}

// Process addition and subtraction
function processAdditionSubtraction(tokens) {
    let i = 0;
    while (i < tokens.length) {
        if (tokens[i] === '+' || tokens[i] === '-') {
            let left = parseFloat(tokens[i - 1]);
            let right = parseFloat(tokens[i + 1]);
            let result;
            switch (tokens[i]) {
                case '+': result = left + right; break;
                case '-': result = left - right; break;
            }
            tokens.splice(i - 1, 3, result); // Replace operator with result
            i--;
        }
        i++;
    }
    return tokens;
}



// Process functions (e.g., sqrt, abs, sin, cos, log, ln)
function processFunctions(tokens) {
    let i = 0;
    while (i < tokens.length) {
        let token = tokens[i];
        if (token === 'rand' || token === 'ceil' || token === 'floor') {
            let maxValue = parseFloat(tokens[i + 1]); // Get the value passed to rand/ceil/floor
            
            if (isNaN(maxValue)) {
                throw new Error('Error: Invalid argument for ' + token);
            }
            console.log(tokens);
            let result;
            if (token === 'rand') {
                // Random number between 0 and maxValue (not inclusive)
                result = Math.floor(Math.random() * maxValue);
            } else if (token === 'ceil') {
                // Random number between 0 and maxValue (inclusive) and then apply ceil
                result = Math.ceil(maxValue);
            } else if (token === 'floor') {
                console.log("its triggered")
                // Random number between 0 and maxValue (inclusive) and then apply floor
                result = Math.floor(maxValue);
            }
            
            tokens.splice(i, 2, result); // Replace rand/ceil/floor with the result
        }
        
        else if (token === 'sqrt' || token === 'abs' || token === 'sin' || token === 'cos' || token === 'log' || token === 'ln') {
            let value = parseFloat(tokens[i + 1]);
            if (isNaN(value)) {
                throw new Error('Error: Invalid argument for function ' + token);
            }
            let result;
            switch (token) {
                case 'sqrt': result = Math.sqrt(value); break;
                case 'abs': result = Math.abs(value); break;
                case 'sin': result = Math.sin(value); break;
                case 'cos': result = Math.cos(value); break;
                case 'log': result = Math.log10(value); break;
                case 'ln': result = Math.log(value); break;
            }
            tokens.splice(i, 2, result); // Replace function with result
            i--;
        }
        i++;
    }
    return tokens;
}


// Handle constants (e.g., pi, e)
function handleConstants(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === 'pi') {
            tokens[i] = Math.PI;
        }
        if (tokens[i] === 'e') {
            tokens[i] = Math.E;
        }
    }
    return tokens;
}

// Process factorials (n!)
function processFactorials(tokens) {
    let i = 0;
    while (i < tokens.length) {
        if (tokens[i] === '!') {
            let value = parseFloat(tokens[i - 1]);
            tokens.splice(i - 1, 2, factorial(value)); // Replace factorial with result
            i--;
        }
        i++;
    }
    return tokens;
}

// Calculate the factorial of a number
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Main function to process calculation
export function processCalculation(expression) {
    // Step 1: Check for empty input
    if (!expression.trim()) {
        return 'Error: Empty input';
    }

    try {
        // Step 2: Tokenize the input
        let tokens = tokenize(expression);
        console.log("Tokens after tokenization:", tokens);

        // Step 3: Handle parentheses
        tokens = evaluateParentheses(tokens);

        // Step 4: Handle constants (e.g., pi, e)
        tokens = handleConstants(tokens);

        // Step 5: Process functions (e.g., sqrt, sin)
        tokens = processFunctions(tokens);

        // Step 6: Process factorials
        tokens = processFactorials(tokens);

       

        // Step 8: Evaluate the remaining operations
        let result = evaluateTokens(tokens);

        // Return the final result
        return result;
    } catch (error) {
        // Catch any errors and return the error message
        return `Error: ${error.message}`;
    }
}