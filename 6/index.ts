import type { ProgramDefinition } from '../utils';

interface Race {
    time: number
    distance: number
}

export default class Program implements ProgramDefinition {
    getRaces(input: string[], combineNumbers = false): Race[] {
        const times = input[0]
            .replace('Time:', '')
            .trim()
            .replaceAll(/\s+/g, ' ')
            .split(' ')
            .map(Number);

        const distances = input[1]
            .replace('Distance:', '')
            .trim()
            .replaceAll(/\s+/g, ' ')
            .split(' ')
            .map(Number);

        if (combineNumbers) {
            return [
                {
                    time: Number(times.join('')),
                    distance: Number(distances.join('')),
                },
            ];
        }

        return times.map((time, index) => ({
            time,
            distance: distances[index],
        }));
    }

    * getWinningBoats(duration: number, distance: number): Generator<number> {
        for (let index = 0; index <= duration; index += 1) {
            const result = (duration - index) * index;

            if (result > distance) {
                yield result;
            }
        }
    }

    runPart1(input: string[]) {
        const races = this.getRaces(input);

        const winningBoats = races.map((race) => {
            const results: number[] = [];

            for (const result of this.getWinningBoats(race.time, race.distance)) {
                results.push(result);
            }

            return results.length;
        });

        return winningBoats.reduce((accumulator, current) => accumulator * current);
    }

    runPart2(input: string[]) {
        const race = this.getRaces(input, true)[0];
        const results: number[] = [];

        for (const result of this.getWinningBoats(race.time, race.distance)) {
            results.push(result);
        }

        return results.length;
    }
}
