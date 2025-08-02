class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0,
            draw: 0
        };

        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        this.initializeGame();
    }

    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerElement = document.getElementById('currentPlayer');
        this.gameStatusElement = document.getElementById('gameStatus');
        this.resetButton = document.getElementById('resetBtn');
        this.scoreElements = {
            X: document.getElementById('scoreX'),
            O: document.getElementById('scoreO'),
            draw: document.getElementById('scoreDraw')
        };

        this.cells.forEach(cell => {
            cell.addEventListener('click', this.handleCellClick.bind(this));
        });

        this.resetButton.addEventListener('click', this.resetGame.bind(this));
        this.updateDisplay();
    }

    handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.getAttribute('data-index'));

        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }

        this.makeMove(index, cell);
    }

    makeMove(index, cell) {
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        cell.disabled = true;

        if (this.checkWinner()) {
            this.gameActive = false;
            this.gameStatusElement.textContent = `Player ${this.currentPlayer} Wins! 🎉`;
            this.gameStatusElement.className = 'game-status winner';
            this.scores[this.currentPlayer]++;
            this.updateScores();
            this.disableAllCells();
        } else if (this.checkDraw()) {
            this.gameActive = false;
            this.gameStatusElement.textContent = "It's a Draw! 🤝";
            this.gameStatusElement.className = 'game-status draw';
            this.scores.draw++;
            this.updateScores();
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateDisplay();
        }
    }

    checkWinner() {
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    disableAllCells() {
        this.cells.forEach(cell => {
            cell.disabled = true;
        });
    }

    updateDisplay() {
        const playerClass = this.currentPlayer === 'X' ? 'player-x' : 'player-o';
        this.currentPlayerElement.innerHTML = `Current Player: <span class="${playerClass}">${this.currentPlayer}</span>`;
    }

    updateScores() {
        this.scoreElements.X.textContent = this.scores.X;
        this.scoreElements.O.textContent = this.scores.O;
        this.scoreElements.draw.textContent = this.scores.draw;
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;

        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.disabled = false;
            cell.classList.remove('x', 'o');
        });

        this.gameStatusElement.textContent = '';
        this.gameStatusElement.className = 'game-status';
        this.updateDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
