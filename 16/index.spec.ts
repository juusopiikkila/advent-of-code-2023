import Program from '.';
import { parseInputString } from '../utils';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 46', () => {
        const output = program.runPart1(parseInputString(`
            .|...\\....
            |.-.\\.....
            .....|-...
            ........|.
            ..........
            .........\\
            ..../.\\\\..
            .-.-/..|..
            .|....-|.\\
            ..//.|....
        `));

        expect(output).toEqual(46);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 51', () => {
        const output = program.runPart2(parseInputString(`
            .|...\\....
            |.-.\\.....
            .....|-...
            ........|.
            ..........
            .........\\
            ..../.\\\\..
            .-.-/..|..
            .|....-|.\\
            ..//.|....
        `));

        expect(output).toEqual(51);
    });
});
