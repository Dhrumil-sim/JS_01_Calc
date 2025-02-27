import { calculate } from "../utils/calculation/calculation.js";
import { 
    displayMathFunction, 
    displayTrigoFunction, 
    displaySquareCube, 
    toggleSquareBtn, 
    displayOneHalf, 
    displayModulus, 
    displayExp, 
    displayMod, 
    displayPi, 
    displayE, 
    displayC, 
    displayDel, 
    displayRoot, 
    displayNFactorial, 
    displayXPowerY, 
    displayLog 
} from "../utils/display_inputs/formatted_inputs.js";

// Import memory button functions from memory_functions.js
import { setupMemoryButtons } from '../utils/memory_functions.js';

document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('input-display') as HTMLInputElement;
    const buttons = document.querySelectorAll('.main button');
    const outputField = document.getElementById('output-display') as HTMLInputElement;
    
    // Initialize memory buttons (MC, MR, MS, M+)
    setupMemoryButtons();

    // Button Click Event Handling  
    buttons.forEach(button => {
        button.addEventListener('click', function (e: Event) {
            const buttonId = (e.target as HTMLElement).id;
            handleButtonClick(buttonId);
        });
    });

    // Keydown Event Handling
    document.addEventListener('keydown', function (e: KeyboardEvent) {
        const key = e.key; // Get the pressed key

        if (document.activeElement === inputField) {
            return; // Don't process keydown if the input field is focused
        }

        handleKeyPress(key);
    });

    const trigoSelect = document.getElementById('trigo-functions') as HTMLSelectElement;
    trigoSelect.addEventListener('change', function () {
        const selectedFunction = trigoSelect.value;
        displayTrigoFunction(selectedFunction);
    });

    const mathSelect = document.getElementById('math-functions') as HTMLSelectElement;
    mathSelect.addEventListener('change', function () {
        const selectedFunction = mathSelect.value;
        displayMathFunction(selectedFunction);
    });

    function handleButtonClick(buttonId: string): void {
        const button = document.getElementById(buttonId) || event?.target;

        // Access the text of the clicked button
        const buttonText = (button as HTMLElement).innerText.trim();

        switch (buttonId) {
            case '2nd-toggle':
                toggleSquareBtn(buttonId);
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
            case 'deg-toggle':
            case 'rad-toggle':
                toggleSquareBtn(buttonId);
                break;
            case 'fe-toggle':
                toggleSquareBtn(buttonId);
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
            case 'equal':
                const input = inputField.value;
                const output = calculate(input);
                outputField.value = String(output);
                break;
            case 'memory-add':
            case 'memory-clear':
            case 'memory-minus':
            case 'memory-recall':
            case 'memory-store':
            case 'history-btn':
                break;
            default:
                // Directly access the clicked button's text when no matching case
                inputField.value += buttonText;
                break;
        }
    }

    // Handle Key Presses
    function handleKeyPress(key: string): void {
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
            case 'Enter':
                const input = inputField.value;
                const output = calculate(input);
                outputField.value =  String(output);
                break;
            default:
                break;
        }
    }

});
