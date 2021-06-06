# Tic-Tac-Toe game with AI
Web app for the tic-tac-toe game with play against A.I option and a customizable theme.
The AI is made using minmax algorithm.

### Installation
* Download the game from the git repository and then run `npm install`
* run `npm start` to run the game in the browser

### How to play
it is a Tic-Tac-Toe so nothing to be writen here (:

### Modes
* **PvP**: here you can play against one of your friends on the same device
* **PvAI**: here you will be plaing against unbeatable AI.  P.S: try playing with him 3 times and see what happens ;)

### Folder structure
```bash
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── index.js # setup root element for react
    ├── App.js # The App base component, implementation of theme feature
    ├── index.css 
    ├── App.scss 
    ├── components
    │   ├── Home.js # Home Page component
    │   └── Pvsp.js # Playground component for both modes
    ├── images # png images used through the app
    │   ├── ai.png
    │   ├── nenene.png
    │   ├── noCrown.png
    │   ├── OIcon.png
    │   ├── OIconWin.png
    │   ├── XIcon.png
    │   └── XIconWin.png
    └── utils # complex functions used by the components
        ├── isWinning.js # check if there is a winner every turn
        └── minmax.js # custom minmax algorithm implementation for the ai
```
##### Made by Yusef Nsar