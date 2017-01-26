var App = {

  isDeviceReady: false,
  authorizationStatus: Constants.AuthorizationEnum.NOT_REQUESTED,
  accuracyStatus: Constants.AccuracyEnum.DISABLED,
  htmlElementToScrollAfterKeyboard: null, // this is the HTML element you want to scroll to after the keyboard has been opened
  htmlElementToBlurAfterKeyboardCloses: null, // this is the HTML element you need to blur after the keyboard has been closed to avoid weird glitches on using checkboxradio widgets


  initialize: function () {
    console.log("onInitialize");
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },


  // helper functions


  initializePage: function(pageId) {
    // remove listener for keyboard events
    window.removeEventListener("native.keyboardshow", onKeyboardShowInHomePage);
    window.removeEventListener('native.keyboardhide', onKeyboardHide);

    // Use this if the page needs initialized everytime the page is viewed
    switch (pageId) {
      case Constants.HOME_PAGE:
        HomePage.initialize();
        // listen for keyboard events
        window.addEventListener("native.keyboardshow", onKeyboardShowInHomePage);
        window.addEventListener('native.keyboardhide', onKeyboardHide);
        break;
    }
  },


  // callbacks


  onDeviceReady: function () {
    console.log("onDeviceReady");

    // bind App events
    $(document).on("resume", App.onResume);
    $(document).on("pause", App.onPause);
    $(document).on("pagecontainershow", App.onPageContainerShow);

    HomePage.onDeviceReady();
    App.isDeviceReady = true;

    Location.requestLocationPermission();

    // listen for keyboard events
    window.addEventListener("native.keyboardshow", onKeyboardShowInHomePage);
    window.addEventListener('native.keyboardhide', onKeyboardHide);

    if ($.mobile.pageContainer.pagecontainer("getActivePage")[0].id == Constants.HOME_PAGE) HomePage.initialize();
  },


  onResume: function() {
    console.log("onResume");

    var pageId = $.mobile.pageContainer.pagecontainer("getActivePage")[0].id;
    App.initializePage(pageId);
  },


  onPause: function() {
    console.log("onPause");
  },


  onPageContainerShow: function (event, ui) {
    var pageId = $.mobile.pageContainer.pagecontainer("getActivePage")[0].id;
    console.log("onPageContainerShow: " + pageId);
    App.initializePage(pageId);
  }

}


// HTML body onLoad
$(function() {
  console.log("onLoad");
  App.initialize();
});
