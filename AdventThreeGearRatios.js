const fs = require('fs');
const readLine = require("readline");

const fileName = './TestFiles/AdventThreeInput.txt'

async function processLineByLine() {
    const fileStream = fs.createReadStream(fileName)

    const rl = readLine.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let lines = []; // This makes the input into a grid with 
    // lines[y][x] being a character coordinate

    // Read file line by line
    for await (const line of rl) {
        lines.push(line);
    }

    lines.forEach(line => {
        console.log(line);
    });
}

processLineByLine();