import 'dotenv/config';
import { copy, writeFile, exists } from 'fs-extra';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const year = (new Date()).getFullYear();
const day = argv.day || (new Date()).getDate();
const sessionToken = process.env.SESSION_TOKEN;

if (!sessionToken) {
    throw new Error('No session token provided');
}

if (!day) {
    throw new Error('No day provided');
}

if (day < 1 || day > 25) {
    throw new Error('Day must be between 1 and 25');
}

async function main() {
    if (await exists(`./${day}`)) {
        throw new Error(`Day ${day} already exists`);
    }

    await copy('./template', `./${day}`);

    const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        headers: {
            cookie: `session=${sessionToken}`,
        },
    });

    const input = await response.text();

    await writeFile(`./${day}/input.txt`, input);

    console.log(`Day ${day} of year ${year} fetched`);
    console.log(`Link to day ${day}: https://adventofcode.com/${year}/day/${day}`);
}

main();
