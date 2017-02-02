var ShowChannelPage = {

  channel: null,
  location: {
    latitude: null,
    longitude: null
  },


  initialize: function () {
    console.log("ShowChannelPage.initialize");

    if (ShowChannelPage.channel != null) {
      //console.log("showing channel "+ShowChannelPage.channel.name);
      ShowChannelPage.initializeWithChannel(ShowChannelPage.channel);
    }
  },


  onDeviceReady: function() {
    console.log("ShowChannelPage.onDeviceReady");
    // listeners
    $("#show_channel_submit").click(ShowChannelPage.onClickSubmit);
  },


  // helper functions


  populateFields: function(fields) {
    var jChannelFields = $("#show_channel_fields");
    var list = $.extend(true,[],fields);
    var keys = list.map(function(i) { return i.name; });

    // empty the list
    $("#show_channel_fields").empty();

    // If fields contains lat and long, create those first ...
    //if (["latitude","longitude"] <= keys) {
      if (keys.includes("latitude") && keys.includes("longitude")) {
      // create lat/long
      jChannelFields.append(
        '<div id="collapsible_location" data-role="collapsible" data-collapsed="false"><h3>location</h3><div class="ui-field-contain"><label for="datapoint-latitude">Latitude</label><label name="datapoint-latitude"></label></div><div class="ui-field-contain"><label for="datapoint-longitude">Longitude</label><label name="datapoint-longitude"></label></div><div class="ui-field-contain"><input type="button" value="Update Location" /></div></div></div>'
      );
      $("#collapsible_location").collapsible();
      $("#show_channel_fields input").button();
      // TODO click listeners
      // remove lat/long fields from list of fields
      list = list.filter(function(n) { return !(n.name == "latitude" || n.name == "longitude"); } );
    }
    // ... then, do the rest
    console.log("remainder to populate: " + list.map(function(i){return i.name}));
    // valid Field types: 'integer', 'double', 'boolean', 'string', 'file', 'channel', 'dictionary'
    list.forEach(function(field) {
      var name = field.name;
      var description = field.description;
      if (["boolean"].includes(field.type)) {
        jChannelFields.append(
          '<div class="collapsible_field" data-role="collapsible" data-collapsed="false"><h3>' + name + '</h3><div class="ui-checkbox"><label class="ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off">' + name + '</label><input type="checkbox" id="channel_field_' + name + '" data-corners="false" data-enhanced="true"></input></div><p>' + description + '</p></div>'
        );
      } else if (["integer", "double"].includes(field.type)) {
        jChannelFields.append(
          '<div class="collapsible_field" data-role="collapsible" data-collapsed="false"><h3>' + name + '</h3><input type="number" id="channel_field_' + name + '" value=""><p>' + description + '</p></div>'
        );
      } else if (["string", "file", "channel", "dictionary"].includes(field.type)) {
        jChannelFields.append(
          '<div class="collapsible_field" data-role="collapsible" data-collapsed="false"><h3>' + name + '</h3><input type="text" id="channel_field_' + name + '" value=""><p>' + description + '</p></div>'
        );
      } else {
        throw "FOUND BAD FIELD TYPE " + field.type;
      }
      // TODO listeners
    });

    // refresh the UI
    $(".collapsible_field").collapsible();
    $(".collapsible_field input").textinput();
  },


  initializeWithChannel: function(channel) {
    $("#show_channel_name").text(channel.name);
    $("#show_channel_description").text(channel.description);
    // TODO populate fields for channel
    // $("#show_channel_fields");
    ShowChannelPage.populateFields(channel.fields);
  },


  // callbacks


  onClickSubmit: function() {
    var result = {};
    var fields = ShowChannelPage.channel.fields;

    fields.forEach(function(field) {
      var name = field.name;
      if (name=="latitude") {
        result["latitude"] = location.latitude;
      } else if (name=="longitude") {
        result["longitude"] = location.longitude;
      } else {
        // TODO check for value type
        var value = $("#channel_field_"+name)[0].value;
        result[name] = value;
      }
    });
    console.log(result);
    ShowChannelPage.channel.submitDataPoint(result);
  }

}
