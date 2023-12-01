import type { ProgramDefinition } from '../utils';

export default class Program implements ProgramDefinition {
    getNumbers(input: string, replaceWords = false): number {
        let numbers: string[] = [];

        if (replaceWords) {
            const replaceble = {
                one: '1',
                two: '2',
                three: '3',
                four: '4',
                five: '5',
                six: '6',
                seven: '7',
                eight: '8',
                nine: '9',
            };

            for (let index = 0; index < input.length; index += 1) {
                for (const [key, value] of Object.entries(replaceble)) {
                    if (input.slice(index).startsWith(key)) {
                        numbers.push(value);
                    }
                }

                if (/\d/.test(input[index])) {
                    numbers.push(input[index]);
                }
            }
        } else {
            numbers = [...input.replaceAll(/\D/g, '')];
        }

        return Number(`${numbers.at(0)}${numbers.at(-1)}`);
    }

    getSum(numbers: number[]): number {
        return numbers.reduce((a, b) => a + b, 0);
    }

    runPart1(input: string[]) {
        return this.getSum(input.map((line) => this.getNumbers(line)));
    }

    runPart2(input: string[]) {
        return this.getSum(input.map((line) => this.getNumbers(line, true)));
    }
}
