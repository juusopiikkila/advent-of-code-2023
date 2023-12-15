import Program from '.';
import { parseInputString } from '../utils';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 1', () => {
        const output = program.getPermutations('???.### 1,1,3');

        expect(output).toEqual(1);
    });

    it('should return 4', () => {
        const output = program.getPermutations('.??..??...?##. 1,1,3');

        expect(output).toEqual(4);
    });

    it('should return 1', () => {
        const output = program.getPermutations('?#?#?#?#?#?#?#? 1,3,1,6');

        expect(output).toEqual(1);
    });

    it('should return 1', () => {
        const output = program.getPermutations('????.#...#... 4,1,1');

        expect(output).toEqual(1);
    });

    it('should return 4', () => {
        const output = program.getPermutations('????.######..#####. 1,6,5');

        expect(output).toEqual(4);
    });

    it('should return 10', () => {
        const output = program.getPermutations('?###???????? 3,2,1');

        expect(output).toEqual(10);
    });

    it('should return 21', () => {
        const output = program.runPart1(parseInputString(`
            ???.### 1,1,3
            .??..??...?##. 1,1,3
            ?#?#?#?#?#?#?#? 1,3,1,6
            ????.#...#... 4,1,1
            ????.######..#####. 1,6,5
            ?###???????? 3,2,1
        `));

        expect(output).toEqual(21);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 1', () => {
        const output = program.getPermutations('???.### 1,1,3', true);

        expect(output).toEqual(1);
    });

    it('should return 16384', () => {
        const output = program.getPermutations('.??..??...?##. 1,1,3', true);

        expect(output).toEqual(16_384);
    });

    it('should return 1', () => {
        const output = program.getPermutations('?#?#?#?#?#?#?#? 1,3,1,6', true);

        expect(output).toEqual(1);
    });

    it('should return 16', () => {
        const output = program.getPermutations('????.#...#... 4,1,1', true);

        expect(output).toEqual(16);
    });

    it('should return 2500', () => {
        const output = program.getPermutations('????.######..#####. 1,6,5', true);

        expect(output).toEqual(2500);
    });

    it('should return 506250', () => {
        const output = program.getPermutations('?###???????? 3,2,1', true);

        expect(output).toEqual(506_250);
    });

    it('should return 525152', () => {
        const output = program.runPart2(parseInputString(`
            ???.### 1,1,3
            .??..??...?##. 1,1,3
            ?#?#?#?#?#?#?#? 1,3,1,6
            ????.#...#... 4,1,1
            ????.######..#####. 1,6,5
            ?###???????? 3,2,1
        `));

        expect(output).toEqual(525_152);
    });
});
