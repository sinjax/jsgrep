var jsdom = require('jsdom').jsdom;

var stdin = process.openStdin();

stdin.setEncoding('utf8');
var allChunks = ""
stdin.on('data', function (chunk) {
	allChunks += chunk;
});

stdin.on('end', function (chunk) {
	jsdom.env(allChunks, ['jquery.js'], {
		features:{
			FetchExternalResources   : false, 
			ProcessExternalResources : false,
			MutationEvents           : false,
			QuerySelector            : false
		}
	},function(errors, window) {
		process.stdout.write("window: " + ("jquery" in window) + "\n")
		if(window != undefined && "jquery" in window)
		{
			
			window.$("a").each(function () {
				process.stdout.write("yep")
			});
		}
			
	});
});
