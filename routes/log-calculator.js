exports.displayLog = function(req, res){
	res.render('page-home', {title: 'Salesforce log viewer'});
}

exports.calculate = function(callback){
	var count = 0;
	count = Math.floor(Math.random() * 10);

	callback(count);
}

exports.sendToGraph = function(localio, count){
	// console.log('io :' + JSON.stringify(localio));
	localio.emit('count', {
     	number: count
    });
}