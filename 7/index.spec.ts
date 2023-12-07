import Program from '.';
import { parseInputString } from '../utils';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should be in the right order', () => {
        expect(program.getCardOrder()).toEqual([...'AKQJT98765432']);
    });

    it('should be five of a kind', () => {
        const output = program.getHandValue([...'AAAAA']);

        expect(output).toEqual(7);
    });

    it('should be four of a kind', () => {
        const output = program.getHandValue([...'AA8AA']);

        expect(output).toEqual(6);
    });

    it('should be full house', () => {
        const output = program.getHandValue([...'23332']);

        expect(output).toEqual(5);
    });

    it('should be three of a kind', () => {
        const output = program.getHandValue([...'TTT98']);

        expect(output).toEqual(4);
    });

    it('should be two of a kind', () => {
        const output = program.getHandValue([...'23432']);

        expect(output).toEqual(3);
    });

    it('should be one pair', () => {
        const output = program.getHandValue([...'A23A4']);

        expect(output).toEqual(2);
    });

    it('should be high card', () => {
        const output = program.getHandValue([...'23456']);

        expect(output).toEqual(1);
    });

    it('should be in the right order', () => {
        expect(program.compareHands([...'33332'], [...'2AAAA'])).toEqual(1);
        expect(program.compareHands([...'77888'], [...'77788'])).toEqual(1);
        expect(program.compareHands([...'77888'], [...'77888'])).toEqual(0);
    });

    it('should return 6440', () => {
        const output = program.runPart1(parseInputString(`
            32T3K 765
            T55J5 684
            KK677 28
            KTJJT 220
            QQQJA 483
        `));

        expect(output).toEqual(6440);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should be in the right order', () => {
        expect(program.getCardOrder(true)).toEqual([...'AKQT98765432J']);
    });

    it('should be four of a kind', () => {
        expect(program.getHandValue([...'QJJQ2'], true)).toEqual(6);
        expect(program.getHandValue([...'JKKK2'], true)).toEqual(6);
        expect(program.getHandValue([...'T55J5'], true)).toEqual(6);
        expect(program.getHandValue([...'KTJJT'], true)).toEqual(6);
        expect(program.getHandValue([...'QQQJA'], true)).toEqual(6);
    });

    it('should return 5905', () => {
        const output = program.runPart2(parseInputString(`
            32T3K 765
            T55J5 684
            KK677 28
            KTJJT 220
            QQQJA 483
        `));

        expect(output).toEqual(5905);
    });
});
