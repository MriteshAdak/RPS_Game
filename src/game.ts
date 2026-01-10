// Main game logic for Rock-Paper-Scissors

import { Choice, GameState, Winner, RoundOutcome, isValidChoice } from './types.js';

export class RockPaperScissorsGame {
  // readonly means these can't be changed after construction
  private readonly WIN_SCORE = 5;
  private readonly displayDiv: HTMLElement;
  private readonly humanOptions: HTMLElement;
  private readonly scoreKeep: HTMLElement;
  private readonly restartButton: HTMLElement;
  
  // private means only this class can access it
  private state: GameState;

  constructor() {
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
  private getElement(selector: string): HTMLElement {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element;
  }

  private setupEventListeners(): void {
    // Type-safe click handler
    this.humanOptions.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLButtonElement;
      const choice = target.id;
      
      // Use type guard to validate choice
      if (isValidChoice(choice)) {
        this.playRound(choice);
      }
    });

    // Custom event listener with typed detail
    document.addEventListener("gameOver", ((e: CustomEvent<{ winner: Winner }>) => {
      this.handleGameOver(e.detail.winner);
    }) as EventListener);

    this.restartButton.addEventListener("click", () => this.startOver());
  }

  private getComputerChoice(): Choice {
    const choices = Object.values(Choice);
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  private determineWinner(humanChoice: Choice, computerChoice: Choice): RoundOutcome {
    if (humanChoice === computerChoice) {
      return RoundOutcome.Draw;
    }

    // Winning conditions for computer
    const computerWins = 
      (computerChoice === Choice.Rock && humanChoice === Choice.Scissors) ||
      (computerChoice === Choice.Paper && humanChoice === Choice.Rock) ||
      (computerChoice === Choice.Scissors && humanChoice === Choice.Paper);

    return computerWins ? RoundOutcome.ComputerWins : RoundOutcome.HumanWins;
  }

  private playRound(humanChoice: Choice): void {
    if (this.state.isGameOver) return;

    const computerChoice = this.getComputerChoice();
    const outcome = this.determineWinner(humanChoice, computerChoice);

    // Update scores based on outcome
    if (outcome === RoundOutcome.HumanWins) {
      this.state.humanScore++;
    } else if (outcome === RoundOutcome.ComputerWins) {
      this.state.computerScore++;
    }

    this.displayDiv.textContent = outcome;
    this.updateScore();

    // Check for game over
    if (this.state.humanScore === this.WIN_SCORE || this.state.computerScore === this.WIN_SCORE) {
      this.state.isGameOver = true;
      const winner: Winner = this.state.humanScore === this.WIN_SCORE ? "human" : "bot";
      
      // Dispatch typed custom event
      const gameOverEvent = new CustomEvent("gameOver", {
        detail: { winner }
      });
      document.dispatchEvent(gameOverEvent);
    }
  }

  private handleGameOver(winner: Winner): void {
    const announcement = winner === "human"
      ? "The winner and still the WORLD CHAMPIOONNN!! HOMO FKIN SAPIEENNN!!"
      : "Congrats to me!! You lost to a BOT which makes you the bot";
    
    this.displayDiv.textContent = announcement;
    this.humanOptions.style.display = "none";
    this.restartButton.style.display = "inline";
  }

  private updateScore(): void {
    this.scoreKeep.textContent = 
      `Human: ${this.state.humanScore} | Computer: ${this.state.computerScore}`;
  }

  private updateDisplay(): void {
    this.displayDiv.textContent = "Let the games begin!";
    this.updateScore();
  }

  private startOver(): void {
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