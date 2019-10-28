const five = require('johnny-five');
const Tessel = require('tessel-io');
const keypress = require('keypress');
const board = new five.Board({
  io: new Tessel(),
  repl: false,
});


board.on('ready', () => {
  // Write your program locally and push to the Tessel 2 when ready!
  const esc = new five.ESC({
    device: 'FORWARD_REVERSE',
    neutral: 50,
    pin: 'a5',
  });
  // const led = new five.Led('b5');

  function controller (_, key) {
    let isThrottle = false;
    let speed = esc.last ? esc.value : 0;

    console.log(key.name);

    if (key && key.shift) {
      if (key.name == 'c') {
        process.exit(0);
      }

      if (key.name == 'up') {
        speed += 0.01;
        isThrottle = true;
      }

      if (key.name == 'down') {
        speed -= 0.01;
        isThrottle = true;
      }

      if (key.name == 'm') {
        speed = 1;
        isThrottle = true;
      }

      if (key.name == 'n') {
        speed = 0;
        isThrottle = true;
      }

      if (isThrottle) {
        console.log('Setting speed to ', speed);

        esc.speed(speed);
        // led.brightness(Math.round(speed * 255));
      }
    }
  }

  keypress(process.stdin);

  process.stdin.on('keypress', controller);
  if (process.stdin.setRawMode) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
});
