document.addEventListener('DOMContentLoaded', () => {
// References to HTML elements
    const wordInput = document.getElementById('wordInput');
    const submitWord = document.getElementById('submitWord');
    const wordsList = document.getElementById('words');
    const errorDisplay = document.getElementById('error');
    const leaderboardList = document.getElementById('leaderboardList');

    let words = []; // Array to store words used
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '{}'); // Retrieve Leaderboard
    const currentUser = localStorage.getItem('currentUser'); // Retrieve username

    if (!currentUser) {
        window.location.href = 'login.html'; // Redirect to login if not authenticated
    }
// Submit button event listener
    submitWord.addEventListener('click', () => {
        const newWord = wordInput.value.trim().toLowerCase();
        
        // Check if input is empty
        if (!newWord) {
            errorDisplay.textContent = 'Please enter a word.';
            return;
        }
        
        // Check if the word follows the rules
        if (words.length > 0) {
            const lastWord = words[words.length - 1];
            const lastLetter = lastWord.slice(-1); // Last letter of the last word
            
            // Error message
            if (newWord[0] !== lastLetter) {
                errorDisplay.textContent = `Word must start with '${lastLetter}'.`;
                return;
            }
        }
        // Check for duplicate words
        if (words.includes(newWord)) {
            errorDisplay.textContent = 'Word already used. Try a different one.';
            return;
        }

        // Add new word to list
        words.push(newWord);
        updateWordList(); // Updates displayed list
        updateLeaderboard(newWord); // Updates leaderboard
        wordInput.value = ''; // Clears input field
        errorDisplay.textContent = ''; // Clears any error messages
    });

    // Update displayed word list
    function updateWordList() {
        wordsList.innerHTML = ''; // Clears current list
        words.forEach(word => {
            const li = document.createElement('li'); // Creates new list item
            li.textContent = word; // Set the text to the word
            wordsList.appendChild(li); // Add list item to the unordered list
        });
    }

    // Update leaderboard
    function updateLeaderboard(word) {
        const points = word.length; // Calculates points based on word length

        // Update the current user's total points
        let userPoints = parseInt(localStorage.getItem(currentUser) || '0', 10);
        userPoints += points; // Add points to new word
        localStorage.setItem(currentUser, userPoints); // Store points

        // Update leaderboard
        leaderboard[currentUser] = userPoints;
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

        // Sort leaderboard by points in order
        const sortedLeaderboard = Object.entries(leaderboard)
            .sort((a, b) => b[1] - a[1])
            .map(entry => `${entry[0]}: ${entry[1]} points`);

        // Update displayed leaderboard
        leaderboardList.innerHTML = ''; // Clears current leaderboard
        sortedLeaderboard.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            leaderboardList.appendChild(li);
        });
    }
});

