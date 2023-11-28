import minimist from 'minimist';
import { printAnswer, readFileToArray } from './utils';

const argv = minimist(process.argv.slice(2));

const day = argv.day || process.env.DAY || (new Date()).getDate();

console.log(`Running day ${day}`);
console.log('----------------');

async function main() {
    const module = await import(`./${day}/index.ts`);

    // eslint-disable-next-line new-cap
    const programInstance = new module.default();

    const input = await readFileToArray(`./${day}/input.txt`);

    const part1Answer = await programInstance.runPart1(input);
    const part2Answer = await programInstance.runPart2(input);

    printAnswer(1, part1Answer);
    printAnswer(2, part2Answer);
}

main();
