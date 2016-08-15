

var SearchPage = {
	
	channels: new Array(),
	
	initialize: function() {
		// empty
	},

	addChannel: function(jsonChannel) {
	    var channel = new Channel();
	    channel.createdAt = jsonChannel.created_at;
	    channel.name = jsonChannel.name;
	    channel.description = jsonChannel.description;
	    // populate fields
	    for (var i = 0; i < jsonChannel.fields.length; i++) {
	        var field = new Field();
	        field.name = jsonChannel.fields[i].name;
	        field.type = jsonChannel.fields[i].field_type;
	        field.description = jsonChannel.fields[i].description;
	        field.isRequired = jsonChannel.fields[i].is_required;
	        channel.fields.push(field);
	    }
	    this.channels.push(channel);
	},
	
	clearChannels: function() {
		var list = document.getElementById("ul_join_channels");
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}
		this.channels = new Array();
	},
	
	displayChannels: function() {
		// TODO - do not display the ones you already joined
		for (var i = 0; i < this.channels.length; i++) {
			var item = "<li style='list-style-type: none;' ><a id='join_" + i + "' onclick='SearchPage.clickedChannel(this)'>" + this.channels[i].name + "</a></li>";
			$("#ul_join_channels").append(item);
			$("#ul_join_channels").listview("refresh");
		}
	},
	
	/* BUTTON EVENTS */
	
	clickedChannel: function(item) {
		var index = item.id.substring(5, item.id.length);
		index = parseInt(index);
		var channel = this.channels[index];
		
		var isValid = true;
		for (var i = 0; i < HomePage.channels.length; i++) {
			if (HomePage.channels[i].name == channel.name) {
				isValid = false;
				break;
			}
		}
		if (isValid) {
			HomePage.channels.push(this.channels[index]);
			LocalStorage.saveChannels(HomePage.channels);
			$.mobile.changePage($("#home"), {changeHash:false});
			$("#textfield_join_channel")[0].value = null;
			this.clearChannels();
		} else {
			alert("You already have this channel");
		}
	},
	
	onClickSearch: function () {

	    $.ajax({
	        type: "GET",
	        dataType: "html",
	        url: "http://datalogger.createlab.org/api/v1/channels/" + $("#textfield_join_channel").val(),
	        data: "",
	        success: function (data) {
	            console.log("onSuccessGET");
	            var jsonChannel = JSON.parse(data);
	            SearchPage.clearChannels();
	            SearchPage.addChannel(jsonChannel);
	            SearchPage.displayChannels();
	        },
	        error: function (error) {
	            console.log(error.message);
	        }
	    });
	}
	
}

SearchPage.initialize();