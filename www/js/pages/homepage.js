
// TODO - use prototypes for inheritence
// TODO - add a change listener to the <ul> to update the channels
var HomePage =  {
	
	channels: new Array(),
	
	initialize: function() {
	    this.channels = LocalStorage.channels;
	    if (this.channels == null) {
	        this.channels = new Array();
	    }
	},
	
	clearChannels: function() {
		var list = document.getElementById("ul_channels");
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}
	},
	
	displayChannels: function() {
		for (var i = 0; i < this.channels.length; i++) {
			var item = "<li style='list-style-type: none;' class='delete'><a id='channel_" + i + "' href='#channel_page' onclick='HomePage.clickedChannel(this)'>" + this.channels[i].name + "</a></li>";
			$("#ul_channels").append(item);
			$("#ul_channels").listview("refresh");
			
			// Bind on taphold event
			$("#channel_" + i).on("taphold", function(event) {
				var index = event.target.id.substring(8, event.target.id.length);
				index = parseInt(index);
				navigator.notification.confirm(
					"Would you like to remove '" + HomePage.channels[index].name + "' from your list of channels?",
					 function(buttonIndex) {
						if (buttonIndex == 1) {
							HomePage.channels[index] = null;
							var temp = new Array();
							for (var i = 0; i < HomePage.channels.length; i++) {
								if (HomePage.channels[i] != null) {
									temp.push(HomePage.channels[i]);
								}
							}
							HomePage.channels = temp;
							LocalStorage.saveChannels(HomePage.channels);
							HomePage.clearChannels();
							HomePage.displayChannels();
						}
					 },
					'Remove Channel',
					['Yes','No']
				);
			});
		}
	},
	
	clickedChannel: function(item) {
		var index = item.id.substring(8, item.id.length);
		index = parseInt(index);
		ChannelPage.initialize(this.channels[index]);
	}
	
}

HomePage.initialize();