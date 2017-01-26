var HomePage = {


  initialize: function () {
    console.log("HomePage.initialize");

    // browser compatibility issues (Yay?)
    $("#home-panel").find(".ui-btn-active").removeClass("ui-btn-active");
  },


  onDeviceReady: function() {
    console.log("HomePage.onDeviceReady");

    // click listeners
    $(".home-channels-li-click").click(HomePage.onClickTest);
  },


  // helper functions


  // callbacks


  onClickTest: function() {
    console.log("onClickTest");
    $.mobile.pageContainer.pagecontainer("change", "#page3", { changeHash: false, transition: "none" });
  }

}
