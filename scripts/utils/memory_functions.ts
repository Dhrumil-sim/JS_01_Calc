let memory: number[] = JSON.parse(localStorage.getItem('memory') || '[]');  // Load memory from localStorage or initialize it as empty array

export function setupMemoryButtons() {
    const memoryClearButton = document.getElementById('memory-clear') as HTMLButtonElement;
    const memoryRecallButton = document.getElementById('memory-recall') as HTMLButtonElement;
    const memoryStoreButton = document.getElementById('memory-store') as HTMLButtonElement;
    const memoryAddButton = document.getElementById('memory-add') as HTMLButtonElement;
    const memoryMinusButton = document.getElementById('memory-minus') as HTMLButtonElement;  // New button

    const outputField = document.getElementById('output-display') as HTMLInputElement;

    // Update localStorage with the latest memory array
    function updateLocalStorage() {
        localStorage.setItem('memory', JSON.stringify(memory));
    }

    function displayError(msg: string): void {
        outputField.value = msg;
    }

    // Check if the output field has a valid number
    function isValidNumber(): boolean {
        const currentDisplay = outputField.value;
        return currentDisplay.trim() !== "" && !isNaN(parseFloat(currentDisplay));  // Ensure it's not empty and is a number
    }

    // General function to handle button actions (Memory Store, Memory Add, Memory Minus)
    function handleMemoryAction(action: 'clear' | 'store' | 'add' | 'minus' | 'recall') {
        return function () {
            // Check if the output field contains a valid number
            if (action !== 'recall' && !isValidNumber()) {  // Skip validation for recall
                console.log("Output field is empty or invalid.");
                displayError("Output field is empty or invalid.");
                return;
            }

            const currentDisplay = parseFloat(outputField.value);
            
            switch (action) {
                case 'clear':
                    memory = [];
                    console.log("Memory Cleared");
                    outputField.value = "";  // Optional: clear the display
                    break;
                case 'store':
                    memory.push(currentDisplay);
                    console.log("Memory Stored: " + currentDisplay);
                    break;
                case 'add':
                    if (memory.length > 0) {
                        memory[memory.length - 1] += currentDisplay;  // Add to the last stored memory value
                        console.log("Added to Memory. New Memory Value: " + memory[memory.length - 1]);
                    } else {
                        console.log("Memory is empty.");
                    }
                    break;
                case 'minus':
                    if (memory.length > 0) {
                        memory[memory.length - 1] -= currentDisplay;  // Subtract from the last stored memory value
                        console.log("Subtracted from Memory. New Memory Value: " + memory[memory.length - 1]);
                    } else {
                        console.log("No memory to subtract from.");
                    }
                    break;
                case 'recall':
                    if (memory.length === 0) {
                        console.log("Memory is empty.");
                        displayError("Memory is empty.");
                    } else {
                        const lastMemoryValue = memory.pop()!;
                        console.log("Memory Recalled: " + lastMemoryValue);
                        outputField.value = lastMemoryValue.toString();  // Display the last memory value
                    }
                    break;
                default:
                    console.log("Unknown action.");
                    break;
            }

            updateLocalStorage();  // Update localStorage after any memory action
            console.log("Current Memory Stack: ", memory);
        };
    }

    // Attach handlers to each button
    memoryClearButton.addEventListener('click', handleMemoryAction('clear'));
    memoryStoreButton.addEventListener('click', handleMemoryAction('store'));
    memoryAddButton.addEventListener('click', handleMemoryAction('add'));
    memoryMinusButton.addEventListener('click', handleMemoryAction('minus'));
    memoryRecallButton.addEventListener('click', handleMemoryAction('recall'));
}
