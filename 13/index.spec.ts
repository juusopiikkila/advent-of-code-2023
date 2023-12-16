import Program from '.';
import { parseInputString } from '../utils';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 0', () => {
        const output = program.runPart1(parseInputString(`
            #.##..##.
            ..#.#..#.

            ##.#.##.#
            #.#..#..#
        `));

        expect(output).toEqual(0);
    });

    it('should return 405', () => {
        const output = program.runPart1(parseInputString(`
            #.##..##.
            ..#.##.#.
            ##......#
            ##......#
            ..#.##.#.
            ..##..##.
            #.#.##.#.

            #...##..#
            #....#..#
            ..##..###
            #####.##.
            #####.##.
            ..##..###
            #....#..#
        `));

        expect(output).toEqual(405);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 400', () => {
        const output = program.runPart2(parseInputString(`
            #.##..##.
            ..#.##.#.
            ##......#
            ##......#
            ..#.##.#.
            ..##..##.
            #.#.##.#.

            #...##..#
            #....#..#
            ..##..###
            #####.##.
            #####.##.
            ..##..###
            #....#..#
        `));

        expect(output).toEqual(400);
    });
});
