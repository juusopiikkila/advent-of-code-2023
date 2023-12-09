import Program from '.';
import { parseInputString } from '../utils';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 114', () => {
        const output = program.runPart1(parseInputString(`
            0 3 6 9 12 15
            1 3 6 10 15 21
            10 13 16 21 30 45
        `));

        expect(output).toEqual(114);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 2', () => {
        const output = program.runPart2(parseInputString(`
            0 3 6 9 12 15
            1 3 6 10 15 21
            10 13 16 21 30 45
        `));

        expect(output).toEqual(2);
    });
});
