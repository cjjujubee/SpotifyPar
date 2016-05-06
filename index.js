// Try writing a simple progress bar in the callback style. Your progress bar should have three callbacks,
// onStart, onProgress, and onEnd. When you call a start function of the progress bar it should call the
// onStart callback, and begin count from 1 to 100. Every 10 items it counts it should call the onProgress callback,
// providing how far along it is as an argument. Finally it should call the onEnd callback.

var progressBar = function(secondsPast, callback) {
  setTimeout(function() {
    callback();
  }, secondsPast * 1000)
};

// call progressBar 'start' with no seconds a call back => logs something
  // nested callbacks inside? nested timeouts??
var progressBar = 0;
var onStart = function() {
  for (var i = 0; i <= 100; i++) {
    var onProgress = function(progress, callback) {
      setTimeout(function)
    }

    // if (i === 0) {
    //   progressBar(0, function() {
    //
    //   });
    // }
    // else if (i % 10 === 0) {
    //   onProgress
    // }
    // else if (i === 100) {
    //   onEnd
    // }
  }
}

var progress = function(onStart, onProgress, onEnd) {
  var i;
  for (i = 0; i <= 100; i++) {
    progress(function(start) {
      // on start
    }, function(progress) {
      // on P
    }, function(end) {
      // on end
    });
  }
};



// var onStart = function(secondsPast, callback) {
//   setTimeout(function() {
//
//   })
// };

// var makeHistory = function(secondsPast, callback) {
//
//    setTimeout(function(){
//        callback("An Historical Event");
//    }, secondsPast * 1000)
//
// };

// makeHistory(2, function(event) {
//    historyString += event;
//    historyString += " and More stuff happened before ";
//    makeHistory(1, function(event) {
//        historyString += event;
//        historyString += " and this too";
//        console.log(historyString);
//    });
//
// });
