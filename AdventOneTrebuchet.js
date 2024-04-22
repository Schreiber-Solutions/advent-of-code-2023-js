const fs = require('fs');
const readLine = require("readline");

async function processLineByLine() {
    const fileStream = fs.createReadStream('./TestFiles/AdventOneInputPartOne.txt')

    const rl = readLine.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let calibrationSum = 0;

    for await (const line of rl) {
        let digitLine = wordToNumber(line);
        let firstDigit = digitLine.match(/\d/)[0];
        let lastDigit = reverseString(digitLine).match(/\d/)[0];
        let calibrationNum = parseInt(firstDigit.concat(lastDigit));
        calibrationSum = calibrationSum + calibrationNum;
    }

    console.log("Your calibration sum is: " + calibrationSum);
}

function wordToNumber(str) {
    let tempLine = "";
    for (let i = 0; i < str.length; i++) {
        tempLine = tempLine.concat(str.substring(i, i + 1));
        tempLine = tempLine.replace("zero", '0');
        tempLine = tempLine.replace("one", '1');
        tempLine = tempLine.replace("two", '2');
        tempLine = tempLine.replace("three", '3');
        tempLine = tempLine.replace("four", '4');
        tempLine = tempLine.replace("five", '5');
        tempLine = tempLine.replace("six", '6');
        tempLine = tempLine.replace("seven", '7');
        tempLine = tempLine.replace("eight", '8');
        tempLine = tempLine.replace("nine", '9');
    }
    return tempLine;
}

function reverseString(str) {
    let splitString = str.split("");
    let reverseArray = splitString.reverse();
    return reverseArray.join("");
}

processLineByLine();