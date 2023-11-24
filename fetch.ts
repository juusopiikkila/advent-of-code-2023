import 'dotenv/config';
import { copy, writeFile } from 'fs-extra';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const year = argv.year || process.env.YEAR || (new Date()).getFullYear();
const day = argv.day || process.env.DAY || (new Date()).getDate();
const sessionToken = process.env.SESSION_TOKEN;

if (!sessionToken) {
    throw new Error('No session token provided');
}

async function main() {
    await copy('./_template', `./${day}`);

    const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        headers: {
            cookie: `session=${sessionToken}`,
        },
    });

    const input = await response.text();

    await writeFile(`./${day}/input.txt`, input);
}

main();
