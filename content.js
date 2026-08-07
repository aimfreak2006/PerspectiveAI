let analyzeButton = null;

const removeAnalyzeButton = () => {
    if (analyzeButton) {
        analyzeButton.remove();
        analyzeButton = null;
    }
}

document.addEventListener('mouseup', (event) => {
    if (analyzeButton && analyzeButton.contains(event.target)) {
        return; // clicked on the button itself, do nothing
    }
    removeAnalyzeButton(); // remove old button

    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length === 0) {
        return; // no text selected
    }

    analyzeButton = document.createElement('button');
    analyzeButton.textContent = 'Analyze?';
    analyzeButton.className = 'analyze-button'; // button design, in content.css

    const textRect = window.getSelection().getRangeAt(0).cloneRange();
    textRect.collapse(false);
    const end = textRect.getBoundingClientRect();

    analyzeButton.style.position = 'absolute';
    analyzeButton.style.top = `${window.scrollY + end.bottom - 10}px`; // button in bottom right of selected text
    analyzeButton.style.left = `${window.scrollX + end.right + 5}px`;

    analyzeButton.addEventListener('mousedown', (event) => {
        event.preventDefault();
        // button clicked, handle panel opening logic here
        removeAnalyzeButton();
    });
    document.body.appendChild(analyzeButton);
});

document.addEventListener('mousedown', (event) => {
    if (analyzeButton && !analyzeButton.contains(event.target)) {
        removeAnalyzeButton(); // clicked outside the button, remove it
    }
});