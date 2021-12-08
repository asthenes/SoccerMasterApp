# SoccerMaster App

This is a simple app that takes in streaming data from pipes, redirects, or file paths and attempts to get results for a soccer league.
It's built using typescript and node.js, tests with jest, and uses yarn for package management. I developed it in WSL (Windows Subsystem for Linux) using VS Code so it should run on OS X / Unix

## Getting Started

```bash
# Install dependencies and build
yarn install
yarn build

#CLI help is available but its basically the same info as below
yarn cli --help

# If no filepath is provided after -f, it will prompt for one
yarn cli -f 
yarn cli -f <path to your file>

# You can redirect files in this way also
yarn cli < <path to your file>

# And you can pipe in data from an app
node <your app> | yarn cli

# Here are the full commands I used to test all of the above
yarn cli -f assets/sample-input.txt
yarn cli < assets/sample-input.txt

# Have to use node instead of ts-node to pipe in apps or it will print info at the beginning and try to take it as args. this app will pipe in larger text file thats just 100 lines of the sample-input.txt
node dist/tsc/src/inputTestApp.js | yarn cli

# On invalid lines it will console.warn() and move to the next line.
yarn cli < assets/sample-input-witherrors.txt

# This app also uses lint and jest, which can be ran with the commands below.
yarn lint
yarn test
...
```
## Design thoughts

Going into this I wasn't really sure how typescript apps are typically structured, so I settled for splitting things up similar to how I was taught to code at Amazon.

The entrypoint for this app is cli.ts. It has one argument (-f) which designates whether a file will be loaded or not. Leaving this argument out will cause the program to hang while it waits to get input from STDIN, such as when piping data in from a separate app (like inputTestApp.ts)

To read the file or STDIN line by line I use a readline.Interface listening for 'line' events. I split the function responsible for creating this interface into its own module for testing purposes. It takes 2 optional args that indicate what type of input to expect, or if it needs to prompt for a file path. I thought about just made it mandatory to provide a file path on start if specifying (-f) but I wanted the app to work either way.

After figuring out the interface, the app tries to read an incoming line. The first step it takes is to try and split the incoming line into separate variables using the saveMatchDetails function. This is so that the match string can be validated and its separate parts used to make sorted arrays to figure out the winner (or if its a tie)

Validation for the match string involves ensuring it has 2 teams, 2 scores, and that its formatted like 'team name' -> 'score' with the number at the end. 

Most of the logic for printing out matchday info hinges on the map<string, number> used to track each teams points as the match days progress, and a string array that tracks what teams have been seen for that match day.

Once saveMatchDetails() has sorted the team names by their score, we check if they are in the list used to track matchday progress. If they are, we print that matchday, if not we add them in and continue to assigning them points. Point assignment works the same way but for the map. Set the team name and its score to whatever its current score is + the points it won (3 for win, 1 for tie)

when the readInterface runs out of lines it has a close event that we listen for to print out whatever is left for the last matchday.

There are some other small bits of logic in the utils package, like when we prompt for a file, theres an extra function that validates that it exists, and if not, we console.log the failure and then call main with a (-f) arg again so that it will go back through the file prompt function.
