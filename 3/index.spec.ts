import Program from '.';
import { parseInputString } from '../utils';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should parse map', () => {
        const output = program.parseMap([
            '123',
            '456',
            '789',
        ]);

        expect(output).toEqual([
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
        ]);
    });

    it('should return symbol coordinates', () => {
        const output = program.getSymbolCoordinates([
            ['.', '.', '.'],
            ['.', '*', '.'],
            ['.', '.', '.'],
        ]);

        expect(output).toEqual([
            { symbol: '*', coordinates: { x: 1, y: 1 } },
        ]);
    });

    it('should return adjacent numbers', () => {
        const output = program.getAdjacentNumbers([
            ['.', '1', '2'],
            ['.', '*', '.'],
            ['3', '4', '.'],
        ], { x: 1, y: 1 });

        expect(output).toContain(12);
        expect(output).toContain(34);
    });

    it('should return 4361', () => {
        const output = program.runPart1(parseInputString(`
            467..114..
            ...*......
            ..35..633.
            ......#...
            617*......
            .....+.58.
            ..592.....
            ......755.
            ...$.*....
            .664.598..
        `));

        expect(output).toEqual(4361);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 467835', () => {
        const output = program.runPart2(parseInputString(`
            467..114..
            ...*......
            ..35..633.
            ......#...
            617*......
            .....+.58.
            ..592.....
            ......755.
            ...$.*....
            .664.598..
        `));

        expect(output).toEqual(467_835);
    });
});
