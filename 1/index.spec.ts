import Program from '.';
import { parseInputString } from '../utils';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should strip characters from string', () => {
        expect(program.getNumbers('1abc2')).toEqual(12);
        expect(program.getNumbers('pqr3stu8vwx')).toEqual(38);
        expect(program.getNumbers('a1b2c3d4e5f')).toEqual(15);
        expect(program.getNumbers('treb7uchet')).toEqual(77);
    });

    it('should sum all values', () => {
        expect(program.getSum([12, 38, 15, 77])).toEqual(142);
    });

    it('should get calibration values', () => {
        const output = program.runPart1(parseInputString(`
            1abc2
            pqr3stu8vwx
            a1b2c3d4e5f
            treb7uchet
        `));

        expect(output).toEqual(142);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should replace words and strip characters from string', () => {
        expect(program.getNumbers('two1nine', true)).toEqual(29);
        expect(program.getNumbers('eightwothree', true)).toEqual(83);
        expect(program.getNumbers('abcone2threexyz', true)).toEqual(13);
        expect(program.getNumbers('xtwone3four', true)).toEqual(24);
        expect(program.getNumbers('4nineeightseven2', true)).toEqual(42);
        expect(program.getNumbers('zoneight234', true)).toEqual(14);
        expect(program.getNumbers('7pqrstsixteen', true)).toEqual(76);
    });

    it('should sum all values', () => {
        expect(program.getSum([12, 38, 15, 77])).toEqual(142);
    });

    it('should get calibration values', () => {
        const output = program.runPart2(parseInputString(`
            two1nine
            eightwothree
            abcone2threexyz
            xtwone3four
            4nineeightseven2
            zoneight234
            7pqrstsixteen
        `));

        expect(output).toEqual(281);
    });
});
