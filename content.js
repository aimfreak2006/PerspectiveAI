let analyzeButton = null;

const removeAnalyzeButton = () => {
    if (analyzeButton) {
        analyzeButton.remove();
        analyzeButton = null;
    }
}

const createSideAnalysis = () => {
    if (document.getElementById('side-analysis')) return;

    const sideAnalysis = document.createElement('div')
    sideAnalysis.id = 'side-analysis'
    sideAnalysis.className = 'side-analysis';
    sideAnalysis.innerHTML = `
        <h2>Verified Sources</h2>
        <ul>
            <li><a href="#">link1</a></li>
            <li><a href="#">link2</a></li>
            <li><a href="#">link3</a></li>
        </ul>
        <br>
        <h2>Community Summary</h2>
        <p>The quick brown fox jumps over the lazy dog</p>
        <br>
        <h2>USER INPUT</h2>
        <form action="">
            <label for="opinion">What do you think?:</label>
            <input type="text" id="opinion" name="opinion">
        </form>
    `;
    document.body.appendChild(sideAnalysis);
}

document.addEventListener('mouseup', (event) => {
    if (analyzeButton && analyzeButton.contains(event.target)) {
        createSideAnalysis();
        return; // clicked on the button itself, return nothing
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