const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel(),
});

board.on('ready', function() {
  const esc = new five.ESC({
    device: 'FORWARD_REVERSE',
    neutral: 50,
    pin: 'A5',
  });
  const throttle = new five.Sensor('A7');
  throttle.on("change", function() {
    const speed = throttle.scaleTo(0, 100);
    console.log('Throttle speed', speed);
    if (esc.value !== speed) {
      esc.speed(speed);
    }
  });
});
