export function evaluate(tokens) {
    const functions = {
        'sin': Math.sin,
        'cos': Math.cos,
        'tan': Math.tan,
        'log': Math.log10,  // Use base 10 logarithm
        'ln': Math.log,     // Use natural logarithm
        'sqrt': Math.sqrt,
        'abs': Math.abs,
        // Add more mathematical functions here
    };

    const values = [];
    const ops = [];

    let i = 0;
    while (i < tokens.length) {
        const token = tokens[i];

        // If token is a number, push it onto the stack
        if (/\d+(\.\d+)?/.test(token)) {
            values.push(parseFloat(token));
        }
        // Handle operators
        else if (['+', '-', '*', '/', '%'].includes(token)) {
            while (ops.length && precedence(ops[ops.length - 1]) >= precedence(token)) {
                applyOperator(values, ops);
            }
            ops.push(token);
        }
        // Handle functions (trigonometric or mathematical)
        else if (functions[token]) {
            const func = functions[token];
            const arg = values.pop();
            values.push(func(arg));  // Apply the function to the value
        }
        // Handle parentheses
        else if (token === '(') {
            ops.push(token);
        } else if (token === ')') {
            while (ops[ops.length - 1] !== '(') {
                applyOperator(values, ops);
            }
            ops.pop();  // Pop the '('
        }

        i++;
    }

    // Apply any remaining operators
    while (ops.length) {
        applyOperator(values, ops);
    }

    return values[0];
}

// Helper function for applying operators
function applyOperator(values, ops) {
    const operator = ops.pop();
    const right = values.pop();
    const left = values.pop();
    if (operator === '+') values.push(left + right);
    if (operator === '-') values.push(left - right);
    if (operator === '*') values.push(left * right);
    if (operator === '/') values.push(left / right);
    if (operator === '%') values.push(left % right);
}

// Function to determine operator precedence
function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/' || op === '%') return 2;
    return 0;
}
