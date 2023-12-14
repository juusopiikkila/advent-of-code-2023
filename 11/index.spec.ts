import Program from '.';
import { parseInputString } from '../utils';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 374', () => {
        const output = program.runPart1(parseInputString(`
            ...#......
            .......#..
            #.........
            ..........
            ......#...
            .#........
            .........#
            ..........
            .......#..
            #...#.....
        `));

        expect(output).toEqual(374);
    });
});

describe('Part 2', () => {
    let program: Program;
    let map: string[];

    beforeEach(() => {
        program = new Program();
        map = parseInputString(`
            ...#......
            .......#..
            #.........
            ..........
            ......#...
            .#........
            .........#
            ..........
            .......#..
            #...#.....
        `);
    });

    it('should return 1030', () => {
        const output = program.getSumOfDistances(map, 10);

        expect(output).toEqual(1030);
    });

    it('should return 8410', () => {
        const output = program.getSumOfDistances(map, 100);

        expect(output).toEqual(8410);
    });
});
