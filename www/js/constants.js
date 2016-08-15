

var Constants = {
	
	/* LOCAL STORAGE KEYS */
	
	KEY_CHANNELS: "key_channels",
	
	/* TYPES OF DATA */
	
	TYPE_ENUM: {
        BOOLEAN: "boolean",
		NUMBER: "number",
		STRING: "string",
		PICTURE: "picture",
		AUDIO: "audio"
	},
	
	/* HTML ASSOCIATED WITH DATA TYPE */
	
	INPUT_BOOLEAN: "<select id='select_boolean_id' name='select_boolean_id' data-role='slider'>" +
                   "<option value='true'>True</option><option value='false'>False</option></select>",
	INPUT_NUMBER: "<input id='input_number_id' name='input_number_id' type='number' />",
	INPUT_STRING: "<input id='input_text_id' name='input_text_id' type='text' />",
	INPUT_PICTURE: "<h1>Currently in development</h1>",
	INPUT_AUDIO: "<h1>Currently in development</h1>"
	
};