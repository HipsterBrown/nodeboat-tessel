const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  // Write your program locally and push to the Tessel 2 when ready!
  const esc = new five.ESC(9);
  const led = new five.Led(4);

  esc.speed(0.5);
  led.blink();
});
