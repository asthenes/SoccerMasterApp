import readline from 'readline';
import fs from 'fs'

emitData();

function emitData() {
    const readInterface = readline.createInterface({
        input: fs.createReadStream('/mnt/e/Code/tsProjects/SoccerMasterApp/assets/largeFile.txt'),
        output: process.stdout,
        terminal: false
    })

    readInterface.on('line', async (line: string) => {
        await delay(1000);
        console.log(line);
    })
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}