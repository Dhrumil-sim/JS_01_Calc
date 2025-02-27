const inputField = document.getElementById('input-display') as HTMLInputElement;

const buttons = document.querySelectorAll('.input-btns button');

const squareButton = document.getElementById('square') as HTMLElement;

function appendToInput(value: string): void {
    if (inputField.value === '') {
        inputField.value = value; // If the input field is empty, insert the value
    } else {
        inputField.value += value; // Otherwise, append the value
    }
}

function toggleFENotation(buttonId: string): void {
    const toggleButton = document.getElementById(buttonId) as HTMLElement; // Get the toggle button (F-E button)
    const display = document.getElementById('output-display') as HTMLInputElement; // Get the display element
    const currentValue = Number(display.value);

    // Now that we have a valid number, proceed with the scientific notation toggle
    if (toggleButton.innerHTML.endsWith('*')) {
        // If scientific notation is active, convert the number to scientific notation
        let exponent = Math.floor(Math.log10(Math.abs(Number(currentValue))));  // Get the exponent
        let mantissa = Number(currentValue) / Math.pow(10, exponent);  // Get the mantissa

        // Format the number in scientific notation
        let scientificNotation = mantissa.toFixed(4) + 'e' + exponent;

        console.log(scientificNotation);
        display.value = scientificNotation;
    } else {

        // If scientific notation is not active, convert the number to a fixed-point format
        display.value  = currentValue.toFixed(4); // Or display.value for input fields
    }
}

export function displaySquareCube(): void {
    if (squareButton.id === 'square') {
        console.log("square hitted");
        if (inputField.value === '') {
            inputField.value += '0^2';
        } else {
            inputField.value += '^2';
        }
    }
    if (squareButton.id === 'cube') {
        if (inputField.value === '') {
            inputField.value += '0^3';
        } else {
            inputField.value += '^3';
        }
    }
}

export function toggleSquareBtn(buttonId: string): void {
    const toggleButton = document.getElementById(buttonId) as HTMLElement;

    // Check if the button clicked is the 2nd-toggle button
    if (buttonId === '2nd-toggle') {
        const squareButton = document.getElementById('square') as HTMLElement || document.getElementById('cube') as HTMLElement;

        squareButton.classList.add('toggling');

        if (squareButton.innerHTML === 'x<sup>2</sup>') {
            squareButton.innerHTML = 'x<sup>3</sup>';
            squareButton.id = 'cube';
        } else if (squareButton.innerHTML === 'x<sup>3</sup>') {
            squareButton.innerHTML = 'x<sup>2</sup>';
            squareButton.id = 'square';
        }

        setTimeout(() => {
            squareButton.classList.remove('toggling');
        }, 500); // 1000ms = 1 second
    } else if (buttonId === 'deg-toggle' || buttonId === 'rad-toggle') {
        // For DEG and RAD toggle buttons
        toggleButton.classList.add('toggling');

        if (toggleButton.innerHTML === 'DEG') {
            toggleButton.innerHTML = 'RAD';
            toggleButton.id = 'rad-toggle'; // Update the ID dynamically
        } else if (toggleButton.innerHTML === 'RAD') {
            toggleButton.innerHTML = 'DEG';
            toggleButton.id = 'deg-toggle'; // Update the ID dynamically
        }

        setTimeout(() => {
            toggleButton.classList.remove('toggling');
        }, 500); // 1000ms = 1 second
    }
    else if (buttonId === 'fe-toggle') {
        if (toggleButton.innerHTML.endsWith('*')) {
            toggleButton.innerHTML = toggleButton.innerHTML.slice(0, -1); // Remove the last character ('*')
        } else {
            toggleButton.innerHTML += '*'; // Add the '*' at the end
            toggleFENotation('fe-toggle');
        }

        setTimeout(() => {
            toggleButton.classList.remove('toggling');
        }, 500); // 1000ms = 1 second
    } else {
        if (toggleButton.innerHTML.endsWith('*')) {
            toggleButton.innerHTML = toggleButton.innerHTML.slice(0, -1); // Remove the last character ('*')
        } else {
            toggleButton.innerHTML += '*'; // Add the '*' at the end
        }

        setTimeout(() => {
            toggleButton.classList.remove('toggling');
        }, 500); // 1000ms = 1 second
    }
}

export function displayOneHalf(): void {
    if (inputField.value === '') {
        inputField.value += '1/x';
    } else {
        inputField.value = '1/' + inputField.value;
    }
}

export function displayModulus(): void {
    if (inputField.value === '') {
        inputField.value += 'abs(x)';
    } else {
        inputField.value = '+abs(' + inputField.value + ")";
    }
}

export function displayExp(): void {
    if (inputField.value === '') {
        inputField.value = 'exp^x';
    } else {
        inputField.value = 'exp^' + inputField.value;
    }
}

export function displayMod(): void {
    if (inputField.value === '') {
        inputField.value = '1%x';
    } else {
        inputField.value += '%';
    }
}

export function displayPi(): void {
    if (inputField.value === '') {
        inputField.value = '' + Math.PI;
    } else {
        inputField.value += '*' + Math.PI;
    }
}

export function displayE(): void {
    if (inputField.value === '') {
        inputField.value = '' + 2.71828;
    } else {
        inputField.value += '*' + 2.71828;
    }
}

export function displayC(): void {
    inputField.value = '';
}

export function displayDel(): void {
    inputField.value = "" + inputField.value.slice(0, -1);
}

export function displayNFactorial(): void {
    if (inputField.value === '') {
        inputField.value = 'n!';
    } else {
        inputField.value += '!';
    }
}

export function displayXPowerY(buttonId: string): void {
    // Check the button ID to determine which operation to perform

    if (buttonId === "10^x") {
        // 10^x button logic
        if (inputField.value === '') {
            inputField.value = '10^';
        } else {
            inputField.value = '10^' + inputField.value;
        }
    } else if (buttonId === "x^y") {
        // x^y button logic
        if (inputField.value === '') {
            inputField.value = 'x^y';
        } else {
            inputField.value += '^';
        }
    }
}

export function displayLog(buttonId: string): void {
    if (buttonId === 'log') {
        if (inputField.value === '') {
            inputField.value = 'log';
        } else {
            inputField.value += 'log';
        }
    }
    if (buttonId === 'ln') {
        if (inputField.value === '') {
            inputField.value = 'ln';
        } else {
            inputField.value += 'ln';
        }
    }
}

export function displayRoot(): void {
    if (inputField.value === '') {
        inputField.value = '2√x';
    } else {
        inputField.value = '2√' + inputField.value;
    }
}

export function toggleSign(): void {
    if (inputField.value) {
        if (inputField.value[0] === '-') {
            inputField.value = inputField.value.slice(1);  // Remove the negative sign
        } else {
            inputField.value = '-' + inputField.value;  // Add the negative sign
        }
    }
}

export function displayMathFunction(functionName: string): void {
    switch (functionName) {
        case 'rand':
            appendToInput('rand()');
            console.log(functionName);
            break;
        case 'ceil':
            appendToInput('ceil(');
            break;
        case 'sqrt':
            appendToInput('sqrt(');
            break;
        case 'floor':
            appendToInput('floor(');
            break;
        default:
            console.log("this is hitting!");
            break;
    }
}

export function displayTrigoFunction(func: string): void {
    const inputValue = inputField.value;

    switch (func) {
        case 'sin':
            inputField.value = `sin(${inputValue})`;
            break;
        case 'cos':
            inputField.value = `cos(${inputValue})`;
            break;
        case 'tan':
            inputField.value = `tan(${inputValue})`;
            break;
        case 'cot':
            inputField.value = `cot(${inputValue})`;
            break;
        case 'sec':
            inputField.value = `sec(${inputValue})`;
            break;
        case 'csc':
            inputField.value = `csc(${inputValue})`;
            break;
        default:
            break;
    }
}
