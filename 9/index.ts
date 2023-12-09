import type { ProgramDefinition } from '../utils';

export default class Program implements ProgramDefinition {
    getResult(history: string, goBackward = false): number {
        const sets = [history.split(' ').map(Number)];

        while (sets.every((set) => set.some((number) => number !== 0))) {
            const lastSet = sets.at(-1)!;

            const nextSet: number[] = [];

            for (let index = 0; index < lastSet.length - 1; index += 1) {
                nextSet.push(lastSet[index + 1] - lastSet[index]);
            }

            sets.push(nextSet);
        }

        sets.reverse();

        for (const [index, row] of sets.entries()) {
            if (index === 0) {
                row.push(0);
            } else if (goBackward) {
                const belowValue = sets[index - 1].at(0)!;
                const rightValue = row.at(0)!;

                row.unshift(rightValue - belowValue);
            } else {
                const belowValue = sets[index - 1].at(-1)!;
                const leftValue = row.at(-1)!;

                row.push(belowValue + leftValue);
            }
        }

        sets.reverse();

        return sets[0].at(goBackward ? 0 : -1)!;
    }

    runPart1(input: string[]) {
        return input
            .map((line) => this.getResult(line))
            .reduce((accumulator, history) => accumulator + history, 0);
    }

    runPart2(input: string[]) {
        return input
            .map((line) => this.getResult(line, true))
            .reduce((accumulator, history) => accumulator + history, 0);
    }
}
