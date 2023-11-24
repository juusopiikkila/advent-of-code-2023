import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const day = argv.day || process.env.DAY || (new Date()).getDate();

console.log(`Running day ${day}`);

async function main() {
    const program = await import(`./${day}/index.ts`);

    if (program.main === undefined) {
        throw new Error('No main function exported');
    }

    await program.main();
}

main();
