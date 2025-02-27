interface HistoryEntry {
    time: number;
    expression: string;
    output: string;
}

interface TimeUnit {
    unit: string;
    value: number;
}

function getTimeDifference(timestamp: number | string): string {
    const timeUnits: TimeUnit[] = [
        { unit: 'year', value: 365 * 86400 },
        { unit: 'month', value: 30 * 86400 },
        { unit: 'week', value: 7 * 86400 },
        { unit: 'day', value: 86400 },
        { unit: 'hour', value: 3600 },
        { unit: 'minute', value: 60 },
        { unit: 'second', value: 1 }
    ];

    const diffInSeconds = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000);

    for (const { unit, value } of timeUnits) {
        const timeValue = Math.floor(diffInSeconds / value);
        if (timeValue > 0) {
            return `${timeValue} ${unit}${timeValue === 1 ? '' : 's'} ago`;
        }
    }

    return 'Just now';
}

function getHistoryFromStorage(): HistoryEntry[] {
    return JSON.parse(localStorage.getItem('calculationHistory') || '[]');
}

function updateHistoryInStorage(history: HistoryEntry[]): void {
    localStorage.setItem('calculationHistory', JSON.stringify(history));
}

function createHistoryCard(entry: HistoryEntry, index: number): HTMLElement {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.innerText = getTimeDifference(entry.time);
    card.appendChild(cardHeader);

    const inputField = document.createElement('div');
    inputField.classList.add('input-field');
    inputField.innerText = entry.expression;
    card.appendChild(inputField);

    const outputField = document.createElement('div');
    outputField.classList.add('output-field');
    outputField.innerText = entry.output;
    card.appendChild(outputField);

    card.addEventListener('click', () => {
        const inputDisplay = document.querySelector('.input-display') as HTMLInputElement;
        const outputDisplay = document.querySelector('.output-display') as HTMLInputElement;

        inputDisplay.value = entry.expression;
        outputDisplay.value = entry.output;
    });

    card.addEventListener('dblclick', () => {
        deleteHistoryEntry(index);
    });

    return card;
}

export function storeHistory(time: number | Date, expression: string, output: string): void {
    const timestamp = time instanceof Date && !isNaN(time.getTime()) ? time.getTime() : new Date().getTime();
    const history = getHistoryFromStorage();

    history.unshift({ time: timestamp, expression, output });

    if (history.length > 10) {
        history.pop();
    }

    updateHistoryInStorage(history);
    updateHistoryUI();
}

function deleteHistoryEntry(index: number): void {
    const history = getHistoryFromStorage();
    history.splice(index, 1);
    updateHistoryInStorage(history);
    updateHistoryUI();
}

export function updateHistoryUI(): void {
    const historyContainer = document.querySelector('.search-history') as HTMLElement;
    const history = getHistoryFromStorage();

    if (history.length === 0) {
        alert('No history available');
        return;
    }

    historyContainer.innerHTML = '';
    history.forEach((entry, index) => {
        const card = createHistoryCard(entry, index);
        historyContainer.appendChild(card);
    });
}
