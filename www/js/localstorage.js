var LocalStorage = {

  DEFAULT_SETTINGS: {
    // TODO add default key-value sets for LocalStorage
  },


  initialize: function() {
    if (this.get("storage_app_version") == null) {
      window.localStorage.clear();
    }
    for (key in this.DEFAULT_SETTINGS) {
      if (this.get(key) == null) this.set(key, this.DEFAULT_SETTINGS[key]);
    }
  },


  get: function(key) {
    return JSON.parse(window.localStorage.getItem(key));
  },


  set: function(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },

}

LocalStorage.initialize();
