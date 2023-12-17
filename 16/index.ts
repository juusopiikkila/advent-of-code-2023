import type { ProgramDefinition, Coord } from '../utils';

type Direction = 'up' | 'down' | 'left' | 'right';

interface Path {
    direction: Direction
    coord: Coord
}

class Beam {
    public path: Path[];

    public isActive = true;

    constructor(
        private readonly map: Map,
        public startCoordinates: Coord,
        public startDirection: Direction,
        pathHistory: Path[] = [],
    ) {
        this.path = [...pathHistory];
        this.path.push({ direction: startDirection, coord: startCoordinates });
    }

    tick() {
        const current = this.path.at(-1)!;
        const { x, y } = current.coord;
        let { direction } = current;

        const tile = this.map.getTile({ x, y });

        if (tile === '\\') {
            // turn
            const directions: Record<Direction, Direction> = {
                up: 'left',
                down: 'right',
                left: 'up',
                right: 'down',
            };

            direction = directions[direction];
        }

        if (tile === '/') {
            // turn
            const directions: Record<Direction, Direction> = {
                up: 'right',
                down: 'left',
                left: 'down',
                right: 'up',
            };

            direction = directions[direction];
        }

        if (tile === '|' && ['left', 'right'].includes(direction)) {
            // split
            direction = 'up';

            this.map.addBeam(new Beam(this.map, { x, y }, 'down', this.path));
        }

        if (tile === '-' && ['up', 'down'].includes(direction)) {
            // split
            direction = 'left';

            this.map.addBeam(new Beam(this.map, { x, y }, 'right'));
        }

        const nextCoordinates: Coord = {
            up: { x, y: y - 1 },
            down: { x, y: y + 1 },
            left: { x: x - 1, y },
            right: { x: x + 1, y },
        }[direction];

        if (this.path.some((item) => (
            item.coord.x === nextCoordinates.x
            && item.coord.y === nextCoordinates.y
            && item.direction === direction
        ))) {
            this.isActive = false;

            return;
        }

        if (this.map.isOutOfBounds(nextCoordinates)) {
            this.isActive = false;

            return;
        }

        this.path.push({ direction, coord: nextCoordinates });
    }
}

class Map {
    private readonly map: string[][];

    private beams: Beam[] = [];

    constructor(
        map: string[],
    ) {
        this.map = map.map((row) => [...row]);
    }

    isOutOfBounds({ x, y }: Coord): boolean {
        return x < 0 || y < 0 || y >= this.map.length || x >= this.map[y].length;
    }

    getTile({ x, y }: Coord): string | undefined {
        return this.map[y]?.[x];
    }

    addBeam(beam: Beam) {
        if (this.beams.some((existingBeam) => (
            existingBeam.startCoordinates.x === beam.startCoordinates.x
            && existingBeam.startCoordinates.y === beam.startCoordinates.y
            && existingBeam.startDirection === beam.startDirection
        ))) {
            return;
        }

        this.beams.push(beam);
    }

    runBeams() {
        while (this.beams.some((beam) => beam.isActive)) {
            this.beams.forEach((beam) => beam.tick());
        }

        const newMap = [...this.map].map((row) => [...row]);

        this.beams.forEach((beam) => {
            beam.path.forEach(({ coord: { x, y } }) => {
                newMap[y][x] = '#';
            });
        });

        return [...newMap.join('')].filter((char) => char === '#').length;
    }
}

export default class Program implements ProgramDefinition {
    runPart1(input: string[]) {
        const map = new Map(input);

        map.addBeam(new Beam(map, { x: 0, y: 0 }, 'right'));

        return map.runBeams();
    }

    runPart2(input: string[]) {
        const maxX = input[0].length;
        const maxY = input.length;

        const beamCoordinates: Record<Direction, Coord[]> = {
            up: Array.from({ length: maxX }, (_, x) => ({ x, y: maxY - 1 })),
            down: Array.from({ length: maxX }, (_, x) => ({ x, y: 0 })),
            left: Array.from({ length: maxY }, (_, y) => ({ x: maxX - 1, y })),
            right: Array.from({ length: maxY }, (_, y) => ({ x: 0, y })),
        };

        const totals: number[] = [];

        Object.entries(beamCoordinates).forEach(([direction, coordinates]) => {
            coordinates.forEach((coord) => {
                const map = new Map(input);

                map.addBeam(new Beam(map, coord, direction as Direction));

                totals.push(map.runBeams());
            });
        });

        return Math.max(...totals);
    }
}
