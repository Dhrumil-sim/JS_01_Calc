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