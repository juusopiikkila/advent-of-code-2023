import type { ProgramDefinition } from '../utils';

type Direction = 'up' | 'down' | 'left' | 'right';

export default class Program implements ProgramDefinition {
    canMove(map: string[][], x: number, y: number, direction: Direction) {
        if (direction === 'up') {
            return map[y - 1]?.[x] === '.';
        }

        if (direction === 'down') {
            return map[y + 1]?.[x] === '.';
        }

        if (direction === 'left') {
            return map[y]?.[x - 1] === '.';
        }

        return map[y]?.[x + 1] === '.';
    }

    parseMap(input: string[]): string[][] {
        return input.map((line) => [...line]);
    }

    moveRocks(map: string[][], cycle = false): string[][] {
        const newMap = map.map((line) => [...line]);
        const directions: Direction[] = ['up', 'left', 'down', 'right'];
        const times = cycle ? 4 : 1;

        for (let index = 0; index < times; index += 1) {
            const direction = directions[index];

            // eslint-disable-next-line no-constant-condition
            while (true) {
                let hasMoved = false;

                for (const [y, line] of newMap.entries()) {
                    for (const [x, char] of line.entries()) {
                        if (char === 'O' && this.canMove(newMap, x, y, direction)) {
                            hasMoved = true;

                            if (direction === 'up') {
                                newMap[y][x] = '.';
                                newMap[y - 1][x] = 'O';
                            }

                            if (direction === 'down') {
                                newMap[y][x] = '.';
                                newMap[y + 1][x] = 'O';
                            }

                            if (direction === 'left') {
                                newMap[y][x] = '.';
                                newMap[y][x - 1] = 'O';
                            }

                            if (direction === 'right') {
                                newMap[y][x] = '.';
                                newMap[y][x + 1] = 'O';
                            }
                        }
                    }
                }

                if (!hasMoved) {
                    break;
                }
            }
        }

        return newMap;
    }

    getLoad(map: string[][]): number {
        return map.reduce((accumulator, line, index, array) => (
            accumulator + (line.filter((char) => char === 'O').length * (array.length - index))
        ), 0);
    }

    runPart1(input: string[]) {
        const map = this.moveRocks(this.parseMap(input));

        return this.getLoad(map);
    }

    packMap(map: string[][]): string {
        return map.map((line) => line.join('')).join('|');
    }

    unPackMap(mapString: string): string[][] {
        return mapString.split('|').map((line) => [...line]);
    }

    runPart2(input: string[]) {
        let map = this.parseMap(input);

        const seen: string[] = [];

        while (!seen.includes(this.packMap(map))) {
            seen.push(this.packMap(map));
            map = this.moveRocks(map, true);
        }

        seen.push(this.packMap(map));

        const cycleStart = seen.indexOf(this.packMap(map)) + 1;
        const cycleEnd = seen.indexOf(this.packMap(map), cycleStart) + 1;

        const cycleIndex = ((1_000_000_000 - cycleStart) % (cycleEnd - cycleStart)) + cycleStart;

        return this.getLoad(this.unPackMap(seen[cycleIndex]));
    }
}
