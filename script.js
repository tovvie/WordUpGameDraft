document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('wordInput');
    const submitWord = document.getElementById('submitWord');
    const wordsList = document.getElementById('words');
    const errorDisplay = document.getElementById('error');
    const leaderboardList = document.getElementById('leaderboardList');
    const container = document.querySelector('.container');

    submitWord.classList.add('mainButton');

    const restartButton = document.createElement('button');
    restartButton.id = 'restartButton';
    restartButton.classList.add('mainButton');
    restartButton.textContent = 'Restart Game';
    restartButton.style.display = 'none';
    container.appendChild(restartButton);

    let words = [];
    let gameOver = false;
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '{}');
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        window.location.href = 'login.html';
    }

    submitWord.addEventListener('click', () => {
        if (gameOver) return;

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
                endGame();
                return;
            }
        }

        if (words.includes(newWord)) {
            errorDisplay.textContent = 'Word already used. Try a different one.';
            endGame();
            return;
        }

        words.push(newWord);
        updateWordList();
        updateLeaderboard(newWord);
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

    function updateLeaderboard(word) {
        const points = word.length;

        let userPoints = parseInt(localStorage.getItem(currentUser) || '0', 10);
        userPoints += points;
        localStorage.setItem(currentUser, userPoints);

        leaderboard[currentUser] = userPoints;
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

        const sortedLeaderboard = Object.entries(leaderboard)
            .sort((a, b) => b[1] - a[1])
            .map(entry => `${entry[0]}: ${entry[1]} points`);

        leaderboardList.innerHTML = '';
        sortedLeaderboard.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            leaderboardList.appendChild(li);
        });
    }

    function endGame() {
        gameOver = true;
        errorDisplay.textContent += ' Game Over!';
        wordInput.disabled = true;
        submitWord.disabled = true;

        restartButton.style.display = 'block';
    }

    restartButton.addEventListener('click', () => {
        words = [];
        gameOver = false;
        errorDisplay.textContent = '';
        wordInput.disabled = false;
        submitWord.disabled = false;
        wordInput.value = '';
        updateWordList();

        restartButton.style.display = 'none';
    });
});
