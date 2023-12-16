import { difference, isEqual } from 'lodash';
import type { ProgramDefinition } from '../utils';

export default class Program implements ProgramDefinition {
    getMaps(input: string[]): string[][] {
        const maps: string[][] = [];
        let currentIndex = 0;

        for (const line of input) {
            const map = maps[currentIndex] || [];

            if (line === '') {
                currentIndex += 1;
            } else {
                map.push(line);
                maps[currentIndex] = map;
            }
        }

        return maps;
    }

    getColumn(map: string[], x: number): string {
        return map.map((line) => line[x]).join('');
    }

    checkEquality(data1: string[], data2: string[], checkSmudges: boolean) {
        const maxLength = Math.min(data1.length, data2.length);

        if (maxLength === 0) {
            return false;
        }

        const data1Trimmed = data1.slice(0, maxLength);
        const data2Trimmed = data2.slice(0, maxLength);

        if (checkSmudges) {
            const differentLines = data1Trimmed
                .map((line, index) => [
                    line,
                    data2Trimmed[index],
                ])
                .filter(([line1, line2]) => line1 !== line2);

            const offByOneLines = differentLines.filter(([line1, line2]) => (
                [...line1].filter((char, index) => char !== line2[index]).length === 1
            ));

            return differentLines.length === 1 && offByOneLines.length === 1;
        }

        return isEqual(data1Trimmed, data2Trimmed);
    }

    findReflectionValue(map: string[], checkSmudges = false): number {
        // go vertically
        for (let x = 0; x < map[0].length; x += 1) {
            const forwardColumns: string[] = [];
            const backwardColumns: string[] = [];

            for (let backwardX = x; backwardX >= 0; backwardX -= 1) {
                backwardColumns.push(this.getColumn(map, backwardX));
            }

            const maxX = Math.min(x + 1 + backwardColumns.length, map[0].length);

            for (let forwardX = x + 1; forwardX < maxX; forwardX += 1) {
                forwardColumns.push(this.getColumn(map, forwardX));
            }

            if (this.checkEquality(forwardColumns, backwardColumns, checkSmudges)) {
                return x + 1;
            }
        }

        // go horizontally
        for (let y = 0; y < map.length; y += 1) {
            const forwardLines: string[] = [];
            const backwardLines: string[] = [];

            for (let backwardY = y; backwardY >= 0; backwardY -= 1) {
                backwardLines.push(map[backwardY]);
            }

            const maxY = Math.min(y + 1 + backwardLines.length, map.length);

            for (let forwardY = y + 1; forwardY < maxY; forwardY += 1) {
                forwardLines.push(map[forwardY]);
            }

            if (this.checkEquality(forwardLines, backwardLines, checkSmudges)) {
                return (y + 1) * 100;
            }
        }

        return 0;
    }

    runPart1(input: string[]) {
        return this.getMaps(input)
            .reduce((accumulator, map) => accumulator + this.findReflectionValue(map), 0);
    }

    runPart2(input: string[]) {
        return this.getMaps(input)
            .reduce((accumulator, map) => accumulator + this.findReflectionValue(map, true), 0);
    }
}
