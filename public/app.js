const socket = io('http://localhost:3002');

socket.on('connect', () => {
  console.log('Connected to the server');
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});

socket.on('set-connection', (val) => {
  console.log(`Server declared connection: ${val}`);
});

const idToNote = {
  46: 'a',
  38: 'b',
  40: 'c',
  47: 'd',
  45: 'e',
  43: 'f',
  36: 'g',
  49: 'h',
  51: 'i',
};

socket.on('note-received', (dataArr) => {
  console.log('note data', dataArr);
  const {type, channel, velocity} = dataArr;
  const $thing = $(`.thing--${idToNote[channel]}`);
  const activeClass = 'active';
  
  if (velocity > 0) {
    const animationDuration = 100 + ((velocity / 127) * 100);
    console.log(`Server emitted note: ${channel} at ${velocity} for ${animationDuration}`);
    $thing
      .stop()
      .addClass(activeClass)
      .css('top', 100 + (velocity / 127) * (window.innerHeight - 142))
      .animate({
        top: 100,
      }, animationDuration, () => {
        $thing.removeClass(activeClass);
      });
  }
});
