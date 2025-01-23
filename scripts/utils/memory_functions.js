// memory_functions.js

let memory = JSON.parse(localStorage.getItem('memory')) || [];  // Load memory from localStorage or initialize it as empty array

export function setupMemoryButtons() {
    const memoryClearButton = document.getElementById('memory-clear');
    const memoryRecallButton = document.getElementById('memory-recall');
    const memoryStoreButton = document.getElementById('memory-store');
    const memoryAddButton = document.getElementById('memory-add');
    const memoryMinusButton = document.getElementById('memory-minus');  // New button

    const outputField = document.getElementById('output-display');

    // Update localStorage with the latest memory array
    function updateLocalStorage() {
        localStorage.setItem('memory', JSON.stringify(memory));
    }

    // Memory Clear - Clears the memory stack
    memoryClearButton.addEventListener('click', function () {
        memory = [];
        console.log("Memory Cleared");
        outputField.value = "";  // Optional: clear the display
        updateLocalStorage();  // Update the localStorage after clearing memory
        console.log("Current Memory Stack: ", memory);
    });

    // Memory Recall - Recalls and displays the stored memory values one by one
    memoryRecallButton.addEventListener('click', function () {
        if (memory.length === 0) {
            console.log("Memory is empty.");
            outputField.value = "Memory is empty.";  // Show a message when memory is empty
        } else {
            const lastMemoryValue = memory.pop();  // Pop the last value from the stack
            console.log("Memory Recalled: " + lastMemoryValue);
            outputField.value = lastMemoryValue;  // Display the last memory value
            updateLocalStorage();  // Update localStorage after recalling value
        }
        console.log("Current Memory Stack: ", memory);
    });

    // Memory Store - Stores the current value on the display into memory
    memoryStoreButton.addEventListener('click', function () {
        const currentDisplay = parseFloat(outputField.value);
        if (!isNaN(currentDisplay)) {
            memory.push(currentDisplay);  // Push the current value into the stack
            console.log("Memory Stored: " + currentDisplay);
            updateLocalStorage();  // Update localStorage after storing the value
        }
        console.log("Current Memory Stack: ", memory);
    });

    // Memory Add - Adds the current value on the display to the last stored memory value
    memoryAddButton.addEventListener('click', function () {
        const currentDisplay = parseFloat(outputField.value);
        if (!isNaN(currentDisplay) && memory.length > 0) {
            // Avoid adding the current value to memory twice
            let lastMemoryValue = memory[memory.length - 1];
            memory[memory.length - 1] = lastMemoryValue + currentDisplay;  // Add to the last stored memory value
            console.log("Added to Memory. New Memory Value: " + memory[memory.length - 1]);
            updateLocalStorage();  // Update localStorage after adding the value to memory
        }
        console.log("Current Memory Stack: ", memory);
    });

    // Memory Minus - Subtracts the current value on the display from the last stored memory value
    memoryMinusButton.addEventListener('click', function () {
        const currentDisplay = parseFloat(outputField.value);
        if (!isNaN(currentDisplay) && memory.length > 0) {
            memory[memory.length - 1] -= currentDisplay;  // Subtract from the last stored memory value
            console.log("Subtracted from Memory. New Memory Value: " + memory[memory.length - 1]);
            updateLocalStorage();  // Update localStorage after subtracting
        } else if (memory.length === 0) {
            console.log("No memory to subtract from.");
        }
        console.log("Current Memory Stack: ", memory);
    });
}

