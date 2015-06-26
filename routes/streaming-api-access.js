
var nforce = require('nforce');
var logCalculator = require(process.cwd() + '/routes/log-calculator');

var org = nforce.createConnection({
  clientId: process.env.SF_CLIENT_ID,
  clientSecret: process.env.SF_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/oauth/_callback',
  apiVersion: 'v31.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'multi' // optional, 'single' or 'multi' user mode, multi default
});

exports.initializeStreamingAPI = function(io){
// multi user mode
var oauth;
org.authenticate({ username: process.env.SF_USERNAME, password: process.env.SF_PASSWORD}, function(err, resp){
  // store the oauth object for this user
  if(err) {
    console.log('Error: ' + err.message);
  } else {
    console.log('Successfully connected to salesforce');
    // console.log('Access Token: ' + resp.access_token);
    oauth = resp;
    
	var topicName = process.env.STREAMING_TOPIC_NAME;
	console.log('STREAMING_TOPIC_NAME :' + topicName);
	if(null != topicName && topicName != 'undefined'){
		var client = org.createStreamClient({oauth: resp});

		var topicClient = client.subscribe({ topic: topicName });

		topicClient.on('error', function(err) {
			console.log('subscription error');
			console.log(err);
			client.disconnect();
		});

		topicClient.on('data', function(data) {
			console.log(data);
			logCalculator.calculate(function(count){
				console.log('topicClient.on.count :' + count);
				console.log('topicClient.on.io :' + io);
				logCalculator.sendToGraph(io, count);
			});
		});
	}
  }
});
}