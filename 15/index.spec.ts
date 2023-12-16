import Program from '.';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 52', () => {
        const output = program.runPart1(['HASH']);

        expect(output).toEqual(52);
    });

    it('should return 1320', () => {
        const output = program.runPart1(['rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7']);

        expect(output).toEqual(1320);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 145', () => {
        const output = program.runPart2(['rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7']);

        expect(output).toEqual(145);
    });
});
