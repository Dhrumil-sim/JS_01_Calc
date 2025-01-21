  const inputField = document.getElementById('input-display');    
  const squareButton = document.getElementById('square');

  function appendToInput(value)
  {
    if(inputField.value===''){
        inputField.value = value;
    }
    else{
        inputField.value+=value;
    }
  }
export function displaySquareCube()
    {
         if(squareButton.id === 'square'){
            console.log("square hitted");
            if(inputField.value=== '')
            {
                inputField.value += '0^2';
            }
            else{
                inputField.value+='^2';
            }
         }
         if(squareButton.id === 'cube')
         {
            if(inputField.value=== '')
                {
                    inputField.value += '0^3';
                }
                else{
                    inputField.value+='^3';
                }
         }
    }

// Helper function to toggle button text and id (for square/cube button)
function toggleButtonText(button, text1, text2, id1, id2) {
    button.classList.add('toggling');
    if (button.innerHTML === text1) {
        button.innerHTML = text2;
        button.id = id2;
    } else {
        button.innerHTML = text1;
        button.id = id1;
    }
    setTimeout(() => {
        button.classList.remove('toggling');
    }, 500); // 500ms = 0.5 second
}

export function toggleSquareBtn() {
    toggleButtonText(squareButton, 'x<sup>2</sup>', 'x<sup>3</sup>', 'square', 'cube');
}
export function displayOneHalf()
{

     if(inputField.value === '')
     {
          inputField.value += '1/x';
     }
     else
     {
        inputField.value = '1/'+ inputField.value;
     }
}
export function displayModulus()
{
    if(inputField.value==='')
    {
        inputField.value += '|x|';
    }
    else{
        inputField.value='|'+inputField.value+"|";
    }
}
export function displayExp()
{
    if(inputField.value==='')
    {
        inputField.value = 'exp^x';
    }
    else{
        inputField.value = 'exp^'+inputField.value;
    }
}
export function displayMod()
{
    if(inputField.value==='')
    {
        inputField.value = '1%x';
    }
    else{
        inputField.value += '%'; 
    }
}
export function displayPi()
{
    if(inputField.value==='')
    {
        inputField.value = ''+Math.PI;
    }
    else 
    {
        inputField.value += '*'+Math.PI;
    }
}
export function displayE()
{
    if(inputField.value==='')
    {
        inputField.value = ''+2.71828;
    }
    else 
    {
        inputField.value += '*'+2.71828;
    }
}
export function displayC()
{
    inputField.value = '';
}
export function displayDel()
{
    inputField.value = ""+inputField.value.slice(0,-1);
}
export function displayNFactorial() {
    if (inputField.value === '') {
        inputField.value = 'n!';
    } else {
        inputField.value += '!';
    }
}

export function displayXPowerY(buttonId) {
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

export function displayLog(buttonId) {

    if(buttonId === 'log')
    {
    if (inputField.value === '') {
        inputField.value = 'log';
    } else {
        inputField.value += 'log';
    }
    }
    if(buttonId === 'ln')
    {
        if (inputField.value === '') {
            inputField.value = 'ln';
        } else {
            inputField.value += 'ln';
        }
    }
}
export function displayRoot() {
    if (inputField.value === '') {
        inputField.value = '2√x';
    } else {
        inputField.value = '2√' + inputField.value;
    }
}

export function toggleSign() {
    if (inputField.value) {
        if (inputField.value[0] === '-') {
            inputField.value = inputField.value.slice(1);  // Remove the negative sign
        } else {
            inputField.value = '-' + inputField.value;  // Add the negative sign
        }
    }
}
export function handleMathFunction(functionName) {
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
        default:
            break;
    }
}
export function displayTrigoFunction(func) {
    const inputField = document.getElementById('input-display');
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