

// Internet


function isConnected() {
  var result = false;

  if (navigator.connection.type != Connection.NONE) {
    result = true;
  }

  return result;
}


// Spinner


function showSpinner(text) {
  SpinnerPlugin.activityStart(text, {dimBackground: true});
}


function hideSpinner() {
  SpinnerPlugin.activityStop(null, null);
}


// App-wide Callbacks


// when keyboard appears, we want to scroll the focused textfield into view
function onKeyboardShowInHomePage(keyboardHeight) {
  App.htmlElementToScrollAfterKeyboard.scrollIntoView();
}

function onKeyboardHide(e) {
  console.log("keyboard CLOSE");
  $(App.htmlElementToBlurAfterKeyboardCloses).blur();
}
