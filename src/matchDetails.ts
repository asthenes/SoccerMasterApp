import { numbersRegex } from "./constants";
import { sortTeamsByScore } from "./utils";

//Stores values for the match currently being processed. Should probably use an interface instead
export let scores: RegExpMatchArray;
export let teams: string[];
export let teamsSorted: string[];
export let isTieGame = false;
export let isValid: boolean;

export function saveMatchDetails(match: string): void {
    scores = match.match(numbersRegex) ?? [];
    teams = match.split(', ');

    //checks for 2 scores, 2 teams, and that the string is formatted as TeamName Score, TeamName Sore
    if (scores.length == 2 && teams.length == 2 && teams.map(team => team.endsWith(scores[0] || scores[1]))) {
        isValid = true;
        teamsSorted = sortTeamsByScore(teams, scores).map(item => item.replace(numbersRegex, '').trim());
    } else {
        isValid = false;
    }

    if (scores[0] == scores[1]) {
        isTieGame = true;
    } else {
        isTieGame = false;
    }
}
