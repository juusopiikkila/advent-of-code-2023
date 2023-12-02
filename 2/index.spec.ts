import Program from '.';
import { parseInputString } from '../utils';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('non-divisible numbers should throw error', () => {
        expect(() => {
            program.parseGameInformation('Gaame 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green');
        }).toThrow('Invalid input');
    });

    it('should parse game informations', () => {
        const output = program.parseGameInformation('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green');

        expect(output).toEqual({
            id: 1,
            colors: {
                red: 4,
                green: 2,
                blue: 6,
            },
        });
    });

    it('should return 8', () => {
        const output = program.runPart1(parseInputString(`
            Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
            Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
            Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
            Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
            Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `));

        expect(output).toEqual(8);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 2286', () => {
        const output = program.runPart2(parseInputString(`
            Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
            Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
            Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
            Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
            Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `));

        expect(output).toEqual(2286);
    });
});
