import Program from '.';

describe('Template', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 0', async () => {
        const output = await program.runPart1([]);

        expect(output).toEqual(0);
    });

    it('should return 1', async () => {
        const output = await program.runPart2([]);

        expect(output).toEqual(1);
    });
});
