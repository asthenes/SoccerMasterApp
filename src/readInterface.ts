import readline from 'readline'
import * as fs from 'fs'
import { promptForFile } from './utils';


export async function getReadInterface(inputType?: string, file?: string): Promise<readline.Interface> {
    let readInterface: readline.Interface;

    if (inputType == '-f') {
            //if input type is a file but none was provided, prompt for one
        if (!file) {
            file = await promptForFile('Input full file path: ')
        }
        readInterface = readline.createInterface({
            input: fs.createReadStream(file),
            output: process.stdout,
            terminal: false
        });
        return readInterface;

        //otherwise listen for stdin from a piped data source
    } else {
        readInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        return readInterface;
    }
}

