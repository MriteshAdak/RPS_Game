// Type definitions for Rock-Paper-Scissors game
/**
 * Enum for game choices - better than string literals because:
 * - Autocomplete support
 * - Compile-time validation
 * - Centralized definition
 */
export var Choice;
(function (Choice) {
    Choice["Rock"] = "rock";
    Choice["Paper"] = "paper";
    Choice["Scissors"] = "scissors";
})(Choice || (Choice = {}));
/**
 * Type guard to check if a string is a valid Choice
 * This is TypeScript-specific pattern for runtime validation
 */
export function isValidChoice(choice) {
    return Object.values(Choice).includes(choice);
}
/**
 * Enum for round outcomes
 */
export var RoundOutcome;
(function (RoundOutcome) {
    RoundOutcome["HumanWins"] = "This round goes to BeingHuman";
    RoundOutcome["ComputerWins"] = "This round goes to the Matrix";
    RoundOutcome["Draw"] = "same same but different";
})(RoundOutcome || (RoundOutcome = {}));
//# sourceMappingURL=types.js.map