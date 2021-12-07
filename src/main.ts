import { endMatchDay, promptForFile } from './utils'
import { wonMatch, tiedMatch } from './constants'
import { isTieGame, isValid, saveMatchDetails, teamsSorted } from './matchDetails';
import readline from 'readline';
import * as fs from 'fs'

export async function main(args?: string): Promise<void> {

  let lineNumber = 0;
  let matchDayTracker: string[] = [];

  let input = process.argv[3];

  if (process.argv[2] == '-f' || args == '-f') {
    if (!input) {
      input = await promptForFile('Input full file path: ')
    }
    var readInterface = readline.createInterface({
      input: fs.createReadStream(input),
      output: process.stdout,
      terminal: false
    })
  } else {
    var readInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
  }

  const trackingMap = new Map<string, number>();

  readInterface.on('line', async (line: string) => {
    ++lineNumber
    //helper function to store details on a match for use in assigning points, including if the match was valid input
    saveMatchDetails(line);

    //if its valid, check if matchdays over, assign points, update trackers, etc.
    if (isValid) {

      if (matchDayTracker.includes(teamsSorted[0] || teamsSorted[1])) {
        endMatchDay(trackingMap);
        matchDayTracker = []
      }

      //saveMatchDetails will sort the teams so the winner is always [0], unless its a tie in which case +1 for both 
      if (!isTieGame) {
        trackingMap.set(teamsSorted[0], wonMatch + (trackingMap.get(teamsSorted[0]) ?? 0))
      } else {
        teamsSorted.forEach(team => trackingMap.set(team, tiedMatch + (trackingMap.get(team) ?? 0)))
      }
    } else {
      console.warn('Invalid input on line #' + lineNumber + ', line was: ' + line)
    }
    matchDayTracker.push(...teamsSorted)
  }).on('close', function () {
    endMatchDay(trackingMap);
    console.log('\n');
    matchDayTracker = [];
    readInterface.close();
  })

}

main()