// Function to calculate the human-readable time difference
function getTimeDifference(timestamp) {
    const currentTime = new Date();
    const diffInSeconds = Math.floor((currentTime - new Date(timestamp)) / 1000);  // Time difference in seconds

    // Calculate the time difference in different units
    const seconds = diffInSeconds;
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);
    const weeks = Math.floor(diffInSeconds / (86400 * 7));
    const months = Math.floor(diffInSeconds / (86400 * 30));
    const years = Math.floor(diffInSeconds / (86400 * 365));

    // Return the human-readable format
    if (seconds < 60) {
        return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    } else if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (days < 7) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (weeks < 4) {
        return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    } else if (months < 12) {
        return `${months} month${months === 1 ? '' : 's'} ago`;
    } else {
        return `${years} year${years === 1 ? '' : 's'} ago`;
    }
}

// Store calculation history, including actual timestamp
export function storeHistory(time, expression, output) {
    console.log(expression);
    console.log(output);
    console.log(time);

    // Ensure that the time is a valid timestamp, else use the current time
    let timestamp = time;
    if (!(timestamp instanceof Date) || isNaN(timestamp)) {
        timestamp = new Date().getTime();  // Use current time if the timestamp is invalid
    }

    // Get the existing history from localStorage or initialize an empty array if none exists
    let history = localStorage.getItem('calculationHistory');
    if (history) {
        history = JSON.parse(history); // Parse if history exists
    } else {
        history = [];  // Initialize an empty array if no history exists
    }

    // Create an entry for the current calculation
    const entry = {
        time: timestamp,  // Store the actual timestamp
        expression: expression,
        output: output
    };

    history.unshift(entry);

    // If history exceeds 10 records, remove the oldest (last) record
    if (history.length > 10) {
        history.pop();  // Remove the oldest record from the end of the array
    }


    // Store the updated history back into localStorage
    localStorage.setItem('calculationHistory', JSON.stringify(history));

    // Call the function to update the UI with the latest history after a 1-second delay
    setTimeout(() => {
        updateHistoryUI();
    }, 1000);  // 1000 milliseconds = 1 second
}

export function updateHistoryUI() {
    const historyContainer = document.querySelector('.search-history');
    const history = JSON.parse(localStorage.getItem('calculationHistory')) || [];

    if (history.length === 0) {
        // Display an alert if there is no history
        alert('No history available');
        return;  // Exit the function if there's no history
    }

    // Clear the current history UI
    historyContainer.innerHTML = '';

    // Iterate through each history entry and create the HTML structure for each
    history.forEach((entry, index) => {
        // Create the card for each history entry
        const card = document.createElement('div');
        card.classList.add('card');

        // Create and append the card header for the time (calculate the time difference)
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.innerText = getTimeDifference(entry.time);  // Display the human-readable time difference
        card.appendChild(cardHeader);

        // Create and append the input field for the expression
        const inputField = document.createElement('div');
        inputField.classList.add('input-field');
        inputField.innerText = entry.expression;  // Display the expression
        card.appendChild(inputField);

        // Create and append the output field for the result
        const outputField = document.createElement('div');
        outputField.classList.add('output-field');
        outputField.innerText = entry.output;  // Display the result
        card.appendChild(outputField);

        // Append the card to the container
        historyContainer.appendChild(card);

        // Add event listener for click: copy the expression and result to the input/output fields
        card.addEventListener('click', () => {
            document.querySelector('.input-display').value = entry.expression;  // Assuming your input field has the class 'input-tag'
            document.querySelector('.output-display').value = entry.output;  // Assuming your output field has the class 'output-tag'
        });

        // Add event listener for double-click: delete the card from history
        card.addEventListener('dblclick', () => {
            // Remove the entry from the history array
            history.splice(index, 1);  // Splice removes the item at the given index

            // Update the history in localStorage
            localStorage.setItem('calculationHistory', JSON.stringify(history));

            // Call the function again to update the UI after the deletion
            updateHistoryUI();
        });
    });
}
