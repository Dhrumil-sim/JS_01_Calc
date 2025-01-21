import {displayTrigoFunction, displaySquareCube, toggleSquareBtn, displayOneHalf, displayModulus, displayExp, displayMod, displayPi, displayE, displayC, displayDel, displayRoot, displayNFactorial, displayXPowerY, displayLog, displayMathFunction } from "../utils/display_inputs/formatted_inputs.js";

document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('input-display');
    const buttons = document.querySelectorAll('.input-btns button');
    

    // Button Click Event Handling
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            let buttonId = this.id;
            handleButtonClick(buttonId);
        });
    });

    // Keydown Event Handling
    document.addEventListener('keydown', function (e) {
        const key = e.key; // Get the pressed key

        if (document.activeElement === inputField) {
            return; // Don't process keydown if the input field is focused
        }

        handleKeyPress(key);
    });

    const trigoSelect = document.getElementById('trigo-functions');
    trigoSelect.addEventListener('change', function () {
        const selectedFunction = trigoSelect.value;
        displayTrigoFunction(selectedFunction);
    });

    const mathSelect = document.getElementById('math-functions');
    mathSelect.addEventListener('change', function () {
        const selectedFunction = mathSelect.value;
        displayMathFunction(selectedFunction);
    });


    function handleButtonClick(buttonId) {
        const button = document.getElementById(buttonId) || event.target;

        // Access the text of the clicked button
        const buttonText = button.innerText.trim();

        switch (buttonId) {
            case '2nd-toggle':
                toggleSquareBtn();
                break;
            case 'square':
            case 'cube':
                displaySquareCube();
                break;
            case '1/x':
                displayOneHalf();
                break;
            case 'modulus':
                displayModulus();
                break;
            case 'exp':
                displayExp();
                break;
            case 'mod':
                displayMod();
                break;

            // First row buttons
            case 'pi':
                displayPi();
                break;
            case 'e':
                displayE();
                break;
            case 'C':
                displayC();
                break;
            case 'Del':
                displayDel();
                break;
            case '2root':
                displayRoot();
                break;
            case 'fact':
                displayNFactorial();
                break;
            case 'x^y':
            case '10^x':
                displayXPowerY(buttonId);
                break;
            case 'log':
            case 'ln':
                displayLog(buttonId);
                break;
            default:
                // Directly access the clicked button's text when no matching case
                inputField.value += buttonText;
                break;
        }
    }


    // Handle Key Presses
    function handleKeyPress(key) {
        switch (key) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                inputField.value += key;
                break;
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                inputField.value += key;
                break;
            case '.':
                inputField.value += key;
                break;
            case 'Enter':
                try {
                    inputField.value = eval(inputField.value); // Consider using a safer method for evaluation
                } catch (err) {
                    inputField.value = "Error";
                }
                break;
            case 'Backspace':
                inputField.value = inputField.value.slice(0, -1);
                break;
            case 'c':
            case 'C':
                displayC();
                break;
            case 'p': // For π (pi)
                displayPi();
                break;
            case 'e': // For e
                displayE();
                break;
            case 'l': // For log
                displayLog('log');
                break;
            case 'x': // For x^y
                displayXPowerY('x^y');
                break;
            case 'r': // For root (2nd root)
                displayRoot();
                break;
            case 'f': // For factorial
                displayNFactorial();
                break;

            // Trigonometric functions
            case 's': // sin
                inputField.value += 'sin(';
                break;
            case 'c': // cos
                inputField.value += 'cos(';
                break;
            case 't': // tan
                inputField.value += 'tan(';
                break;
            case 'a': // For other trigonometric functions
                inputField.value += 'asin(';
                break;
            case 'q': // For sqrt, square root
                inputField.value += 'sqrt(';
                break;
            default:
                break;
        }
    }

});
