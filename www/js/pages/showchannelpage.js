var ShowChannelPage = {

  channel: null,


  initialize: function () {
    console.log("ShowChannelPage.initialize");

    if (ShowChannelPage.channel != null) {
      //console.log("showing channel "+ShowChannelPage.channel.name);
      ShowChannelPage.initializeWithChannel(ShowChannelPage.channel);
    }
  },


  onDeviceReady: function() {
    console.log("ShowChannelPage.onDeviceReady");
  },


  // helper functions


  initializeWithChannel(channel) {
    $("#show_channel_name").text(channel.name);
    $("#show_channel_description").text(channel.description);
    // TODO populate fields for channel
    // $("#show_channel_fields");
  }


  // callbacks

}
