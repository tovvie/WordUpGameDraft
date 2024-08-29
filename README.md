# WordUp!

WordUp! is a word-building game where players create words starting with the last letter of the previous word. The game continues until an incorrect word is entered. This provides an engaging challenge for players to adapt and think creatively.

## Features
- Simple and Intuitive UI: The interface is designed to be user-friendly, making it easy for players to focus on the game.
- Word Tracking: The game lists all words submitted during the session.
- Invalid Submission Feedback: Players receive immediate feedback if their word is invalid, either because it doesn't start with the correct letter or because it's a duplicate.
- Leaderboard: Tracks players' scores based on the length of the words they submit. The leaderboard updates in real time and displays scores in descending order.
- Login System: Players can log in with any username and password combination, which is then displayed on the leaderboard.

## Prerequisites

Before running the application, make sure you have the following installed:
- A modern web browser (e.g., Chrome, Firefox, Safari)
- A basic web server (optional, for running the game outside of a local file system)

## Running the Application
To run WordUp! on your local machine, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/wordup.git

2. Navigate to the Project Directory:
‘’bash
cd wordup

3. Open the Game in Your Browser:
You can directly open the index.html file in your web browser.
Alternatively, you can serve the files using a simple HTTP server:
‘’bash
python -m http.server
Then, open http://localhost:8000/WordUpGameDraft/login.html in your browser.

4. Login and Start Playing:
Enter any username and password to log in.
Start building words! The game will track your submissions and update the leaderboard accordingly.
End of Game:
The game ends when a word is submitted that doesn’t follow the rules, or when you choose to stop.
