var HomePage = {

  channels: [],


  initialize: function () {
    console.log("HomePage.initialize");
    HomePage.populateChannels();
    HomePage.initializeChannelList();
  },


  onDeviceReady: function() {
    console.log("HomePage.onDeviceReady");

    // click listeners
    $("#btn-new-channel").click(HomePage.onClickNewChannel);
  },


  // helper functions


  populateChannels: function() {
    HomePage.channels = [];
    var fields = [];
    fields.push( new Field("x","description","string") );
    fields.push( new Field("y","description","string") );
    HomePage.channels.push( new Channel("id_abcdef","MyChannel","Contains two strings, x and y.",fields) );
    var fields = [];
    fields.push( new Field("z","description","string") );
    HomePage.channels.push( new Channel("channel_hash_here","SecondChannel","This is the second channel. It only has one field, z, which is a string.",fields) );
    var fields = [];
    fields.push( new Field("latitude","description","number") );
    fields.push( new Field("longitude","description","number") );
    fields.push( new Field("other","description","string") );
    HomePage.channels.push( new Channel("real_one","LocationMapping","Uses latitude/longitude for location mapping as well as a field for 'other' data.",fields) );
  },


  initializeChannelList: function() {
    // empty the list
    $("#channel-list").empty();

    // add to list
    for (var i in HomePage.channels) {
      var c = HomePage.channels[i];
      $("#channel-list").append('<li><a id="channel_id_'+c.id+'"" class="home-channels-li-click" href="#">'+c.name+'</a></li>');
    }

    // refresh the UI
    $("#channel-list").listview("refresh");

    // add click listener
    for (var i in HomePage.channels) {
      var c = HomePage.channels[i];
      $("#channel_id_"+c.id).click({index: i},HomePage.onClickChannel);
    }
  },


  // callbacks


  onClickChannel: function(event) {
    var channel = HomePage.channels[event.data.index];
    console.log("onClickChannel with channel="+channel.name);
    ShowChannelPage.channel = channel;
    $.mobile.pageContainer.pagecontainer("change", "#show_channel", { changeHash: false, transition: "none" });
  },


  onClickNewChannel: function() {
    console.log("onClickChannel");
    $.mobile.pageContainer.pagecontainer("change", "#new_channel", { changeHash: false, transition: "none" });
  },

}
