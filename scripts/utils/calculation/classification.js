
const outputField = document.getElementById('output-field');
// Tokenizer: Splitting the expression into tokens
export function tokenize(expression) {
    // Regex to match numbers, operators, variables, and parentheses
    const regex = /\d+(\.\d+)?|[a-zA-Z]+|[+\-*/^()|]|[^a-zA-Z0-9\s]|\b(cos|sin|tan|sec|csc|cot)\b/g;
    return expression.match(regex);
}

// Function to classify each token
export function classifyToken(token, previousToken) {
    // If the token is a number
    if (/\d+(\.\d+)?/.test(token)) {
        return { type: 'Number', value: token };
    }
   
    const trigFunctions = ['sin', 'cos', 'tan', 'cot', 'sec', 'csc'];
    if (trigFunctions.includes(token)) {
        return { type: 'TrigonometricFunction', value: token };
    }
    // If the token is an operator
    else if (['+', '-', '*', '/', '^','%'].includes(token)) {
        return { type: 'Operator', value: token };
    }
    // If the token is a parenthesis or absolute value markers
    else if (['(', ')'].includes(token)) {
        return { type: 'Parenthesis', value: token };
    }
    else if (token === '|') {
        if (previousToken === '|' || previousToken === undefined || previousToken === '(' || ['+', '-', '*', '/', '^', '%'].includes(previousToken)) {
            return { type: 'ModulusOpen', value: token };  // Opening modulus
        } else {
            return { type: 'ModulusClose', value: token }; // Closing modulus
        }
    }
    else if(['√'].includes(token))
    {
        return {type: 'root', value:token};
    }
    else if('!'.includes(token))
    {
        return {type: 'fact', value:token};
    }
    else if('log'.includes(token))
    {
         return {type: 'log', value: token};
    }
    else if('ln'.includes(token))
    {
        return {type: 'ln',value:token};
    }
    else if(['rand','ceil','floor','abs'].includes(token))
    {
         return {type: 'Mathemetic function',value: token};
    }
    else {
        // If the token is not recognized, throw an error
        throw new Error(`Unknown token: ${token}`);
    }
}

export function processExpression(expression) {
    let tokens = tokenize(expression);
    console.log(tokens);
    let previousToken = undefined;

    if (tokens) {
        try {
            tokens.forEach(token => {
                const classifiedToken = classifyToken(token, previousToken);
                console.log(`${classifiedToken.type}: ${classifiedToken.value}`);
                previousToken = token; 
            });
        } catch (error) {
            outputField.value = error.message;
            console.error(error.message);  // This will log the error message (e.g., "Unknown token: sini")
        }
    } else {
        console.log("Invalid expression.");
    }
}
