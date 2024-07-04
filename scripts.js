// Scripting logic for RPS game

let computerScore = 0;
let humanScore = 0;

const displayDiv = document.querySelector("#results");
const humanOptions = document.querySelector("#RPS-option");
const scoreKeep = document.querySelector("#score");
const restart = document.querySelector("#restart");
const endEvent = new CustomEvent("gameOver", {detail:{winner: null}});

displayDiv.textContent = "Let the games begin!"
scoreKeep.textContent = `Human: ${humanScore} \t\t\t Computer: ${computerScore}`;
let humanChoice = '';

humanOptions.addEventListener("click", (e) =>
    {
        humanChoice = e.target.id; playRound(humanChoice);
    });

document.addEventListener("gameOver", (e) =>
    {
        e.detail.winner = humanScore == 5 ? "human" : "bot";
        const announcement =
            e.detail.winner == "human" ?
            "The winner and still the WORLD CHAMPIOONNN!! HOMO FKIN SAPIEENNN!!" :
            "Congrats to me!! You lost to a BOT which makes you the bot"
        displayDiv.textContent = announcement;
        humanOptions.style.display = "none";
        restart.style.display = "inline";
    });

restart.addEventListener("click", startOver);

function getComputerChoice()
{
    let computerChoice = "";
    const choice = Math.ceil(Math.random()*3);

    switch(choice)
    {
        case 1: computerChoice = "rock";
            break;
        case 2: computerChoice = "paper";
            break;
        case 3: computerChoice = "scissors";
            break;
        default : computerChoice = "";
    }

    return computerChoice;
};


function playRound(humanChoice)
{
    // predefined output text to avoid repetation
    const roundHuman = "This round goes to BeingHuman";
    const roundComputer = "This round goes to the Matrix";
    const roundDraw = "same same but different";

    // getting new inputs for each round from the computer
    const computerChoice = getComputerChoice();

    // round begins
    if (computerChoice == "rock" && humanChoice == "scissors" ||
        computerChoice == "paper" && humanChoice == "rock" ||
        computerChoice == "scissors" && humanChoice == "paper")
    {
        computerScore++;
        console.log(roundComputer);
        displayDiv.textContent = roundComputer;
    }
    
    else if (computerChoice == humanChoice)
    {
        console.log(roundDraw);
        displayDiv.textContent = roundDraw;
    }

    else
    {
        humanScore++;
        console.log(roundHuman);
        displayDiv.textContent = roundHuman;
    }
    
    scoreKeep.textContent = `Human: ${humanScore} | Computer: ${computerScore}`;

    if (computerScore == 5 || humanScore == 5)
        document.dispatchEvent(endEvent);
}

function startOver()
{
    computerScore = 0;
    humanScore = 0;
    displayDiv.textContent = "Let the games begin!"
    humanOptions.style.display = "inline";
    restart.style.display = "none";
    scoreKeep.textContent = `Human: ${humanScore} | Computer: ${computerScore}`;
}