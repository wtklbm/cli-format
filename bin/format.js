#!/usr/bin/env node

const { spawn } = require('child_process');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2), {
    boolean: ['c', 'autocorrect', 'h', 'help'],
    alias: {
        c: 'autocorrect',
        h: 'help'
    }
});
let args = argv._;

if (argv.help) {
    showHelp();
    process.exit(0);
}

if (args.length === 0) {
    args = ['.'];
}

function showHelp() {
    console.log(`
Usage: format [options] [files...]

Options:
  -c, --autocorrect    Run autocorrect before prettier
  -h, --help           Show help information

Examples:
  format                    Format all files in current directory
  format file.js            Format specific file
  format --autocorrect      Run autocorrect then prettier
  format --autocorrect dir  Run autocorrect then prettier on directory
`);
}

function runPrettier() {
    const prettier = require.resolve('.bin/prettier', {
        paths: [process.cwd()]
    });
    const child = spawn(prettier, ['--write', ...args], {
        stdio: 'inherit',
        cwd: process.cwd()
    });

    child.on('exit', code => process.exit(code));
}

if (argv.autocorrect) {
    const autocorrect = require.resolve('.bin/autocorrect', {
        paths: [process.cwd()]
    });
    const child = spawn(autocorrect, ['--fix', '--quiet', ...args], {
        stdio: 'inherit',
        cwd: process.cwd()
    });
    child.on('exit', runPrettier);
} else {
    runPrettier();
}
