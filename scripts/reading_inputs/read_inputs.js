import { displaySquareCube , toggleSquareBtn } from "../utils/display_inputs/formatted_inputs.js";
document.addEventListener('DOMContentLoaded',function(){

    const inputField = document.getElementById('input-display');

    const buttons = document.querySelectorAll('.input-btns button');
    
    const squareButton = document.getElementById('square');

    
    buttons.forEach(button => {
        button.addEventListener('click',function(e){
               let buttonId = this.id;
               switch(buttonId)
               {
                 case '2nd-toggle':
                       toggleSquareBtn();
                        break;
                 case 'square':
                case 'cube':
                        displaySquareCube();
                        break;

               }

        });
    })

});