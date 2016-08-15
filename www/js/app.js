
var app = {
	
    initialize: function() {
        this.bindEvents();
		
		HomePage.displayChannels();
    },

    bindEvents: function() {
		$(document).on('deviceready', this.onDeviceReady);
    },

    onDeviceReady: function() {
        console.log("onDeviceReady");
		$(document).on('resume', app.onResume);
		$(document).on('pause', app.onPause);
		$(document).on('pagecontainershow', app.onPageContainerShow);
		
		// Static Button Bindings (Besides the navbar elements)
		$('#button_add_new_field').click(AddChannelPage.onClickAddNewField);
		$('#button_done_channel_creation').click(AddChannelPage.onClickDoneChannelCreation);
		$('#button_search').click(SearchPage.onClickSearch);
		$('#button_log_data').click(ChannelPage.onClickLogData);
    },
	
	/* EVENTS */
	
	onResume: function() {
		console.log("onResume");
	},
	
	onPause: function() {
		console.log("onPause");
	},
	
	onPageContainerShow(event, ui) {
		var pageId = $.mobile.pageContainer.pagecontainer("getActivePage")[0].id;
		console.log("onPageContainerShow: " + pageId);
		
		// Page initialization here if you need it
		switch (pageId) {
			case "home":
				HomePage.clearChannels();
				HomePage.displayChannels();
				break;
			case "channel_creation":
				break;
			case "join_channel_page":
				SearchPage.clearChannels();
				break;
			case "channel_page":
				break;
		}
	},
	
};


function onLoad() {
	app.initialize();
}




















