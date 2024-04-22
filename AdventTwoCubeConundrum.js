const fs = require('fs');
const readLine = require("readline");

const fileName = './TestFiles/AdventTwoInput.txt'

async function processLineByLine() {
    const fileStream = fs.createReadStream(fileName)

    const rl = readLine.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let gamesPlayed = []; // Each game consists of an array containing all pulls
    // One pull of cubes is an array strucured like [ # red cubes, # green cubes, # blue cubes ]

    // Read file line by line
    for await (const line of rl) {
        let gameString = line.split(': ')[1]; // Remove the "Game ##: " part
        gameString = gameString.split("; "); // Turn into array of pull strings
        let game = [];

        // Parse each game
        gameString.forEach(pullString => {
            let pullArray = pullString.replaceAll(",", "").split(" ");
            let pull = []; // array with just numbers as [ r, g, b ]

            // Parse the rgb from each pull
            for (let i = 0; i < pullArray.length; i += 2) {
                let number = parseInt(pullArray[i]);
                let color = pullArray[i + 1];

                if (color == "red") {
                    pull[0] = number;
                } else if (color == "green") {
                    pull[1] = number;
                } else if (color == "blue") {
                    pull[2] = number;
                } else {
                    console.log("Error: Pull color not found");
                }
            }
            game.push(pull);
        });
        gamesPlayed.push(game);
    }

    let bagContains = [12, 13, 14];
    let sumPossibleGameIDs = 0;
    // Get each came played
    for (let game = 0; game < gamesPlayed.length; game++) {
        let isPossible = true;
        let checkedGame = gamesPlayed[game];

        // Check each pull in the current game but if not possible stop
        for (let pull = 0; pull < checkedGame.length && isPossible; pull++) {
            let checkedPull = checkedGame[pull];

            // Check each color type for possibility
            for (let color = 0; color < 3; color++) {
                // If cubes pulled greater than possible
                if (checkedPull[color] > bagContains[color]) {
                    isPossible = false;
                }
            }
        }

        // If it is possible, add the id to sum
        if (isPossible) {
            sumPossibleGameIDs += (game + 1);
        }
    }

    console.log("The sum of possible games is: " + sumPossibleGameIDs);
}

processLineByLine();