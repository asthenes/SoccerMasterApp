import readline from 'readline';
import fs from 'fs';
import { main } from './main';

//function to decide what to do with user input after startup
export function isFilePath(input: string): boolean {
    const exists = fs.existsSync(input);
    if (exists) {
        console.log('file found ');
    } else if (input.includes('/')) {
        console.log('This looks like it might be a file path but no file was found ');
    } else {
        console.log('Make sure its the full file path ');
    }
    return exists;
}

//if a path wasnt included on start, ask for one
export async function promptForFile(query: string): Promise<string> {
    let readInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    return new Promise((resolve, reject) => readInterface.question(query, ans => {
        if (isFilePath(ans)) {
            console.log(ans)
            resolve(ans);
        } else {
            reject(() => {
                console.log('Trying again...', '\n');
                main('-f');

            })
        }
    }));
}

//sorts teams provided based on their scores in the match
export function sortTeamsByScore(teams: string[], scores: RegExpMatchArray): string[] {
    let sortedTeams = JSON.parse(JSON.stringify(teams))

    sortedTeams.sort(function (_a: string, _b: string) {
        const firstTeamScore = parseInt(scores[0]);
        const secondTeamScore = parseInt(scores[1])
        return firstTeamScore == secondTeamScore ? 0 : firstTeamScore < secondTeamScore ? -1 : 1;
    })

    return sortedTeams;
}

let matchDay = 1
export function endMatchDay(trackingMap: Map<string, number>) {
    const sortedTrackingMap = new Map([...trackingMap.entries()].sort((a, b) => b[1] - a[1]));
    const keysIterator = sortedTrackingMap.keys()
    const valuesIterator = sortedTrackingMap.values()

    console.log('\n' + "Matchday ", matchDay);

    let i = 0;
    while (i < 3) {
        console.log(keysIterator.next().value + ', ' + valuesIterator.next().value + ' pts')
        i++
    }
    matchDay++
}
