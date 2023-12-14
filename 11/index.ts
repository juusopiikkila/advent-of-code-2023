import { Combination } from 'js-combinatorics';
import { type Coord, type ProgramDefinition } from '../utils';

export default class Program implements ProgramDefinition {
    getMap(input: string[]) {
        const map: string[][] = [];

        for (const line of input) {
            const row = [...line];

            if (row.every((tile) => tile === '.')) {
                map.push(Array.from({ length: row.length }, () => '@'));
            } else {
                map.push(row);
            }
        }

        for (let x = 0; x < map[0].length; x += 1) {
            if (map.every((row) => ['.', '@'].includes(row[x]))) {
                for (const row of map) {
                    row[x] = row[x] === '@' ? '!' : '@';
                }
            }
        }

        return map;
    }

    getPairs(map: string[][]): [Coord, Coord][] {
        const galaxies: Coord[] = [];

        for (const [y, row] of map.entries()) {
            for (const [x, tile] of row.entries()) {
                if (tile === '#') {
                    galaxies.push({ x, y });
                }
            }
        }

        const combinations: [number, number][] = Combination.of(galaxies.map((coord, index) => index), 2).toArray();

        return combinations.map(([a, b]) => [galaxies[a], galaxies[b]]);
    }

    getPathCoordinates(from: Coord, to: Coord): Coord[] {
        const coordinates: Coord[] = [];

        let currentX = from.x;
        let currentY = from.y;

        while (currentX < to.x) {
            currentX += 1;

            coordinates.push({ x: currentX, y: currentY });
        }

        while (currentX > to.x) {
            currentX -= 1;

            coordinates.push({ x: currentX, y: currentY });
        }

        while (currentY < to.y) {
            currentY += 1;

            coordinates.push({ x: currentX, y: currentY });
        }

        while (currentY > to.y) {
            currentY -= 1;

            coordinates.push({ x: currentX, y: currentY });
        }

        return coordinates;
    }

    getDistance(map: string[][], from: Coord, to: Coord, multiplier: number): number {
        const path = this.getPathCoordinates(from, to);
        let distance = 0;

        for (const coord of path) {
            if (map[coord.y][coord.x] === '!') {
                distance += multiplier * 2;
            } else if (map[coord.y][coord.x] === '@') {
                distance += multiplier;
            } else {
                distance += 1;
            }
        }

        return distance;
    }

    getSumOfDistances(input: string[], multiplier: number): number {
        const map = this.getMap(input);
        const distances = this.getPairs(map)
            .map(([a, b]: [Coord, Coord]) => this.getDistance(map, a, b, multiplier));

        return distances.reduce((sum, distance) => sum + distance, 0);
    }

    runPart1(input: string[]) {
        return this.getSumOfDistances(input, 2);
    }

    runPart2(input: string[]) {
        return this.getSumOfDistances(input, 1_000_000);
    }
}
