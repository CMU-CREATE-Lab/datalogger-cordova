

// TODO - add a delete option for a field you do not want
var AddChannelPage = {
	
	/* BUTTON EVENTS */
	fieldPointers: new Array(),
	fieldNum: 0,
	
	clearFields: function() {
		var list = document.getElementById("ul_add_new_field");
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}
		this.fieldNum = 0;
		this.fieldPointers = new Array();
	},
	
	onClickAddNewField: function() {
		console.log("onClickAddNewField");
		AddChannelPage.fieldNum++;
		var item = "<li id='li_field_" + AddChannelPage.fieldNum + "'>";
		item += "<select name='field_type_" + AddChannelPage.fieldNum + "' id='field_type_" + AddChannelPage.fieldNum + "'>" +
                "<option value='boolean'>Boolean</option>" +
				"<option value='number'>Number</option>" +
				"<option value='string'>Text</option>" +
                "<option value='file'>File</option>" +
				"<option value='picture'>Picture</option>" +
				"<option value='audio'>Audio</option></select>";
		item += "<input id='field_name_" + AddChannelPage.fieldNum + "' type='text' placeholder='Name'></input>";
		item += "<textarea id='field_description_" + AddChannelPage.fieldNum + "' placeholder='Description'></textarea>";
		item += "</li>";
		$("#ul_add_new_field").append(item);
		$('select').selectmenu();
		$('textarea').textinput();
		$('[type="text"]').textinput();	
		$("#ul_add_new_field").listview("refresh");
		AddChannelPage.fieldPointers.push(document.getElementById("ul_add_new_field").lastChild);
		
		// TODO - do we need this? its a pain
		// TODO - I will make a function that redisplays it all if I need it
		/* // Bind on taphold event
		$("#li_field_" + AddChannelPage.fieldNum).on("taphold", function(event) {
			var target = event.target;
			// finds the parent node list item if you help on a child element
			while (target.nodeName != "LI") {
				target = target.parentNode;
			}

			navigator.notification.confirm(
				"Would you like to remove the list item?",
				 function(buttonIndex) {
					if (buttonIndex == 1) {
						index = target.value-1;
						console.log(AddChannelPage.fieldPointers);
						if (AddChannelPage.fieldPointers.length > 0) {
							AddChannelPage.fieldPointers.splice(index, 1);
						}
						console.log(AddChannelPage.fieldPointers);
						target.remove();
						AddChannelPage.fieldNum--;
					}
				 },
				'Remove Channel',
				['Yes','No']
			);
		}); */
	},
	
	onClickDoneChannelCreation: function() {
		console.log("onclickDoneChannelCreation");
		var name = $("#textfield_channel_name")[0].value;
		var description = $("#textarea_channel_description")[0].value;
		
		if (name != "" && name != null) {
			var channel = new Channel();
			
			// TODO - properly fill the attributes of the channel
			channel.name = name;
			channel.description = description;
			
		    // Field population
			var fieldArray = new Array();
			for (var i = 0; i < AddChannelPage.fieldNum; i++) {
				var field = new Field();
				field.type = AddChannelPage.fieldPointers[i].childNodes[0].childNodes[0].childNodes[1].value;
				field.name = AddChannelPage.fieldPointers[i].childNodes[1].childNodes[0].value;
				field.description = AddChannelPage.fieldPointers[i].childNodes[2].value;
			    // TODO - populate isRequired properly
				field.isRequired = true;
				channel.fields.push(field);
				fieldArray.push({ "field_type": field.type, "name": field.name, "description": field.description, "is_required": field.isRequired });
				console.log(JSON.stringify(fieldArray));
			}

			var data = {
			    "name": channel.name,
			    "description": channel.description,
			    "fields": fieldArray
			};

		    // save internetly :)
			$.ajax({
			    type: "POST",
			    dataType: 'json',
                contentType: 'application/json',
			    url: "http://datalogger.createlab.org/api/v1/channels/",
			    data: JSON.stringify(data),
			    success: function (data, textStatus, jqXhr) {
			        console.log("onSuccessPOST");
			        console.log(JSON.stringify(data));
			        if (data.error != "Defined fields are invalid.") {
			            // save locally
			            HomePage.channels.push(channel);
			            LocalStorage.saveChannels(HomePage.channels);
			            $.mobile.changePage($("#home"), { changeHash: false });
			            $("#textfield_channel_name")[0].value = null;
			            $("#textarea_channel_description")[0].value = null;
			            AddChannelPage.clearFields();
			        } else {
			            alert(data.error);
			        }
			    },
			    error: function (jqXhr, textStatus, error) {
			        console.log(error);
			    }
			});
		} else {
			navigator.notification.alert(
				'The channel needs a name.',
				null,
				'Error',
				'Ok'
			);
		}
	}
	
}