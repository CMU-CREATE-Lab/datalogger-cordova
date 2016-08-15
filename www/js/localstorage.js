

var LocalStorage = {
	
	channels: null,
	
	initialize: function() {
		// TODO - get the channels from local database
		var storage = window.localStorage;
		
		this.channels = JSON.parse(storage.getItem(Constants.KEY_CHANNELS));
	},
	
	/* SAVE LOCAL STORAGE FIELDS */
	
	saveChannels: function(c) {
		this.channels = c;
		window.localStorage.setItem(Constants.KEY_CHANNELS, JSON.stringify(this.channels));
	}
	
}

LocalStorage.initialize();