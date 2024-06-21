/*
# declare variables computerScore and humanScore for storing respective scores and intitilize them to 0

# funciton to get computer's input: getComputerChoice
    - a random number genertor from 1 to 3 that corresponds to rock, paper and scissor
    - print the value to make sure the association works
    - return and store the output in a varaiable: computerChoice

# function to get user's input: getUserChoice
    - a prompt to get a numerical input from user that associates to the 3 available options
    - print the value to make sure the assocaiation works
    - return and store the output in a variable: humanChoice

# function to play a single round: playRound
    - two parameters that will have arguements computerChoice and humanChoice
    - output the winner as a string
    - increment the variable corresponding to the winner

# function to play best of five rounds: playGame
    - call the playRound fn five times
    - based on the final result of the five rounds declare the final winner in console.log
*/

let computerScore = 0;
let humanScore = 0;

function getComputerChoice()
{
    const choice = Math.ceil(Math.random()*3);
    let computerChoice = "";

    switch(choice)
    {
        case 1: computerChoice = "rock";
            break;
        case 2: computerChoice = "paper";
            break;
        case 3: computerChoice = "scissor";
            break;
        default : computerChoice = "";
    }

    return computerChoice;
}

function getUserChoice()
{
    const choice = parseInt(prompt("Enter the number corresponding to the option you wish to choose: \n1. Rock\n2. Paper\n3. Scissor\n"));
    let humanChoice = "";

    switch(choice)
    {
        case 1: humanChoice = "rock";
            break;
        case 2: humanChoice = "paper";
            break;
        case 3: humanChoice = "scissor";
            break;
        default : humanChoice = "";
    }

    return humanChoice;
}

const choiceOfComputer = getComputerChoice();
const choiceOfUser = getUserChoice();

console.log(`Computer chose: ${choiceOfComputer}\nUser chose: ${choiceOfUser}`);

function playRound(computerChoice, humanChoice)
{
    if (computerChoice == "rock")
        {
            if (humanChoice == "paper")
                {
                    humanScore++;
                    console.log("HAHA!! not so smart huh?");
                }
            else if (humanChoice == "scissor")
                {
                    computerScore++;
                    console.log("MUAHHAHAHA.. count your last few days human.");
                }
            else
                console.log("same same but different!");
        }

    else if (computerChoice == "paper")
        {
            if (humanChoice == "scissor")
                {
                    humanScore++;
                    console.log("HAHA!! not so smart huh?");
                }
            else if (humanChoice == "rock")
                {
                    computerScore++;
                    console.log("MUAHHAHAHA.. count your last few days human.");
                }
            else
                console.log("same same but different!");
        }

    else if (computerChoice == "scissor")
        {
            if (humanChoice == "rock")
                {
                    humanScore++;
                    console.log("HAHA!! not so smart huh?");
                }
            else if (humanChoice == "paper")
                {
                    computerScore++;
                    console.log("MUAHHAHAHA.. count your last few days human.");
                }
            else
                console.log("same same but different!");
        }
    else
        console.log("we have nothing to say");

}

playRound(choiceOfComputer, choiceOfUser);