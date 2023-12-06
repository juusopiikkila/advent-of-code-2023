import Program from '.';
import { parseInputString } from '../utils';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 288', () => {
        const output = program.runPart1(parseInputString(`
            Time:      7  15   30
            Distance:  9  40  200
        `));

        expect(output).toEqual(288);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 71503', () => {
        const output = program.runPart2(parseInputString(`
            Time:      7  15   30
            Distance:  9  40  200
        `));

        expect(output).toEqual(71_503);
    });
});
