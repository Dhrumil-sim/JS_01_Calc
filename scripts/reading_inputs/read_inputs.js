document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('input-display'); // The input field where we show the user's input

    // Function to append input to the input field
    function appendToInput(value) {
        inputField.value += value;
    }

    // 1. Handle button click input
    const buttons = document.querySelectorAll('.input-btns button'); // Select all buttons in the calculator

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const inputField = document.getElementById('input-display');
            const buttonText = button.textContent.trim(); // Use .trim() to avoid whitespace issues
    
            if (buttonText === "=") {
                try {
                    // Evaluate the entered expression in the input field
                    const result = eval(inputField.value); 
                    document.getElementById('output-display').value = result; // Display result
                    console.log("Result of calculation: " + result); // Log the result
                } catch (error) {
                    // Handle any errors in the expression evaluation
                    console.error("Invalid input or calculation error.");
                }
            } else {
                // Append the button text to the input field if it's not the "=" button
                inputField.value += buttonText;
            }
        
        });

        
    });

    // 2. Handle keyboard input
    document.addEventListener('keydown', function(event) {
        // Check if input field is focused. If yes, prevent adding duplicate characters.
        if (document.activeElement === inputField) {
            return; // Don't process keydown events if the input field is focused
        }

        const key = event.key; // Get the key that was pressed

        // Handle number and operator keys
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '%', '(', ')'].includes(key)) {
            appendToInput(key); // Append the pressed key to the input field
        }

        // Handle "Enter" key to evaluate the expression
        if (key === 'Enter') {
            event.preventDefault(); // Prevent default behavior (form submission, page reload)
            try {
                const result = eval(inputField.value); // Evaluate the entered expression
                document.getElementById('output-display').value = result; // Display the result in the output field
                console.log("Result of calculation: " + result); // Log the result
            } catch (error) {
                console.error("Invalid input or calculation error.");
            }
        }

        // Handle "Backspace" to delete the last character
        if (key === 'Backspace') {
            inputField.value = inputField.value.slice(0, -1); // Remove the last character
        }

        // Handle "Escape" to clear the input field
        if (key === 'Escape') {
            inputField.value = ''; // Clear the input field
        }
    });
});
