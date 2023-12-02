import type { ProgramDefinition } from '../utils';

type Color = 'blue' | 'green' | 'red';

type Colors = Record<Color, number>;

interface Game {
    id: number
    colors: Colors
}

export default class Program implements ProgramDefinition {
    parseGameInformation(input: string): Game {
        const matches = input.match(/^Game (\d+): (.*?)$/);

        if (!matches) {
            throw new Error('Invalid input');
        }

        const gameNumber = Number(matches[1]);
        const sets = matches[2]
            .split(';')
            .map((set) => Object.fromEntries(
                set.split(',').map((part) => {
                    const [amount, color] = part.trim().split(' ');

                    return [
                        color,
                        Number(amount),
                    ];
                }),
            ));

        return {
            id: gameNumber,
            colors: {
                red: Math.max(0, ...sets.map((set) => set.red).filter((value): value is number => !!value)),
                green: Math.max(0, ...sets.map((set) => set.green).filter((value): value is number => !!value)),
                blue: Math.max(0, ...sets.map((set) => set.blue).filter((value): value is number => !!value)),
            },
        };
    }

    runPart1(input: string[]) {
        const games = input.map((game) => this.parseGameInformation(game));

        const maxColors: Colors = {
            red: 12,
            green: 13,
            blue: 14,
        };

        return games
            .filter((game) => (
                (Object.entries(game.colors) as [Color, number][])
                    .every(([color, amount]) => amount <= maxColors[color])
            ))
            .reduce((total, game) => total + game.id, 0);
    }

    runPart2(input: string[]) {
        const games = input.map((game) => this.parseGameInformation(game));

        return games.reduce((total, game) => (
            total + (game.colors.red * game.colors.green * game.colors.blue)
        ), 0);
    }
}
