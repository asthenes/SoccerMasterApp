import { endMatchDay } from './utils'
import { wonMatch, tiedMatch } from './constants'
import { isTieGame, isValid, saveMatchDetails, teamsSorted } from './matchDetails';
import { getReadInterface } from './readInterface';
import readline from 'readline'

export async function main(fileArg?: string): Promise<void> {

  const trimmedArgs = process.argv.splice(2); //remove first 2 default args

  //fileArg is just so the promptForFile function can recall main(-f) on failure
  let readInterface: readline.Interface;
  if (fileArg == '-f') {
    readInterface = await getReadInterface(fileArg)
  } else {
    readInterface = await getReadInterface(trimmedArgs[0], trimmedArgs[1])
  }

  let lineNumber = 0;
  let matchDayTracker: string[] = [];
  const trackingMap = new Map<string, number>();

  readInterface.on('line', async (line: string) => {
    ++lineNumber
    //splits the line into variables to we organize and assign pts
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
      //if its an invalid match, warn and move to next line
      console.warn('\n', 'Invalid input on line #' + lineNumber + ', line was: ' + line)
    }
    matchDayTracker.push(...teamsSorted)
  }).on('close', function () {
    endMatchDay(trackingMap);
    console.log('\n');
    matchDayTracker = [];
    readInterface.close();
  })

}
