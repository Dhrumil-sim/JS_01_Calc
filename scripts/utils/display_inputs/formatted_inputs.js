  const inputField = document.getElementById('input-display');

  const buttons = document.querySelectorAll('.input-btns button');
    
  const squareButton = document.getElementById('square');
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
 export  function toggleSquareBtn(){
                
        squareButton.classList.add('toggling');
        
        if(squareButton.innerHTML === 'x<sup>2</sup>')
        {
            squareButton.innerHTML = 'x<sup>3</sup>';
            squareButton.id = 'cube';
        }
        else if(squareButton.innerHTML === 'x<sup>3</sup>'){
            squareButton.innerHTML = 'x<sup>2</sup>';
            squareButton.id = 'square';
        }   
        
        setTimeout(() => {
            squareButton.classList.remove('toggling');
        }, 500); // 1000ms = 1 second
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