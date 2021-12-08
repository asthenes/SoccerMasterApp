import fs from 'fs';
import { main } from './main';
import { getReadInterface } from './readInterface';

//Checks filepaths for promptForFile
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
    const readInterface = await getReadInterface()

    return new Promise(resolve => readInterface.question(query, ans => {
        if (isFilePath(ans)) {
            console.log(ans)
            resolve(ans);
        } else {
            console.log('Trying again...', '\n');
            main('-f');
        }
    }))
}

//sorts teams provided based on their scores in the match
export function sortTeamsByScore(teams: string[], scores: RegExpMatchArray): string[] {
    const sortedTeams = JSON.parse(JSON.stringify(teams))

    sortedTeams.sort(function (_a: string, _b: string) {
        const firstTeamScore = parseInt(scores[0]);
        const secondTeamScore = parseInt(scores[1])
        return firstTeamScore == secondTeamScore ? 0 : firstTeamScore < secondTeamScore ? -1 : 1;
    })

    return sortedTeams;
}

//sorts by current scores, and prints each matchday
let matchDay = 1
export function endMatchDay(trackingMap: Map<string, number>): void {
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
