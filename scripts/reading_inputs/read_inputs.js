import { displaySquareCube , toggleSquareBtn, displayOneHalf, displayModulus, displayExp , displayMod, displayPi ,displayE, displayC, displayDel, displayRoot, displayNFactorial, displayXPowerY, displayLog} from "../utils/display_inputs/formatted_inputs.js";
document.addEventListener('DOMContentLoaded',function(){

    const inputField = document.getElementById('input-display');

    const buttons = document.querySelectorAll('.input-btns button');
    
    const squareButton = document.getElementById('square');

    
    buttons.forEach(button => {
        button.addEventListener('click',function(e){
            let buttonId = this.id;
            handleButtonClick(buttonId);
        });
    });

    document.addEventListener('keydown', function (e) {
        const key = e.key; // Get the pressed key
        handleKeyPress(key);
    });

    function handleButtonClick(buttonId)
    {
       
        switch(buttonId)
        {
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
         
         // first row buttons
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
             const buttonText = button.innerText.trim();
             if(buttonText==='')
             {
                 inputField.value = "invalid";
             }
             inputField.value += buttonText;
        }
    }
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
                // Implement logic for calculating the result, e.g., calling the evaluate function
                try {
                    inputField.value = eval(inputField.value); // You might want to replace eval() for security reasons
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
            default:
                // Ignore unhandled keys
                break;
        }
    }


});