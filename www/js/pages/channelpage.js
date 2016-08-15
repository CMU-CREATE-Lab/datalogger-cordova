

var ChannelPage = {
	
	// use this array to point at the various types of input
	fieldPointers: new Array(),
	activeChannel: null,
	
	clearFields: function() {
		var div = document.getElementById("ul_channel_body");
		while (div.firstChild) {
			div.removeChild(div.firstChild);
		}
	},
	
	createHTMLElement: function(type, description) {
		var list = "<li>";
		list += "<label for='input_" + type + "_id'>" + description + "</label>";
		console.log(type);
		switch (type) {
		    case Constants.TYPE_ENUM.BOOLEAN:
		        list += Constants.INPUT_BOOLEAN;
		        $('#ul_channel_body').append(list);
		        $('[data-role="slider"]').slider();
		        this.fieldPointers.push($('#ul_channel_body').children().last().children().eq(1));
		        break;
			case Constants.TYPE_ENUM.NUMBER:
			    list += Constants.INPUT_NUMBER;
			    $('#ul_channel_body').append(list);
			    $('[type="number"]').textinput();
			    this.fieldPointers.push($('#ul_channel_body').children().last().children().last().children().last());
				break;
			case Constants.TYPE_ENUM.STRING:
			    list += Constants.INPUT_STRING;
			    $('#ul_channel_body').append(list);
			    $('[type="text"]').textinput();
			    this.fieldPointers.push($('#ul_channel_body').children().last().children().last().children().last());
				break;
			case Constants.TYPE_ENUM.PICTURE:
			    list += Constants.INPUT_PICTURE;
				break;
			case Constants.TYPE_ENUM.AUDIO:
			    list += Constants.INPUT_AUDIO;
				break;
		}
		
		$('#ul_channel_body').append("</li>");
		$("#ul_channel_body").listview().listview("refresh");
	},
	
	initialize: function(activeChannel) {
		this.clearFields();
		this.fieldPointers = new Array();
		this.activeChannel = activeChannel;
		$("#title_channel_page").empty();
		$("#title_channel_page").append(this.activeChannel.name);
		$("#channel_description").empty();
		$("#channel_description").append(this.activeChannel.description);
		
		Location.requestLocation();
		
		// display the body
		for (var i = 0; i < this.activeChannel.fields.length; i++) {
			var type = this.activeChannel.fields[i].type;
			var description = this.activeChannel.fields[i].description;
			this.createHTMLElement(type, description);
		}
	},
	
	onClickLogData: function () {
	    var values = {};
	    for (var i = 0; i < ChannelPage.activeChannel.fields.length; i++) {
	        var name = ChannelPage.activeChannel.fields[i].name;
	        var val = {};
	        values[name] = ChannelPage.fieldPointers[i].val();
	    }

	    var dataPoint = {
	        "latitude": Location.coords.latitude,
	        "longitude": Location.coords.longitude,
	        "values": values
	    };

	    $.ajax({
	        type: "POST",
	        dataType: 'json',
            contentType: 'application/json',
            url: "http://datalogger.createlab.org/api/v1/channels/" + ChannelPage.activeChannel.name + "/data_points",
	        data: JSON.stringify(dataPoint),
	        success: function (data, textStatus, jqXhr) {
	            console.log(JSON.stringify(data));
	            if (data.error == null) {
	                $.mobile.changePage($("#home"), { changeHash: false });
	            } else {
	                alert(errorJSON.error);
	            }
	        },
	        error: function (jqXhr, textStatus, error) {
	            console.log("Status: " + textStatus);
	            console.log("Error: " + error);
	        }
	    });
	}
	
}