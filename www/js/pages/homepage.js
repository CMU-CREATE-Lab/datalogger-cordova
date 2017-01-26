var HomePage = {


  initialize: function () {
    console.log("HomePage.initialize");
  },


  onDeviceReady: function() {
    console.log("HomePage.onDeviceReady");

    // click listeners
    $(".home-channels-li-click").click(HomePage.onClickChannel);
    $("#btn-new-channel").click(HomePage.onClickNewChannel);
  },


  // helper functions


  // callbacks


  onClickChannel: function() {
    console.log("onClickChannel");
    $.mobile.pageContainer.pagecontainer("change", "#show_channel", { changeHash: false, transition: "none" });
  },


  onClickNewChannel: function() {
    console.log("onClickChannel");
    $.mobile.pageContainer.pagecontainer("change", "#new_channel", { changeHash: false, transition: "none" });
  },

}
