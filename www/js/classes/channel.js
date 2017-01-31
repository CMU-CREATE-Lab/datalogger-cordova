

// Class definition


function Channel(id, name, description, fields) {

  this.id = id;
  this.name = name;
  this.description = description;
  this.fields = fields;

  // check that fields are instances of Field
  for (var i in this.fields) {
    if (!(this.fields[i] instanceof Field)) {
      throw "Channel found element of fields that is not instanceof Field.";
    }
  }

}


// Public methods (extended)


Channel.prototype.submitDataPoint = function(key_values) {
  // check type and fields
  if (!(key_values instanceof Object)) {
    throw "Channel.submitDataPoint key_values not an Object.";
  }

  // get list of Channel keys and keys for the datapoint
  var keys = this.fields.map( function(i) {
    if (!(i instanceof Field)) {
      throw "Channel.submitDataPoint found element of fields as not a Field.";
    }
    return i.name;
  });
  var data_keys = Object.keys(key_values);

  // only send if all channel keys are include in the datapoint
  if (keys <= data_keys) {
    // TODO ajax call
    console.log("submitting data_keys="+data_keys);
  } else {
    throw "Channel.submitDataPoint tried to submit datapoint without implementing all Channel fields.";
  }
}
