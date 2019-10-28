const keypress = require('keypress');

keypress(process.stdin);

process.stdin.on('keypress', (_, key) => console.log(key));

process.stdin.setRawMode(true);
process.stdin.resume();
