import * as fsExtra from 'fs-extra';
import {
    findPath,
    generateMap,
    parseInputString,
    printAnswer,
    readFileToArray,
} from '.';

jest.mock('fs-extra');

describe('readFileToArray', () => {
    it('should read a file to an array', async () => {
        const readFileSpy = jest.spyOn(fsExtra, 'readFile').mockImplementation(() => ([
            '1',
            '2',
            '3',
            '4',
            '5',
            '',
        ].join('\n')));

        const filePath = '/path/to/file.json';

        const data = await readFileToArray(filePath);

        expect(readFileSpy).toHaveBeenCalledWith(filePath);

        expect(data).toEqual(['1', '2', '3', '4', '5']);

        readFileSpy.mockRestore();
    });
});

describe('printAnswer', () => {
    it('should print the answer', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        printAnswer(1, 42);

        expect(consoleSpy).toHaveBeenCalledWith('Part 1 answer:', 42);
    });
});

describe('parseInputString', () => {
    it('should parse the input string', () => {
        const input = `
            1
            2
            3
            4

            5
        `;

        expect(parseInputString(input)).toEqual(['1', '2', '3', '4', '', '5']);
    });
});

describe('generateMap', () => {
    it('should generate a map', () => {
        expect(generateMap(2, 2, 0)).toEqual([
            [0, 0],
            [0, 0],
        ]);
    });
});

describe('findPath', () => {
    it('should find a path', async () => {
        const map = [
            '00000000000',
            '01111111110',
            '00000000000',
        ].map((row) => [...row].map(Number));

        const path = await findPath(
            map,
            { x: 1, y: 1 },
            { x: 9, y: 1 },
            {
                acceptableTiles: [1],
                enableDiagonals: true,
            },
        );

        expect(path).toEqual([
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
            { x: 4, y: 1 },
            { x: 5, y: 1 },
            { x: 6, y: 1 },
            { x: 7, y: 1 },
            { x: 8, y: 1 },
            { x: 9, y: 1 },
        ]);
    });
});
