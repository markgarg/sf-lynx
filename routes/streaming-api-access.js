var nforce = require('nforce');
var org = nforce.createConnection({
  clientId: process.env.SF_CLIENT_ID,
  clientSecret: process.env.SF_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/oauth/_callback',
  apiVersion: 'v31.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'multi' // optional, 'single' or 'multi' user mode, multi default
});

// multi user mode
var oauth;
org.authenticate({ username: process.env.SF_USERNAME, password: process.env.SF_PASSWORD}, function(err, resp){
  // store the oauth object for this user
  if(err) {
    console.log('Error: ' + err.message);
  } else {
    console.log('Successfully connected to salesforce');
    console.log('Access Token: ' + resp.access_token);
    oauth = resp;

    
	var pt_name = process.env.STREAMING_TOPIC_NAME;

	// Create a connection to the Streaming API
	var str = org.stream({ topic: pt_name });

	str.on('connect', function(){
	    console.log('connected to pushtopic');
	});

	str.on('error', function(error) {
	    console.log('error: ' + error);
	});

	str.on('data', function(data) {
	    // Data will contain details of the streaming notification:

	    console.log(data);
	});
  }
});
