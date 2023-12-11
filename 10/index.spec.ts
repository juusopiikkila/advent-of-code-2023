import Program, { PathFinder } from '.';
import { parseInputString } from '../utils';

describe('PathFinder', () => {
    it('should return |', () => {
        const pathFinder = new PathFinder([
            ['.', 'F', '.'],
            ['J', 'S', 'F'],
            ['.', 'L', '.'],
        ]);

        const output = pathFinder.getStartingTile();

        expect(output).toEqual('|');
    });

    it('should return -', () => {
        const pathFinder = new PathFinder([
            ['.', 'L', '.'],
            ['L', 'S', 'J'],
            ['.', 'F', '.'],
        ]);

        const output = pathFinder.getStartingTile();

        expect(output).toEqual('-');
    });

    it('should return L', () => {
        const pathFinder = new PathFinder([
            ['.', '|', '.'],
            ['J', 'S', '-'],
            ['.', 'F', '.'],
        ]);

        const output = pathFinder.getStartingTile();

        expect(output).toEqual('L');
    });

    it('should return J', () => {
        const pathFinder = new PathFinder([
            ['.', 'F', '.'],
            ['-', 'S', 'F'],
            ['.', 'F', '.'],
        ]);

        const output = pathFinder.getStartingTile();

        expect(output).toEqual('J');
    });

    it('should return 7', () => {
        const pathFinder = new PathFinder([
            ['.', 'J', '.'],
            ['-', 'S', 'L'],
            ['.', '|', '.'],
        ]);

        const output = pathFinder.getStartingTile();

        expect(output).toEqual('7');
    });

    it('should return F', () => {
        const pathFinder = new PathFinder([
            ['.', 'L', '.'],
            ['J', 'S', '-'],
            ['.', '|', '.'],
        ]);

        const output = pathFinder.getStartingTile();

        expect(output).toEqual('F');
    });
});

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 4', () => {
        const output = program.runPart1(parseInputString(`
            .....
            .S-7.
            .|.|.
            .L-J.
            .....
        `));

        expect(output).toEqual(4);
    });

    it('should return 8', () => {
        const output = program.runPart1(parseInputString(`
            ..F7.
            .FJ|.
            SJ.L7
            |F--J
            LJ...
        `));

        expect(output).toEqual(8);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 4', () => {
        const output = program.runPart2(parseInputString(`
            ...........
            .S-------7.
            .|F-----7|.
            .||.....||.
            .||.....||.
            .|L-7.F-J|.
            .|..|.|..|.
            .L--J.L--J.
            ...........
        `));

        expect(output).toEqual(4);
    });

    it('should return 8', () => {
        const output = program.runPart2(parseInputString(`
            .F----7F7F7F7F-7....
            .|F--7||||||||FJ....
            .||.FJ||||||||L7....
            FJL7L7LJLJ||LJ.L-7..
            L--J.L7...LJS7F-7L7.
            ....F-J..F7FJ|L7L7L7
            ....L7.F7||L7|.L7L7|
            .....|FJLJ|FJ|F7|.LJ
            ....FJL-7.||.||||...
            ....L---J.LJ.LJLJ...
        `));

        expect(output).toEqual(8);
    });

    it('should return 10', () => {
        const output = program.runPart2(parseInputString(`
            FF7FSF7F7F7F7F7F---7
            L|LJ||||||||||||F--J
            FL-7LJLJ||||||LJL-77
            F--JF--7||LJLJ7F7FJ-
            L---JF-JLJ.||-FJLJJ7
            |F|F-JF---7F7-L7L|7|
            |FFJF7L7F-JF7|JL---7
            7-L-JL7||F7|L7F-7F7|
            L.L7LFJ|||||FJL7||LJ
            L7JLJL-JLJLJL--JLJ.L
        `));

        expect(output).toEqual(10);
    });
});
