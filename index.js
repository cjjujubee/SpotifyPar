var events = require('events');

var progressBar = new events.EventEmitter();

progressBar.on('onStart', function(count) {
  console.log('Started at: ' + count);
});

progressBar.on('onProgress', function(count) {
  console.log('You are currently at: ' + count + '%');
});

progressBar.on('onEnd', function(count) {
  console.log('All done at ' + count + '!');
});

for (var i = 0; i <= 100; i++) {
    if (i === 0) {
      progressBar.emit('onStart', i);
    }
    else if (i === 100) {
      progressBar.emit('onEnd', i);
    }
    else if (i % 10 === 0) {
      progressBar.emit('onProgress', i);
    }
}



// var progress = function(onStart, onProgress, onEnd) {
//   var i;
//   for (i = 0; i <= 100; i++) {
//     if (i === 0) {
//       progressBar.emit(onStart, i);
//     }
//     else if (i === 100) {
//       onEnd(i);
//     }
//     else if (i % 10 === 0) {
//       onProgress(i);
//     }
//   }
// };
//
// progress(function(start) {
//   console.log(start);
// }, function(middle) {
//   console.log(middle);
// }, function(end) {
//   console.log(end);
// });
