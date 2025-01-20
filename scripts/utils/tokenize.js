export function tokenize(expression , trigFunction , mathFunction){

    const regex = /\d+(\.\d+)?|[-+*/^%()a-zA-Z]+/g;
    let tokens = expression.match(regex);

    if(trigFunction)
    {
        tokens = tokens.map(token => token === trigFunction ? trigFunction : token);
    }
    if (mathFunction) {
        tokens = tokens.map(token => token === mathFunction ? mathFunction : token);
    }
    if (!tokens) {
        throw new Error('Invalid expression');
    }
    return tokens;
}

