import { isTieGame, isValid, saveMatchDetails, scores, teams, teamsSorted } from "../../src/matchDetails"

test('saveMatchDetails', () => {
    let match = 'team one 3, team two 5'
    saveMatchDetails(match);
    expect(scores).toEqual(['3', '5']);
    expect(teams).toEqual(['team one 3', 'team two 5']);
    expect(teamsSorted).toEqual(['team two', 'team one']);
    expect(isTieGame).toEqual(false);
    expect(isValid).toEqual(true);
    jest.clearAllMocks()
})