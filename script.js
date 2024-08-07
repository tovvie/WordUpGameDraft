document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('wordInput');
    const submitWord = document.getElementById('submitWord');
    const wordsList = document.getElementById('words');
    const errorDisplay = document.getElementById('error');

    let words = [];
    
    submitWord.addEventListener('click', () => {
        const newWord = wordInput.value.trim().toLowerCase();
        
        if (!newWord) {
            errorDisplay.textContent = 'Please enter a word.';
            return;
        }

        if (words.length > 0) {
            const lastWord = words[words.length - 1];
            const lastLetter = lastWord.slice(-1);
            
            if (newWord[0] !== lastLetter) {
                errorDisplay.textContent = `Word must start with '${lastLetter}'.`;
                return;
            }
        }

        if (words.includes(newWord)) {
            errorDisplay.textContent = 'Word already used. Try a different one.';
            return;
        }

        words.push(newWord);
        updateWordList();
        wordInput.value = '';
        errorDisplay.textContent = '';
    });

    function updateWordList() {
        wordsList.innerHTML = '';
        words.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            wordsList.appendChild(li);
        });
    }
});
