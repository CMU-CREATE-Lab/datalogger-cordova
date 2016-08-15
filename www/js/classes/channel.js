

function Channel() {
    this.createdAt = null;
	this.name = null;
	this.description = null;
	this.fields = new Array();
	// TODO - put some methods in this, yo (if we need them of course)
}
// Note to self...prototypes are javascripts way of inheritence.
// If the object itself does not have the method it will go up the
// prototype chain. You can also override prototype in child objects.

/* Channel.prototype.method = function() {
	console.log("method");
} */