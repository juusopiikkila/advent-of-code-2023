import type { ProgramDefinition } from '../utils';

export default class Program implements ProgramDefinition {
    memoize(memo: Record<number, number[]>, pos: number, runs: number[], result: number) {
        const memoPos = memo[pos] || [];

        memo[pos] = memoPos;

        memoPos[runs.length] = result;

        return memoPos[runs.length];
    }

    countArrangements(conditions: string, pos: number, runs: number[], minLength: number, memo: number[][]): number {
        if (typeof memo[pos]?.[runs.length] === 'number') {
            return memo[pos][runs.length];
        }

        if (runs.length === 0) {
            return conditions.includes('#', pos) ? 0 : 1;
        }

        if (pos + minLength > conditions.length) {
            return this.memoize(memo, pos, runs, 0);
        }

        if (conditions[pos] === '.') {
            let nextPos = pos;

            while (conditions[nextPos] === '.') {
                nextPos += 1;
            }

            return this.memoize(memo, pos, runs, this.countArrangements(conditions, nextPos, runs, minLength, memo));
        }

        if (pos >= conditions.length) {
            return this.memoize(memo, pos, runs, runs.length === 0 ? 1 : 0);
        }

        if (conditions[pos] === '#') {
            if (conditions.length - pos < runs[0]) {
                return this.memoize(memo, pos, runs, 0);
            }

            for (let index = 0; index < runs[0]; index += 1) {
                if (conditions[pos + index] === '.') return this.memoize(memo, pos, runs, 0);
            }

            if (conditions[pos + runs[0]] === '#') {
                return this.memoize(memo, pos, runs, 0);
            }

            return this.memoize(
                memo,
                pos,
                runs,
                this.countArrangements(conditions, pos + runs[0] + 1, runs.slice(1), minLength - runs[0] - 1, memo),
            );
        }

        if (conditions[pos] === '?') {
            let result = this.countArrangements(conditions, pos + 1, runs, minLength, memo);

            if (conditions.length - pos < runs[0]) {
                return this.memoize(memo, pos, runs, result);
            }

            for (let index = 0; index < runs[0]; index += 1) {
                if (conditions[pos + index] === '.') {
                    return this.memoize(memo, pos, runs, result);
                }
            }

            if (conditions[pos + runs[0]] === '#') {
                return this.memoize(memo, pos, runs, result);
            }

            result += this.countArrangements(
                conditions,
                pos + runs[0] + 1,
                runs.slice(1),
                minLength - runs[0] - 1,
                memo,
            );

            return this.memoize(memo, pos, runs, result);
        }

        throw new Error("This shouldn't happen");
    }

    getPermutations(line: string, unfold = false) {
        const matches = line.match(/^([#.?]+) ([\d,]+)$/);

        if (!matches) {
            throw new Error(`Invalid input: ${line}`);
        }

        let conditions = matches[1];
        let runs = matches[2].split(',').map(Number);

        if (unfold) {
            conditions = Array.from({ length: 5 }, () => conditions).join('?');
            runs = Array.from({ length: 5 }, () => runs).flat();
        }

        const minLength = runs.reduce((a, b) => a + b) + (runs.length - 1);

        return this.countArrangements(conditions, 0, runs, minLength, []);
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
