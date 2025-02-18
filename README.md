# Scientific Calculator

The project involves building a **responsive Scientific Calculator** that supports both basic arithmetic operations and advanced scientific functions.

# Vercel:(https://javascriptcalulator.vercel.app/)
### Light Mode
![Image](https://github.com/user-attachments/assets/3eb94b26-6e51-4349-9c92-5113d7bcdff1)
### Light Mode - History
![Image](https://github.com/user-attachments/assets/7bca5d8e-3bdf-4c8e-af17-878f5aa8664f)
### Dark Mode
![Image](https://github.com/user-attachments/assets/e15bb34d-94da-494a-b7bd-8ff1441f0c7c)
### Dark Mode - History
![Image](https://github.com/user-attachments/assets/45744384-00bd-4b8b-8fd3-ccb3791466a3)

### Basic Operations:
- Addition (+), Subtraction (-), Multiplication (*), Division (/), Modulus (%), Equal (=)

### Advanced Functions:
- Trigonometric: sin(x), cos(x), tan(x)
- Logarithmic: log(x)
- Exponentiation: x^y
- Square root: sqrt(x)
- Constants: π, e

### Key Features:
- **JavaScript Functionality**:
  - **Closures**: Encapsulates private variables and methods for calculation history.
  - **Prototype Methods**: Implements basic operations using prototype methods.
  - **Calculator Class**: Organizes scientific and arithmetic operations.
  - **`this` Keyword**: Properly used in event handlers and class methods.
  
- **Modular Code Structure**: Code is divided into separate modules (e.g., utility functions, main logic).
- **Error Handling**: Handles invalid inputs such as division by zero and other calculation errors.

### Bonus Features:
- **History Feature**: Users can view recent calculations.
- **Keyboard Input**: Supports keyboard input for calculator operations.
- **Themes**: Light/Dark mode themes implemented using CSS and JavaScript.
- **Persistent History**: Uses `localStorage`/`sessionStorage` to persist calculation history, ensuring that the history is available even after page reloads.

This project aims to be both **user-friendly** and **feature-rich**, offering a seamless experience for basic and advanced calculations.

I have a following project Directory Structure:


```plaintext
.
├── style/
│   └── style.css
├── scripts/
│   ├── reading_inputs/
│   │   └── read_inputs.js
│   ├── utils/
│   │   ├── calculation/
│   │   │   ├── classification.js
│   │   │   └── calculation.js
│   │   └── display_inputs/
│   │       ├── history_store.js
│   │       └── memory_functions.js
├── README.md
└── index.html
```
## index.html Overview

The **index.html** file is the main entry point for the Scientific Calculator web application. It contains the structure and layout of the user interface, which includes:

### Features and Functionality:
- **Responsive Design**: The layout is designed to be responsive, ensuring proper display on both desktop and mobile devices.
- **Calculator UI**: 
  - Includes buttons for all basic arithmetic operations, scientific functions, and constants such as π and e.
  - Provides buttons for trigonometric and mathematical functions (e.g., sin(x), cos(x), rand, ceil, etc.).
  - Displays input and output areas to show calculations and results.
  - The calculator also supports the 2nd-toggle functionality, allowing users to switch between square and cube operations.
  - Offers memory buttons (MC, MS, M+, M-) to store and recall values.
  - Includes a button for clearing the display (C) and deleting the last character (Del).

### Additional Features:
- **Theme Toggle**: 
  - Includes a dark/light mode toggle, which changes the appearance of the calculator. The current theme is saved in `localStorage` to persist between sessions.
- **Date and Time Display**: 
  - Shows the current day and time at the top of the calculator.
- **History Feature**: 
  - A history section is available to show recent calculations, which can be toggled on or off with a button. The history section updates every 5 seconds.
- **Validation**: 
  - The input field uses a pattern attribute to validate the user's input, ensuring valid expressions are entered (e.g., no invalid characters).

### External Resources:
- **CSS**: Linked to an external stylesheet (`style/style.css`) to define the calculator's appearance.
- **JavaScript**: Contains embedded and external scripts:
  - **`reading_inputs/read_inputs.js`**: Handles input reading and processing.
  - **`history_store.js`**: Updates the history section.

### Conclusion:
The `index.html` file sets up the user interface for the Scientific Calculator and provides various functionalities such as theme toggling, memory functions, and a history feature. It is a key component in ensuring that users can interact with the calculator effectively while maintaining a responsive, user-friendly experience.

# `style.css` - summary

## Global Styles
- **Box Model Reset:** Resets margin, padding, and box-sizing for all elements to ensure consistent layout.
- **Body Styling:** Uses flexbox to center content horizontally and vertically, with a light background and basic font styles.

## Header & Search History
- **Header:** Fixed at the top with a dark background, containing elements like buttons and title.
- **Search History:** Initially hidden, shown with the `show` class. Contains a scrollable area with a smooth transition. Dark theme styling included.

## Card Styles
- Cards are styled with background colors, borders, and smooth hover effects. They contain headers with different background colors for light and dark themes.

## Input & Output Fields
- Styled input/output fields with background colors, borders, and text colors that change based on the theme.

## Theme Support
- **Light Theme:** Defines colors for cards, inputs, text, and borders for a light mode design.
- **Dark Theme:** Similar structure to the light theme but with darker backgrounds and lighter text for better contrast in low-light environments.

## Buttons & Hover Effects
- Buttons feature hover, active, and focus effects with smooth transitions and color changes.
- Dark mode buttons have additional specific color settings and subtle interactive effects.

## Responsive Design
- Uses media queries to adjust layout and font sizes for screens smaller than 600px. Ensures the UI is mobile-friendly.

## Interactive Elements
- Buttons and cards feature hover and focus effects to enhance interactivity. 

## Suggestions
- **Naming Consistency:** Ensure class names are descriptive and clear.
- **Accessibility:** Check color contrast for readability, especially in dark mode.
- **Mobile Adjustments:** Further improve mobile layout for search history and compactness.
- **Performance:** Avoid excessive transitions that may impact performance.

---

This CSS covers essential styling for a responsive, dark/light theme switcher, with interactive elements like buttons and cards, ensuring a smooth user experience across devices.


# `utils/read_input.js` - Summary

## Purpose
This script handles user input and button interactions for a calculator-like interface. It listens for both button clicks and key presses, processes the input, and displays the output. The script also manages additional features like trigonometric and math functions, memory functionality, and the display of complex mathematical expressions.

## Key Sections and Functions

### 1. **Button Click Handling**
   - **Event Listeners**: Listens for clicks on the calculator buttons.
   - **Button Click Actions**: Based on the button clicked, it triggers the corresponding mathematical operation or display function.
   - **Example**: If the user clicks 'pi', the `displayPi()` function is invoked.

### 2. **Keyboard Input Handling**
   - **Keydown Event**: Listens for key presses and handles them if the input field is not focused.
   - **Valid Keys**: Handles digits, mathematical operators, and specific function keys (e.g., 'pi', 'log', 'sqrt').
   - **Example**: Pressing 'p' or 'P' inserts 'π' into the input field.

### 3. **Input Fields**
   - **Input Field**: `input-display` for the user to type mathematical expressions.
   - **Output Field**: `output-display` for displaying results after calculation.

### 4. **Functions Imported**
   - **Mathematical Operations & Display**:
     - `displayMathFunction()`, `displayTrigoFunction()`, `displaySquareCube()`, `displayModulus()`, etc. – Handle the display of functions based on user selection (e.g., trig functions or mathematical operations).
   - **Memory Operations**: `setupMemoryButtons()` initializes memory-related button functionality (e.g., MC, MR, MS, M+).
   - **Expression Calculation**:
     - `calculate()` is called to process the user's input expression (using `processExpression` if necessary).

### 5. **Event Handlers**
   - **handleButtonClick(buttonId)**: Determines the action based on which button is clicked (e.g., math functions, memory operations, or number entry).
   - **handleKeyPress(key)**: Handles key presses for specific functions, such as adding digits or invoking functions like factorials or logarithms.

### 6. **Dropdown Select Handlers**
   - **Trigonometric & Math Function Selectors**: Allows the user to choose functions from dropdowns (e.g., sin, cos) and updates the input field accordingly.

## Key Functionalities
- **Mathematical Input & Calculation**: Provides support for standard mathematical operations (addition, subtraction, etc.) and complex functions (logarithms, factorials, powers).
- **Memory Functions**: Includes memory features like recalling, storing, and adding to memory.
- **Special Functions**: Functions like π, e, factorials, and roots are easily accessible through buttons or keyboard shortcuts.

---

## Interaction Flow

1. **User Input**: Can input through button clicks or key presses.
2. **Function Selection**: Dropdown menus let users select math or trigonometric functions (e.g., sin, cos, tan).
3. **Calculation & Output**: Once the expression is entered, clicking 'equal' or pressing 'Enter' calculates the result using the `calculate()` function.
4. **Memory Operations**: Memory buttons (MC, MR, MS, etc.) let the user store and recall values.
5. **Trigonometric and Math Functions**: A combination of button presses and dropdown selections enable advanced mathematical operations like square roots, powers, and logarithms.

---

## Example Usage

- **Button Click**: Clicking on the "pi" button displays 'π' in the input field.
- **Keyboard Press**: Pressing 'Enter' after entering `2+2` calculates and displays `4` in the output field.
- **Dropdown Select**: Selecting "sin" from the trigonometric dropdown adds `sin(` to the input field.

---

### Imports and Files
- **`calculation.js`**: Contains the logic for calculating the result based on the input expression (`calculate()`).
- **`formatted_inputs.js`**: Contains functions that display the mathematical and trigonometric functions in the input field.
- **`memory_functions.js`**: Contains memory-related functionalities for storing and recalling values.

---

This script provides a smooth interface for users to interact with a mathematical calculator, allowing both simple operations and complex mathematical expressions.

# `utils/display_inputs/formatted_inputs.js` - Summary

## Purpose
This script provides helper functions that support mathematical expression input and display. It manages user interactions with the input field, allowing the insertion and modification of mathematical functions like trigonometric operations, logarithms, powers, square/cube functions, and more. The functions help format and manipulate the content of the input field based on user interaction with buttons.

## Key Functions

### 1. **Basic Input Handling**
   - **appendToInput(value)**: Adds the given value to the input field. If the input field is empty, it directly inserts the value; otherwise, it appends the value.
   
### 2. **Display Functions for Specific Mathematical Operations**
   - **displaySquareCube()**: Inserts square (`^2`) or cube (`^3`) into the input field based on the current button.
   - **displayOneHalf()**: Adds `1/x` to the input field. If the input field is already populated, it prepends `1/` to the value.
   - **displayModulus()**: Adds the absolute value notation (`abs(x)`) to the input field.
   - **displayExp()**: Appends `exp^x` to the input field.
   - **displayMod()**: Adds modulus (`%`) to the current input.
   - **displayPi()**: Inserts the value of π (pi) into the input field.
   - **displayE()**: Inserts the value of `e` (Euler's number) into the input field.
   - **displayC()**: Clears the input field.
   - **displayDel()**: Deletes the last character from the input field.
   - **displayNFactorial()**: Adds a factorial symbol (`n!`) to the input.
   - **displayXPowerY(buttonId)**: Adds `x^y` or `10^x` to the input field, depending on the button clicked.
   - **displayLog(buttonId)**: Inserts `log` or `ln` (natural logarithm) based on the button clicked.
   - **displayRoot()**: Inserts a square root (`2√x`) into the input field.

### 3. **Toggle Functions**
   - **toggleSquareBtn(buttonId)**: Switches between square (`x^2`) and cube (`x^3`) operations based on the button clicked. Also handles toggling between degrees (`DEG`) and radians (`RAD`) for angle input and toggling scientific notation (`*`) on and off.
   - **toggleSign()**: Toggles the sign of the input value (positive to negative and vice versa).

### 4. **Mathematical Function Handling**
   - **displayMathFunction(functionName)**: Inserts mathematical functions like `rand()`, `ceil()`, `sqrt()`, and `floor()` into the input field based on the selected function.
   - **displayTrigoFunction(func)**: Handles trigonometric functions (sin, cos, tan, cot, sec, csc) and wraps the current input value in the selected trigonometric function (e.g., `sin(x)`).

### 5. **Scientific Notation**
   - **toggleFENotation(buttonId)**: Toggles scientific notation for numbers. When activated, it converts the number into a format like `mantissa * 10^exponent` (e.g., `1.23e4`).

## Button Event Handling
Each function in this script corresponds to specific buttons or actions from the UI, such as:
   - **Math Operations**: Insert operations like square, cube, factorial, etc.
   - **Special Functions**: Handle special numbers like π and `e`, logarithmic functions, square roots, etc.
   - **Trigonometric Operations**: Functions like sin, cos, tan, etc., are wrapped around the current input value.
   - **Memory Operations**: Provide functionality to toggle scientific notation or switch between degree and radian modes.

## Example Usage
- **Square or Cube**: Pressing the square button will add `^2` to the input value, while pressing the cube button adds `^3`.
- **Logarithms**: Pressing the `log` button adds `log` to the input field, or `ln` for the natural logarithm.
- **Sign Toggle**: The `toggleSign()` function allows users to quickly change the sign of their current input.

---

## Interaction with `read_input.js`
This script provides the helper functions that handle the mathematical operations and input formatting. The `read_input.js` script invokes these functions to process and display mathematical expressions entered by the user. The two scripts work together to manage user input, mathematical operations, and output display in a calculator-like interface.

# Summary of `calculation.js` and `classification.js`

## Overview

The `calculation.js` and `classification.js` files work together to process mathematical expressions entered by the user. `calculation.js` handles the evaluation of expressions, while `classification.js` is responsible for tokenizing and classifying parts of the expression.

## `calculation.js` - Summary

### Purpose
`calculation.js` processes a mathematical expression by first tokenizing it (splitting it into individual components), classifying those tokens (identifying the type of each token), and then evaluating the expression step-by-step. It handles operators, mathematical functions, and special operations like factorials and trigonometric functions.

### Key Functions

1. **factorial(n)**  
   - Computes the factorial of a number `n`.
   - Used for the `!` operator (e.g., `5!` → `120`).

2. **getCurrentMode()**  
   - Determines the current mode (DEG or RAD).
   - It checks if the DEG or RAD button is active on the UI to decide whether trigonometric functions should operate in degrees or radians.

3. **degreesToRadians(degrees)**  
   - Converts degrees to radians.
   - Used in conjunction with `getCurrentMode()` to adjust the argument of trigonometric functions if in DEG mode.

4. **evaluateFunction(fn, arg)**  
   - Evaluates various functions like trigonometric functions (`sin`, `cos`, `tan`, etc.), logarithmic functions (`log`, `ln`), and other mathematical functions (`sqrt`, `rand`, etc.).
   - Converts arguments for trigonometric functions if necessary (DEG to RAD).

5. **calculate(expression)**  
   - **Main function** that processes an expression:
     - **Tokenizes** the expression using `tokenize` from `classification.js`.
     - **Classifies** each token using `classifyToken` from `classification.js`.
     - **Shunting Yard Algorithm**: Converts the expression into a format that is easier to evaluate by placing operators and operands in an output queue.
     - **Evaluates** the expression by applying operators and functions in the correct order, using a stack-based approach.
     - Handles special cases like factorials and parentheses.
     - Stores the result in a history log via `storeHistory` (not defined in the snippet but presumably logs calculation history).

   - **Handles errors**: If the expression is invalid, the function catches errors (e.g., mismatched parentheses, division by zero) and returns error messages.

6. **storeHistory(time, expression, result)**  
   - Stores the calculation history, including the time, the expression, and the result.

### Workflow

1. The `calculate()` function first tokenizes the expression using `tokenize()` from `classification.js`.
2. It then classifies each token using `classifyToken()`.
3. The tokens are processed using the Shunting Yard algorithm, and operators/functions are applied in sequence.
4. The result is computed, and any errors are caught and displayed.
5. The result is returned and stored in the history.

---

## `classification.js` - Summary

### Purpose
`classification.js` handles the **tokenization** of an expression and **classification** of each token. It breaks down a string expression into smaller parts (tokens), such as numbers, operators, functions, and parentheses, so that `calculation.js` can process them more easily.

### Key Functions

1. **tokenize(expression)**  
   - **Splits** the input expression into individual tokens (e.g., numbers, operators, parentheses).
   - Uses a regular expression to match numbers, functions, operators, and parentheses.
   - Returns an array of tokens, which will then be processed and classified.

2. **classifyToken(token, previousToken)**  
   - **Classifies** each token from the `tokenize()` function.
   - Determines the type of the token: whether it is a number, operator, function (like `sin`, `cos`), parentheses, or special symbols (like modulus or factorial).
   - Supports:
     - **Numbers**: Matches numeric values.
     - **Operators**: Matches basic arithmetic (`+`, `-`, `*`, `/`, `^`, `%`).
     - **Functions**: Identifies trigonometric (`sin`, `cos`, etc.), logarithmic (`log`, `ln`), and other mathematical functions (`rand`, `sqrt`, etc.).
     - **Parentheses**: Identifies opening and closing parentheses.
     - **Special Cases**: Handles modulus (`|`), factorial (`!`), and square root (`√`).
   
3. **processExpression(expression)**  
   - Tokenizes and classifies the expression, logging each token and its type.
   - This function helps verify whether the tokenization and classification process works correctly by logging the results.

### Workflow

1. The `tokenize()` function splits the expression into tokens based on regex matching.
2. Each token is then passed to `classifyToken()` to determine its type (Number, Operator, Function, Parenthesis, etc.).
3. The classified tokens are returned and processed by `calculation.js`.

---

## How These Files Work Together

1. **Expression Flow**:
   - The user inputs a mathematical expression (e.g., `sin(30) + 5!`).
   - The expression is passed to the `calculate()` function in `calculation.js`.
   
2. **Tokenization and Classification**:
   - The `calculate()` function calls `tokenize()` to break the expression into tokens.
   - Each token is then classified by `classifyToken()` to identify whether it's a number, operator, function, or parenthesis.
   
3. **Shunting Yard Algorithm**:
   - After classification, the expression is converted into a queue that can be processed using the Shunting Yard algorithm, handling operator precedence and parentheses.

4. **Evaluation**:
   - The tokens are evaluated sequentially, applying operations and functions.
   - If any errors occur (e.g., invalid expression, division by zero), they are caught, and an error message is returned.
   
5. **Final Result**:
   - The result is stored in the history using `storeHistory()` and returned to the user.

---

## Example Usage

1. **User enters an expression** like `sin(30) + 5!`.
2. **Tokenization** splits it into tokens: `['sin', '(', '30', ')', '+', '5', '!']`.
3. **Classification** categorizes these tokens:
   - `sin`: Trigonometric function.
   - `30`: Number.
   - `+`: Operator.
   - `5`: Number.
   - `!`: Factorial operator.
4. **Shunting Yard Algorithm** processes the tokens and applies operator precedence.
5. **Evaluation** calculates the result of the expression and returns it.

---

## Conclusion

The `calculation.js` file is responsible for evaluating mathematical expressions, while `classification.js` assists in parsing and categorizing each part of the expression. The two files work together to process user inputs, handle mathematical operations, and return the correct result.

### `history_store.js` Summary

`history_store.js` is responsible for managing the history of calculations performed in a web-based calculator. It provides functionality to store, retrieve, display, and delete calculation entries, using `localStorage` for persistent storage.

### Key Features:

1. **Store Calculation History**: Calculation results, including the expression, output, and timestamp, are saved in `localStorage` to persist the history even across page reloads.
2. **Display History**: The 10 most recent calculations are displayed on the UI. Each entry is shown in a card format, which includes the time of the calculation, the expression, and the result.
3. **Delete History**: Users can delete individual entries from the history by double-clicking on the corresponding card.
4. **Time Difference**: Timestamps are converted into human-readable formats (e.g., "5 minutes ago") for easier understanding.

### Functions Overview:

- **`getTimeDifference(timestamp)`**: Converts a timestamp into a human-readable time difference (e.g., "2 minutes ago").
- **`getHistoryFromStorage()`**: Retrieves the stored calculation history from `localStorage`.
- **`updateHistoryInStorage(history)`**: Updates the calculation history stored in `localStorage`.
- **`createHistoryCard(entry, index)`**: Generates a UI card for displaying each history entry, including the time, expression, and result.
- **`storeHistory(time, expression, output)`**: Adds a new calculation to the history, limits the number of entries to 10, and updates the UI.
- **`deleteHistoryEntry(index)`**: Removes a specific history entry by its index.
- **`updateHistoryUI()`**: Refreshes the UI to display the latest history entries.

### Usage of `localStorage`:

- **Storing History**: The calculation history is stored in `localStorage` under the key `'calculationHistory'`. The data is saved as a JSON string.
- **Retrieving History**: The history is retrieved from `localStorage`. If no history is found, an empty array is returned.
- **Limiting Entries**: The history is limited to the 10 most recent entries. Older entries are automatically removed when a new calculation is added.

### Conclusion:

`history_store.js` offers a robust way to track and display calculation history in a web-based calculator. By leveraging `localStorage`, it ensures that the history persists even after page reloads. This feature provides a seamless user experience by allowing users to view, interact with, and manage their previous calculations.

# `memory_functions.js` Summary

`memory_functions.js` provides functionality for memory operations (store, recall, add, subtract, and clear) in a web-based calculator. It interacts with the UI to allow users to perform memory operations, with the memory data being stored and retrieved from `localStorage` to persist across page reloads.

### Key Features:

1. **Store Calculation in Memory**: Users can store the current value in memory.
2. **Recall Memory**: Users can recall the last stored value from memory and display it in the output field.
3. **Add and Subtract from Memory**: Users can add or subtract the current value to/from the last stored memory value.
4. **Clear Memory**: Users can clear all values stored in memory.
5. **Persistent Memory**: The memory data is saved to and loaded from `localStorage` to persist even after a page reload.

### Functions Overview:

- **`setupMemoryButtons()`**: Initializes and sets up the memory operation buttons (Store, Recall, Add, Subtract, and Clear). It attaches event listeners to each button to handle the respective memory operation.
  
- **`updateLocalStorage()`**: Updates the `localStorage` with the current state of the memory array whenever a memory action is performed.

- **`displayError(msg)`**: Displays an error message in the output field if an invalid action is attempted (e.g., trying to perform a memory operation when the output field is empty).

- **`isValidNumber()`**: Validates if the current value in the output field is a valid number. This check is used to ensure the value is not empty and is a number before performing memory operations.

- **`handleMemoryAction(action)`**: A generic function that handles all memory-related actions (`clear`, `store`, `add`, `minus`, `recall`). Based on the action, it performs the corresponding memory operation and updates the memory array in `localStorage`.

### Memory Operations:

- **Store**: The current number in the output field is added to the memory stack.
  
- **Recall**: The most recent value stored in memory is recalled and displayed in the output field.
  
- **Add**: The current value in the output field is added to the most recent value in the memory stack.
  
- **Subtract**: The current value in the output field is subtracted from the most recent value in the memory stack.
  
- **Clear**: Clears the memory stack, removing all stored values.

### Usage of `localStorage`:

- **Memory Persistence**: The memory array is stored in `localStorage` using the key `'memory'`. This allows memory data to persist across page reloads.
  
- **Updating `localStorage`**: After each memory operation (store, recall, add, subtract, clear), the `updateLocalStorage()` function is called to ensure that the latest memory state is saved.

### Conclusion:

`memory_functions.js` provides essential memory functionality for a calculator, enabling users to store, recall, add, subtract, and clear values from memory. By using `localStorage`, it ensures that memory data is preserved across page reloads, offering a seamless user experience.

# Summary of Calculator Files

This document provides an overview of various files that together implement the functionality of a web-based calculator. These files handle different tasks such as calculations, memory operations, history tracking, and UI interactions.

---

## 1. **`calculation.js`**
### Purpose:
`calculation.js` handles the core logic of evaluating mathematical expressions. It supports operators, functions, factorials, and trigonometric functions.

### Key Features:
- **Tokenization and Classification**: The expression is tokenized and each token is classified (e.g., numbers, operators, functions).
- **Expression Evaluation**: It supports operations like addition, subtraction, multiplication, division, exponentiation, and more. It evaluates expressions using the Shunting Yard algorithm.
- **Mathematical Functions**: It includes functions for trigonometric operations, logarithmic functions, square roots, etc.
- **Error Handling**: Handles errors like division by zero or invalid expressions.
- **History**: Stores calculation results in the history via the `history_store.js` module.
  
---

## 2. **`classification.js`**
### Purpose:
`classification.js` is responsible for breaking down a mathematical expression into tokens and classifying those tokens (e.g., numbers, operators, functions).

### Key Features:
- **Tokenization**: Splits the expression into distinct tokens (numbers, operators, functions, parentheses).
- **Token Classification**: Each token is classified based on its type (e.g., `Number`, `Operator`, `TrigonometricFunction`).
- **Functionality**: Supports a wide variety of functions including trigonometric functions (sin, cos, tan), logarithmic functions (log, ln), and others like factorial, square root, etc.

---

## 3. **`history_store.js`**
### Purpose:
`history_store.js` stores and manages the history of calculations made by the user. It provides the ability to view past calculations and delete them if needed.

### Key Features:
- **Time Difference**: `getTimeDifference()` provides a human-readable string representing the time difference from the current time to when the calculation was performed.
- **Local Storage**: Uses `localStorage` to save the calculation history, ensuring persistence across page reloads.
- **History Management**: It allows for adding new entries to the history, deleting old entries, and displaying the history UI.
- **UI Updates**: Provides functions to display the stored history on the UI and delete an entry from the history.

---

## 4. **`memory_functions.js`**
### Purpose:
`memory_functions.js` handles memory operations for the calculator, enabling users to store, recall, add, subtract, and clear values in memory.

### Key Features:
- **Memory Storage**: Supports storing values in memory, recalling values, and modifying them using add/subtract operations.
- **Error Handling**: Displays errors if invalid memory operations are attempted (e.g., recalling an empty memory).
- **Persistent Memory**: Memory is stored in `localStorage` to persist even after a page reload.
- **Memory Buttons**: Functions to set up and handle memory button events such as Store, Recall, Add, Subtract, and Clear.

---

## 5. **General Flow of Operations**

1. **Calculation Process**: 
    - User inputs a mathematical expression.
    - The expression is tokenized and classified.
    - The tokens are processed using the Shunting Yard algorithm and mathematical functions to compute the result.
    - The result is then displayed on the UI.

2. **History**:
    - Calculation results are stored in the history and can be accessed later. History is updated and displayed dynamically on the UI.
    - History is saved in `localStorage` and can be retrieved even after page reloads.

3. **Memory Operations**:
    - Memory buttons allow users to store, recall, add, subtract, and clear values in memory.
    - Memory is also stored in `localStorage`, ensuring persistence.

---

## Conclusion:
These files work together to provide a fully functional calculator with features like expression evaluation, history tracking, and memory operations. By leveraging `localStorage`, the calculator offers persistent memory and history across sessions. Each file contributes to a specific aspect of the calculator's functionality, making it a comprehensive and interactive web-based tool.
