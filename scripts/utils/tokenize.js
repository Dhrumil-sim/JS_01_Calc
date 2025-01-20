export function tokenize(expression, trigFunction, mathFunction) {
    const tokens = [];
    let currentToken = '';

    // Iterate over each character in the expression
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        // Handle numbers or decimals
        if (/\d|\./.test(char)) {
            currentToken += char;
        } else {
            if (currentToken) {
                tokens.push(currentToken);
                currentToken = '';
            }

             // Handle trigonometric functions (e.g., sin, cos)
             if (char === trigFunction.charAt(0) && expression.slice(i, i + trigFunction.length) === trigFunction) {
                tokens.push(trigFunction);  // Push the selected trig function (e.g., 'sin', 'cos')
                i += trigFunction.length - 1;  // Skip over the length of the trig function
            }

            // Handle mathematical functions (e.g., log, ln)
            else if (char === mathFunction.charAt(0) && expression.slice(i, i + mathFunction.length) === mathFunction) {
                tokens.push(mathFunction);  // Push the selected math function (e.g., 'log', 'ln')
                i += mathFunction.length - 1;  // Skip over the length of the math function
            }
            // Handle other operators and parentheses
            else if (['+', '-', '*', '/', '(', ')'].includes(char)) {
                tokens.push(char); // Operators and parentheses
            }
        }
    }

    if (currentToken) {
        tokens.push(currentToken);
    }

    return tokens;
}
