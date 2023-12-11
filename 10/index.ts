import { intersection } from 'lodash';
import { type Coord, type ProgramDefinition } from '../utils';

type CompatibilityMap = Record<string, Record<string, string[]>>;

type AdjacentCoordinates = Record<string, Coord>;

export class PathFinder {
    private startCoordinates: Coord;

    private pathCoordinates: Coord[] = [];

    private compatibilityMap: CompatibilityMap = {
        /* eslint-disable @typescript-eslint/naming-convention, quote-props */
        '|': {
            top: ['7', 'F', '|'],
            bottom: ['L', 'J', '|'],
            left: [],
            right: [],
        },
        '-': {
            top: [],
            bottom: [],
            left: ['L', 'F', '-'],
            right: ['7', 'J', '-'],
        },
        'L': {
            top: ['|', 'F', '7'],
            bottom: [],
            left: [],
            right: ['-', 'J', '7'],
        },
        'J': {
            top: ['7', '|', 'F'],
            bottom: [],
            left: ['-', 'L', 'F'],
            right: [],
        },
        '7': {
            top: [],
            bottom: ['J', '|', 'L'],
            left: ['-', 'F', 'L'],
            right: [],
        },
        'F': {
            top: [],
            bottom: ['J', '|', 'L'],
            left: [],
            right: ['-', 'J', '7'],
        },
        /* eslint-enable @typescript-eslint/naming-convention, quote-props */
    };

    constructor(
        private readonly map: string[][],
    ) {
        this.startCoordinates = this.getStartingPosition();

        this.pathCoordinates.push(this.startCoordinates);
    }

    getAdjacentCoordinates({ x, y }: Coord): AdjacentCoordinates {
        return {
            top: { x, y: y - 1 },
            right: { x: x + 1, y },
            bottom: { x, y: y + 1 },
            left: { x: x - 1, y },
        };
    }

    getAdjacentTiles({ x, y }: Coord): AdjacentCoordinates {
        return Object.fromEntries(
            Object.entries(this.getAdjacentCoordinates({ x, y }))
                .filter(([direction, tileCoord]) => (
                    this.map[tileCoord.y]?.[tileCoord.x] !== undefined
                    && !this.pathCoordinates.some((coord) => coord.x === tileCoord.x && coord.y === tileCoord.y)
                    && this.isConnectingTile({ x, y }, direction, tileCoord)
                )),
        );
    }

    getStartingPosition(): Coord {
        for (let y = 0; y < this.map.length; y += 1) {
            for (let x = 0; x < this.map[y].length; x += 1) {
                if (this.map[y][x] === 'S') {
                    return { x, y };
                }
            }
        }

        throw new Error('No starting position found');
    }

    getStartingTile() {
        const adjacentTiles = Object.fromEntries(
            Object.entries(this.getAdjacentCoordinates(this.startCoordinates))
                .filter(([, tileCoord]) => (
                    this.map[tileCoord.y]?.[tileCoord.x] !== undefined
                    && this.map[tileCoord.y]?.[tileCoord.x] !== '.'
                )),
        );

        const possibleTiles: string[][] = [];

        const directionMap: Record<string, string> = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
        };

        for (const [direction, tile] of Object.entries(adjacentTiles)) {
            const directionReversed = directionMap[direction];
            const compatibleTiles = this.compatibilityMap[this.map[tile.y]?.[tile.x]][directionReversed];

            if (compatibleTiles.length > 0) {
                possibleTiles.push(compatibleTiles);
            }
        }

        return intersection(...possibleTiles)[0];
    }

    isConnectingTile(currentCoord: Coord, direction: string, nextCoord: Coord): boolean {
        const currentTile = currentCoord.x === this.startCoordinates.x && currentCoord.y === this.startCoordinates.y
            ? this.getStartingTile()
            : this.map[currentCoord.y]?.[currentCoord.x];

        const nextTile = this.map[nextCoord.y]?.[nextCoord.x];

        return this.compatibilityMap[currentTile]?.[direction]?.includes(nextTile);
    }

    runPath() {
        this.pathCoordinates = this.pathCoordinates.slice(0, 1);

        let currentTile = this.pathCoordinates.at(-1)!;

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const adjacentTiles = Object.values(this.getAdjacentTiles(currentTile));

            if (adjacentTiles.length === 0) {
                break;
            }

            [currentTile] = adjacentTiles;

            this.pathCoordinates.push(currentTile);
        }
    }

    getMaxPathLength(): number {
        this.runPath();

        return this.pathCoordinates.length / 2;
    }

    getEnclosedTiles(): number {
        this.runPath();

        const map = [...this.map].map((line, y) => [...line].map((tile, x) => {
            if (this.pathCoordinates.some((coord) => coord.x === x && coord.y === y)) {
                return tile;
            }

            return '.';
        }));

        map[this.startCoordinates.y][this.startCoordinates.x] = this.getStartingTile();

        let enclosedTileCount = 0;
        let isInside = false;

        for (const [y, line] of map.entries()) {
            for (const [x, tile] of line.entries()) {
                if (
                    this.pathCoordinates.some((coord) => coord.x === x && coord.y === y)
                    && ['J', 'L', '|'].includes(tile)
                ) {
                    isInside = !isInside;
                } else if (
                    !this.pathCoordinates.some((coord) => coord.x === x && coord.y === y)
                    && isInside
                ) {
                    enclosedTileCount += 1;
                }
            }
        }

        return enclosedTileCount;
    }
}

export default class Program implements ProgramDefinition {
    parseMap(input: string[]) {
        return input.map((line) => [...line]);
    }

    runPart1(input: string[]) {
        const map = this.parseMap(input);
        const pathFinder = new PathFinder(map);

        return pathFinder.getMaxPathLength();
    }

    runPart2(input: string[]) {
        const map = this.parseMap(input);
        const pathFinder = new PathFinder(map);

        return pathFinder.getEnclosedTiles();
    }
}
