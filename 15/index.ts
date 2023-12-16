import type { ProgramDefinition } from '../utils';

interface Lens {
    label: string
    focalLength: number
}

export default class Program implements ProgramDefinition {
    getHashValue(input: string) {
        return [...input].reduce((total, char) => (
            ((total + char.codePointAt(0)!) * 17) % 256
        ), 0);
    }

    runOperations(input: string) {
        const boxes = Array.from({ length: 256 }, (): Lens[] => []);

        for (const operation of input.split(',')) {
            const matches = operation.match(/^([a-z]+)([=-])(\d+)?$/);

            if (!matches) {
                throw new Error('Invalid operation');
            }

            const label = matches[1];
            const operator = matches[2];
            const value = matches[3] === undefined ? 0 : Number(matches[3]);
            const boxNumber = this.getHashValue(label) % 256;

            if (operator === '-') {
                boxes[boxNumber] = boxes[boxNumber].filter((lens) => lens.label !== label);
            } else if (operator === '=') {
                const lens = boxes[boxNumber].find((item) => item.label === label);

                if (lens) {
                    lens.focalLength = value;
                } else {
                    boxes[boxNumber].push({ label, focalLength: value });
                }
            }
        }

        return boxes.reduce((total, box, index) => (
            total + box.reduce((boxTotal, lens, lensIndex) => (
                boxTotal + ((index + 1) * (lensIndex + 1) * lens.focalLength)
            ), 0)
        ), 0);
    }

    runPart1(input: string[]) {
        return input[0]
            .split(',')
            .reduce((total, step) => total + this.getHashValue(step), 0);
    }

    runPart2(input: string[]) {
        return this.runOperations(input[0]);
    }
}
