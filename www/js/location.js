

var Location = {
	
	coords: null,
	
	requestLocation() {
		var onSuccess = function(position) {
		    console.log("got position: " + position);
		    console.log("lat: " + position.coords.latitude);
		    console.log("long: " + position.coords.longitude);
			Location.coords = position.coords;
		}
		var onError = function(error) {
			console.log("error code: " + error.code + " error message: " + error.message);
			/* navigator.notification.alert(
				'Could not request location - ' + error.message,
				null,
				'Error: ' + error.code,
				'Ok'
			); */
		}
		
		navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 15000});
	}
	
}