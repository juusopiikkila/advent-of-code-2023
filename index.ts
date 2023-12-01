import minimist from 'minimist';
import { ProgramDefinition, printAnswer, readFileToArray } from './utils';

const argv = minimist(process.argv.slice(2));

const day = argv.day || process.env.DAY || (new Date()).getDate();

console.log(`Running day ${day}`);
console.log('----------------');

async function main() {
    const module = await import(`./${day}/index.ts`);
    const input = await readFileToArray(`./${day}/input.txt`);

    console.log('Part 1');
    console.time('Execution time');
    // eslint-disable-next-line new-cap
    const part1Instance = new module.default() as ProgramDefinition;
    const part1Answer = await part1Instance.runPart1(input);
    console.timeEnd('Execution time');

    printAnswer(part1Answer);

    console.log('----------------');

    console.log('Part 2');
    console.time('Execution time');
    // eslint-disable-next-line new-cap
    const part2Instance = new module.default() as ProgramDefinition;
    const part2Answer = await part2Instance.runPart2(input);
    console.timeEnd('Execution time');

    printAnswer(part2Answer);
}

main();
