import Program, { Map, Node } from '.';
import { parseInputString } from '../utils';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should throw error if left node is not found', () => {
        expect(() => {
            const node = new Node('AAA');

            node.getLeft();
        }).toThrow('Left node not found');
    });

    it('should throw error if right node is not found', () => {
        expect(() => {
            const node = new Node('AAA');

            node.getRight();
        }).toThrow('Right node not found');
    });

    it('should throw error if root node is not found', () => {
        expect(() => {
            const map = new Map(['L']);

            map.getRootNodes();
        }).toThrow('Root node not found');
    });

    it('should throw parse error', () => {
        expect(() => {
            program.parseMap(parseInputString(`
                L

                AAA = (AAA, BBB, CCC)
            `));
        }).toThrow('Invalid line');
    });

    it('should throw error if node is not found', () => {
        expect(() => program.runPart1(parseInputString(`
            L

            AAA = (BBB, CCC)
        `))).toThrow('Nodes not found');
    });

    it('should return 2', () => {
        const output = program.runPart1(parseInputString(`
            RL

            AAA = (BBB, CCC)
            BBB = (DDD, EEE)
            CCC = (ZZZ, GGG)
            DDD = (DDD, DDD)
            EEE = (EEE, EEE)
            GGG = (GGG, GGG)
            ZZZ = (ZZZ, ZZZ)
        `));

        expect(output).toEqual(2);
    });

    it('should return 6', () => {
        const output = program.runPart1(parseInputString(`
            LLR

            AAA = (BBB, BBB)
            BBB = (AAA, ZZZ)
            ZZZ = (ZZZ, ZZZ)
        `));

        expect(output).toEqual(6);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 6', () => {
        const output = program.runPart2(parseInputString(`
            LR

            11A = (11B, XXX)
            11B = (XXX, 11Z)
            11Z = (11B, XXX)
            22A = (22B, XXX)
            22B = (22C, 22C)
            22C = (22Z, 22Z)
            22Z = (22B, 22B)
            XXX = (XXX, XXX)
        `));

        expect(output).toEqual(6);
    });
});
