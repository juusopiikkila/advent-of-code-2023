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

async function copyTemplate() {
    await copy('./_template', `./${day}`);
}

async function fetchInput(): Promise<string> {
    const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        headers: {
            cookie: `session=${sessionToken}`,
        },
    });

    return response.text();
}

async function main() {
    await copyTemplate();

    const input = await fetchInput();

    await writeFile(`./${day}/input.txt`, input);
}

main();
