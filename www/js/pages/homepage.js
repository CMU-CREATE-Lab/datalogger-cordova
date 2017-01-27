var HomePage = {


  initialize: function () {
    console.log("HomePage.initialize");
    // empty the list
    $("#channel-list").empty();
    // add to list
    $("#channel-list").append('<li><a class="home-channels-li-click" href="#">Dynamic I</a></li>');
    $("#channel-list").append('<li><a class="home-channels-li-click" href="#">Second Dynamic</a></li>');
    // refresh the UI
    $("#channel-list").listview("refresh");
    // add click listener
    $(".home-channels-li-click").click(HomePage.onClickChannel);
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
