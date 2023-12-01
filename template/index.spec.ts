import Program from '.';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 0', () => {
        const output = program.runPart1([]);

        expect(output).toEqual(0);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 1', () => {
        const output = program.runPart2([]);

        expect(output).toEqual(1);
    });
});
