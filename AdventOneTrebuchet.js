const fs = require('fs');
const readLine = require("readline");

async function processLineByLine() {
    const fileStream = fs.createReadStream('./TestFiles/AdventOne.txt')

    const rl = readLine.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let calibrationSum = 0;

    for await (const line of rl) {
        let firstDigit = line.match(/\d/)[0];
        let lastDigit = reverseString(line).match(/\d/)[0];
        let calibrationNum = parseInt(firstDigit.concat(lastDigit));
        calibrationSum = calibrationSum + calibrationNum;
    }

    console.log("Your calibration sum is: " + calibrationSum);
}

function reverseString(str) {
    let splitString = str.split("");
    let reverseArray = splitString.reverse();
    return reverseArray.join("");
}

processLineByLine();