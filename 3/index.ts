import type { Coord, ProgramDefinition } from '../utils';

export default class Program implements ProgramDefinition {
    parseMap(input: string[]): string[][] {
        return input.map((line) => [...line]);
    }

    getSymbolCoordinates(map: string[][]): { symbol: string; coordinates: Coord }[] {
        const coords: { symbol: string; coordinates: Coord }[] = [];

        for (const [y, yValue] of map.entries()) {
            for (const [x, xValue] of yValue.entries()) {
                if (/[^\d.]/.test(xValue)) {
                    coords.push({
                        symbol: xValue,
                        coordinates: { x, y },
                    });
                }
            }
        }

        return coords;
    }

    getAdjacentNumbers(map: string[][], coord: Coord): number[] {
        const adjacentCoordinates: Coord[] = [
            { x: coord.x - 1, y: coord.y - 1 },
            { x: coord.x - 1, y: coord.y },
            { x: coord.x - 1, y: coord.y + 1 },
            { x: coord.x, y: coord.y - 1 },
            { x: coord.x, y: coord.y + 1 },
            { x: coord.x + 1, y: coord.y - 1 },
            { x: coord.x + 1, y: coord.y },
            { x: coord.x + 1, y: coord.y + 1 },
        ];

        const numbers: number[] = [];
        const usedCoords: Coord[] = [];

        for (const adjacentCoord of adjacentCoordinates) {
            if (usedCoords.some((usedCoord) => (
                usedCoord.x === adjacentCoord.x && usedCoord.y === adjacentCoord.y
            ))) {
                // eslint-disable-next-line no-continue
                continue;
            }

            const value = map[adjacentCoord.y]?.[adjacentCoord.x];

            if (value !== undefined && /\d/.test(value)) {
                const number: string[] = [];
                const { x, y } = adjacentCoord;

                // backward
                for (let index = x - 1; index >= 0; index -= 1) {
                    if (/\D/.test(map[y]?.[index])) {
                        break;
                    }

                    number.unshift(map[y]?.[index]);
                    usedCoords.push({ x: index, y });
                }

                // forward
                for (let index = x; index <= map[y]?.length; index += 1) {
                    if (/\D/.test(map[y]?.[index])) {
                        break;
                    }

                    number.push(map[y]?.[index]);
                    usedCoords.push({ x: index, y });
                }

                numbers.push(Number(number.join('')));
            }
        }

        return numbers;
    }

    runPart1(input: string[]) {
        const map = this.parseMap(input);

        return this.getSymbolCoordinates(map)
            .flatMap((coord) => this.getAdjacentNumbers(map, coord.coordinates))
            .reduce((accumulator, current) => accumulator + current, 0);
    }

    runPart2(input: string[]) {
        const map = this.parseMap(input);

        return this.getSymbolCoordinates(map)
            .filter((coord) => coord.symbol === '*')
            .map((coord) => {
                const adjacentNumbers = this.getAdjacentNumbers(map, coord.coordinates);

                if (adjacentNumbers.length !== 2) {
                    return 0;
                }

                return adjacentNumbers.reduce((accumulator, current) => accumulator * current);
            })
            .reduce((accumulator, current) => accumulator + current, 0);
    }
}
