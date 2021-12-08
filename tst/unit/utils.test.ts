import { endMatchDay, isFilePath, promptForFile, sortTeamsByScore } from "../../src/utils"
import readline from 'readline'

//Need to work on mocking in ts. It's a bit different than what I'm used to
const filePath = '/mnt/e/Code/tsProjects/SoccerMasterApp/README.md'
const incorrectfilePath = '/incorrect/filepath'
const teams = ['a', 'b']
const sortedteams = ['b','a']
const scores = ['1', '2']

test('isFilePathTrue', () => {
    expect(isFilePath(filePath)).toBe(true);
})

test('isFilePathFalse', () => {
  expect(isFilePath(incorrectfilePath)).toBe(false);
})

test('sortTeamsByFunction', () => {
  expect(sortTeamsByScore(teams, scores)).toEqual(sortedteams);
})

test('endMatchDay', () => {
  let matchdayMap = new Map<string, number>();
  matchdayMap.set(sortedteams[0], parseInt(scores[0]));
  matchdayMap.set(sortedteams[1], parseInt(scores[1]));
  matchdayMap.set('c', parseInt('3'));
  console.log = jest.fn()
  endMatchDay(matchdayMap);
  expect(console.log).toHaveBeenCalledTimes(4)
  expect(console.log).toHaveBeenLastCalledWith('b, 1 pts')
  jest.clearAllMocks();
})

test('promptForInput', async () => {
  readline.createInterface = jest.fn().mockReturnValue({
    question: jest.fn().mockImplementationOnce((_questionTest, cb)=> cb(filePath))
  });
  let returnedPath = await promptForFile(filePath);
  expect(returnedPath).toEqual(filePath)
  jest.clearAllMocks();
})
