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
            console.log("Display cube format");
         }
    }
 export  function toggleSquareBtn(){
                
                      
        if(squareButton.innerHTML === 'x<sup>2</sup>')
        {
            squareButton.innerHTML = 'x<sup>3</sup>';
            squareButton.id = 'cube';
        }
        else if(squareButton.innerHTML === 'x<sup>3</sup>'){
            squareButton.innerHTML = 'x<sup>2</sup>';
            squareButton.id = 'square';
        }   
}