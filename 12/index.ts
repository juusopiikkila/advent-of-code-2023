import type { ProgramDefinition } from '../utils';

type Combination = number[];

export default class Program implements ProgramDefinition {
    * generateCombinations(
        array: number[],
        maxSum: number,
        startIndex: number = 0,
        currentCombination: Combination = [],
        currentSum: number = 0,
    ): Generator<Combination> {
        // If we've reached the end of the array, check if the current sum equals maxSum
        if (startIndex === array.length) {
            if (currentSum === maxSum) {
                yield currentCombination;
            }

            return;
        }

        // Iterate over possible values for the current position
        for (let index = array[startIndex]; currentSum + index <= maxSum; index += 1) {
            for (const combination of this.generateCombinations(
                array,
                maxSum,
                startIndex + 1,
                [...currentCombination, index],
                currentSum + index,
            )) {
                yield combination;
            }
        }
    }

    getPermutations(line: string, unfold = false) {
        const matches = line.match(/^([#.?]+) ([\d,]+)$/);

        if (!matches) {
            throw new Error(`Invalid input: ${line}`);
        }

        let springs = matches[1];
        let groups = matches[2].split(',').map(Number);

        if (unfold) {
            springs = Array.from({ length: 5 }, () => springs).join('?');
            groups = Array.from({ length: 5 }, () => groups).flat();
        }

        springs = springs.replaceAll(/^\.+/g, '').replaceAll(/\.+$/g, '');

        const springsRegex = new RegExp(`^${springs.replaceAll('.', '\\.').replaceAll('?', '.')}$`);
        const maxSpacers = springs.length - groups.reduce((a, b) => a + b, 0);
        const spacerGroups = Array.from({ length: groups.length - 1 + 2 })
            .map((_, index, array) => (index === 0 || index === array.length - 1 ? 0 : 1));
        const springGroups = groups.map((count) => Array.from({ length: count }, () => '#').join(''));

        let matchingCount = 0;

        for (const combination of this.generateCombinations(spacerGroups, maxSpacers)) {
            const result = combination.map((count, index) => {
                const spacers = Array.from({ length: count }, () => '.').join('');

                return `${spacers}${springGroups[index] || ''}`;
            }).join('');

            if (springsRegex.test(result)) {
                matchingCount += 1;
            }
        }

        return matchingCount;
    }

    runPart1(input: string[]) {
        return input
            .map((line) => this.getPermutations(line))
            .reduce((total, line) => total + line, 0);
    }

    runPart2(input: string[]) {
        return input
            .map((line) => this.getPermutations(line, true))
            .reduce((total, line) => total + line, 0);
    }
}
