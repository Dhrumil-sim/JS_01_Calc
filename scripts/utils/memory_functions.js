// memory_functions.js

let memory = 0;  // Variable to hold the memory value

export function setupMemoryButtons() {
    const memoryClearButton = document.getElementById('memory-clear');
    const memoryRecallButton = document.getElementById('memory-recall');
    const memoryStoreButton = document.getElementById('memory-store');
    const memoryAddButton = document.getElementById('memory-add');

    const outputField = document.getElementById('output-display');

    // Memory Clear - Clears the memory
    memoryClearButton.addEventListener('click', function () {
        memory = 0;
        console.log("Memory Cleared");
        outputField.value = "";  // Optional: clear the display too
    });

    // Memory Recall - Recalls the stored memory value
    memoryRecallButton.addEventListener('click', function () {
        console.log("Memory Recalled: " + memory);
        outputField.value = memory;  // Display the memory value
    });

    // Memory Store - Stores the current value on the display into memory
    memoryStoreButton.addEventListener('click', function () {
        const currentDisplay = parseFloat(outputField.value);
        memory = currentDisplay;
        console.log("Memory Stored: " + memory);
    });

    // Memory Add - Adds the current value on the display to the stored memory
    memoryAddButton.addEventListener('click', function () {
        const currentDisplay = parseFloat(outputField.value);
        memory += currentDisplay;
        console.log("Added to Memory. New Memory Value: " + memory);
    });
}
