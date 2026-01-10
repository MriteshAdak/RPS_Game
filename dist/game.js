// Main game logic for Rock-Paper-Scissors
import { Choice, RoundOutcome, isValidChoice } from './types.js';
export class RockPaperScissorsGame {
    constructor() {
        // readonly means these can't be changed after construction
        this.WIN_SCORE = 5;
        // Query all DOM elements with null checking
        this.displayDiv = this.getElement("#results");
        this.humanOptions = this.getElement("#RPS-option");
        this.scoreKeep = this.getElement("#score");
        this.restartButton = this.getElement("#restart");
        // Initialize game state
        this.state = {
            humanScore: 0,
            computerScore: 0,
            isGameOver: false
        };
        this.setupEventListeners();
        this.updateDisplay();
    }
    /**
     * Helper method with type guard for null checking
     * This pattern is common in TypeScript for DOM manipulation
     */
    getElement(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            throw new Error(`Element not found: ${selector}`);
        }
        return element;
    }
    setupEventListeners() {
        // Type-safe click handler
        this.humanOptions.addEventListener("click", (e) => {
            const target = e.target;
            const choice = target.id;
            // Use type guard to validate choice
            if (isValidChoice(choice)) {
                this.playRound(choice);
            }
        });
        // Custom event listener with typed detail
        document.addEventListener("gameOver", ((e) => {
            this.handleGameOver(e.detail.winner);
        }));
        this.restartButton.addEventListener("click", () => this.startOver());
    }
    getComputerChoice() {
        const choices = Object.values(Choice);
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }
    determineWinner(humanChoice, computerChoice) {
        if (humanChoice === computerChoice) {
            return RoundOutcome.Draw;
        }
        // Winning conditions for computer
        const computerWins = (computerChoice === Choice.Rock && humanChoice === Choice.Scissors) ||
            (computerChoice === Choice.Paper && humanChoice === Choice.Rock) ||
            (computerChoice === Choice.Scissors && humanChoice === Choice.Paper);
        return computerWins ? RoundOutcome.ComputerWins : RoundOutcome.HumanWins;
    }
    playRound(humanChoice) {
        if (this.state.isGameOver)
            return;
        const computerChoice = this.getComputerChoice();
        const outcome = this.determineWinner(humanChoice, computerChoice);
        // Update scores based on outcome
        if (outcome === RoundOutcome.HumanWins) {
            this.state.humanScore++;
        }
        else if (outcome === RoundOutcome.ComputerWins) {
            this.state.computerScore++;
        }
        this.displayDiv.textContent = outcome;
        this.updateScore();
        // Check for game over
        if (this.state.humanScore === this.WIN_SCORE || this.state.computerScore === this.WIN_SCORE) {
            this.state.isGameOver = true;
            const winner = this.state.humanScore === this.WIN_SCORE ? "human" : "bot";
            // Dispatch typed custom event
            const gameOverEvent = new CustomEvent("gameOver", {
                detail: { winner }
            });
            document.dispatchEvent(gameOverEvent);
        }
    }
    handleGameOver(winner) {
        const announcement = winner === "human"
            ? "The winner and still the WORLD CHAMPIOONNN!! HOMO FKIN SAPIEENNN!!"
            : "Congrats to me!! You lost to a BOT which makes you the bot";
        this.displayDiv.textContent = announcement;
        this.humanOptions.style.display = "none";
        this.restartButton.style.display = "inline";
    }
    updateScore() {
        this.scoreKeep.textContent =
            `Human: ${this.state.humanScore} | Computer: ${this.state.computerScore}`;
    }
    updateDisplay() {
        this.displayDiv.textContent = "Let the games begin!";
        this.updateScore();
    }
    startOver() {
        this.state = {
            humanScore: 0,
            computerScore: 0,
            isGameOver: false
        };
        this.updateDisplay();
        this.humanOptions.style.display = "inline";
        this.restartButton.style.display = "none";
    }
}
//# sourceMappingURL=game.js.map