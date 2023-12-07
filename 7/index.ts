import { uniq } from 'lodash';
import { Combination } from 'js-combinatorics';
import type { ProgramDefinition } from '../utils';

interface Hand {
    hand: string[]
    bid: number
}

export default class Program implements ProgramDefinition {
    getCardOrder(useJokers = false) {
        if (useJokers) {
            return [...'AKQT98765432J'];
        }

        return [...'AKQJT98765432'];
    }

    getHands(input: string[]): Hand[] {
        return input.map((line) => {
            const data = line.split(' ');

            return {
                hand: [...data[0]],
                bid: Number(data[1]),
            };
        });
    }

    getUniqueCardCounts(hand: string[]) {
        const counts = Object.fromEntries(
            uniq(hand).map((card) => [card, 0]),
        );

        for (const card of hand) {
            counts[card] += 1;
        }

        return counts;
    }

    isFiveOfAKind(hand: string[]) {
        const counts = this.getUniqueCardCounts(hand);

        return Object.values(counts).includes(5);
    }

    isFourOfAKind(hand: string[]) {
        const counts = this.getUniqueCardCounts(hand);

        return Object.values(counts).includes(4);
    }

    isFullHouse(hand: string[]) {
        const counts = this.getUniqueCardCounts(hand);
        const values = Object.values(counts);

        return values.includes(3) && values.includes(2);
    }

    isThreeOfAKind(hand: string[]) {
        const counts = this.getUniqueCardCounts(hand);

        return Object.values(counts).includes(3);
    }

    isTwoPairs(hand: string[]) {
        const counts = this.getUniqueCardCounts(hand);

        return Object.values(counts).filter((count) => count === 2).length === 2;
    }

    isOnePair(hand: string[]) {
        const counts = this.getUniqueCardCounts(hand);

        return Object.values(counts).filter((count) => count === 2).length === 1;
    }

    getMatrix(size: number): string[] {
        const cards = this.getCardOrder(true).filter((card) => card !== 'J');
        const combinations = Combination.of(cards, size).toArray();

        for (const card of cards) {
            combinations.push(Array.from({ length: size }).map(() => card));
        }

        return combinations;
    }

    getHandValue(originalHand: string[], useJokers = false) {
        const hands = [];

        if (useJokers && originalHand.includes('J')) {
            const jokerCount = originalHand.filter((card) => card === 'J').length;
            const matrix = this.getMatrix(jokerCount);

            for (const row of matrix) {
                const hand = [...originalHand];

                for (const card of row) {
                    hand.splice(hand.indexOf('J'), 1, card);
                }

                hands.push(hand);
            }
        } else {
            hands.push(originalHand);
        }

        for (const hand of hands) {
            if (this.isFiveOfAKind(hand)) {
                return 7;
            }
        }

        for (const hand of hands) {
            if (this.isFourOfAKind(hand)) {
                return 6;
            }
        }

        for (const hand of hands) {
            if (this.isFullHouse(hand)) {
                return 5;
            }
        }

        for (const hand of hands) {
            if (this.isThreeOfAKind(hand)) {
                return 4;
            }
        }

        for (const hand of hands) {
            if (this.isTwoPairs(hand)) {
                return 3;
            }
        }

        for (const hand of hands) {
            if (this.isOnePair(hand)) {
                return 2;
            }
        }

        return 1;
    }

    compareHands(hand1: string[], hand2: string[], useJokers = false) {
        const hand1Counts = this.getHandValue(hand1, useJokers);
        const hand2Counts = this.getHandValue(hand2, useJokers);

        if (hand1Counts > hand2Counts) {
            return 1;
        }

        if (hand1Counts < hand2Counts) {
            return -1;
        }

        const cardOrder = this.getCardOrder(useJokers);

        for (const [index, card] of hand1.entries()) {
            const hand1Index = cardOrder.indexOf(card);
            const hand2Index = cardOrder.indexOf(hand2[index]);

            if (hand1Index < hand2Index) {
                return 1;
            }

            if (hand1Index > hand2Index) {
                return -1;
            }
        }

        return 0;
    }

    runPart1(input: string[]) {
        const hands = this.getHands(input);

        hands.sort((hand1, hand2) => this.compareHands(hand1.hand, hand2.hand));

        const bids = hands.map((hand) => hand.bid);

        return bids.reduce((total, bid, index) => total + bid * (index + 1), 0);
    }

    runPart2(input: string[]) {
        const hands = this.getHands(input);

        hands.sort((hand1, hand2) => this.compareHands(hand1.hand, hand2.hand, true));

        const bids = hands.map((hand) => hand.bid);

        return bids.reduce((total, bid, index) => total + bid * (index + 1), 0);
    }
}
