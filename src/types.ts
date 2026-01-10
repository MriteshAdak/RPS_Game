// Type definitions for Rock-Paper-Scissors game

/**
 * Enum for game choices - better than string literals because:
 * - Autocomplete support
 * - Compile-time validation
 * - Centralized definition
 */
export enum Choice {
  Rock = "rock",
  Paper = "paper",
  Scissors = "scissors"
}

/**
 * Type guard to check if a string is a valid Choice
 * This is TypeScript-specific pattern for runtime validation
 */
export function isValidChoice(choice: string): choice is Choice {
  return Object.values(Choice).includes(choice as Choice);
}

/**
 * Interface for game state
 * Interfaces define the "shape" of objects
 */
export interface GameState {
  humanScore: number;
  computerScore: number;
  isGameOver: boolean;
}

/**
 * Union type for possible winners
 * Union types let you specify multiple possible values
 */
export type Winner = "human" | "bot" | null;

/**
 * Interface for custom event detail
 * Extends the generic CustomEvent to be type-safe
 */
export interface GameOverEventDetail {
  winner: Winner;
}

/**
 * Enum for round outcomes
 */
export enum RoundOutcome {
  HumanWins = "This round goes to BeingHuman",
  ComputerWins = "This round goes to the Matrix",
  Draw = "same same but different"
}