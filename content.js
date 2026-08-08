let analyzeButton = null;
let sidePanel = null;

const removeAnalyzeButton = () => {
    if (analyzeButton) {
        analyzeButton.remove();
        analyzeButton = null;
    }
}

const removeSidePanel = () => {
    if (sidePanel) {
        sidePanel.remove();
        sidePanel = null;
    }
}
const createSidePanel = () => {
    if (sidePanel) return;

    sidePanel = document.createElement('div')
    sidePanel.id = 'side-panel'
    sidePanel.className = 'side-panel';
    sidePanel.innerHTML = `
        <h2>Verified Sources</h2>
        <ul>
            <li><a href="#">brainly</a></li>
            <li><a href="#">source:sogon</a></li>
            <li><a href="#">aimfreak</a></li>
        </ul>
        <br>
        <h2>Community Summary</h2>
        <p>Verdict: False</p>
        <p>This statement is false, the author is spreading misinformation"
        <br>
        <h2>USER INPUT</h2>
        <form action="">
            <label for="opinion">What do you think?:</label>
            <input type="text" id="opinion" name="opinion">
            <input type="submit" value="Submit">
        </form>
    `;
    document.body.appendChild(sidePanel);
}

document.addEventListener('mouseup', (event) => {
    if (analyzeButton && analyzeButton.contains(event.target)) {
        return;
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
        createSidePanel(); // button clicked, handle panel opening logic here
        removeAnalyzeButton();
    });
    document.body.appendChild(analyzeButton);
});

document.addEventListener('mousedown', (event) => {
    const isClickNotButton = analyzeButton && !analyzeButton.contains(event.target);
    const isClickOutsidePanel = sidePanel && !sidePanel.contains(event.target);
    if (isClickNotButton && isClickOutsidePanel) {
        removeSidePanel(); // clicked outside the button, remove it
        removeAnalyzeButton(); // clicked outside the button, remove it
    }
});