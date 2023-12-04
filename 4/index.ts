import type { ProgramDefinition } from '../utils';

interface Card {
    id: number
    matchingNumbers: number[]
    value: number
}

export default class Program implements ProgramDefinition {
    splitNumbers(numbers: string): number[] {
        const output: string[] = [];

        for (let index = 0; index < numbers.length; index += 3) {
            const number = numbers.slice(index, index + 2).trim();

            output.push(number);
        }

        return output.map(Number);
    }

    getCardInformation(card: string): Card {
        const matches = card.match(/^Card\s+(\d+): ([\d\s]+) \| ([\d\s]+)$/);

        if (!matches) {
            throw new Error('Invalid card information');
        }

        const winningNumbers = this.splitNumbers(matches[2]);
        const numbers = this.splitNumbers(matches[3]);
        const matchingNumbers = numbers.filter((number) => winningNumbers.includes(number));
        const value = matchingNumbers.reduce((accumulator, number, index) => (
            index === 0 ? 1 : accumulator * 2
        ), 0);

        return {
            id: Number(matches[1]),
            matchingNumbers,
            value,
        };
    }

    runPart1(input: string[]) {
        const cards = input.map((line) => this.getCardInformation(line));

        return cards.reduce((accumulator, card) => accumulator + card.value, 0);
    }

    runPart2(input: string[]) {
        const cards = input.map((line) => this.getCardInformation(line));
        const originalCards = [...cards];

        for (const card of cards) {
            cards.push(...originalCards.slice(card.id, card.id + card.matchingNumbers.length));
        }

        return cards.length;
    }
}
