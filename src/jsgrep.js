var opts = require('opts')
var jsdom = require('jsdom').jsdom
var domtohtml = require("./domtohtml")
var stdout = process.stdout;

// Setup the command line arguments
var options = [
	{ short : 'i'
	, long : 'input'
	, description : 'HTML URL or Filename'
	, value : true
	},
	{ short : 's'
	, long : 'selector'
	, description : 'The CSS selector to use '
	, value : true
	},
	{ short : 'a'
	, long : 'attribute'
	, description : 'Extract and print attribute per element matching (with source tags unless --no-tags is set)'
	, value: true
	},
	{ short : 'nt'
	, long : 'no-tags'
	, description : 'Only print text nodes, do not print tags'
	},
	{ short : 'r'
	, long : 'recursive'
	, description : 'Also print subelements (with tags unless --no-tags is set)'
	},
];

// Grab the options
opts.parse(options, true);
var input  = opts.get('input') || false // default port value
	, elementSelector = opts.get('selector') || 'p'  // default debug value
	, attributeName  = opts.get('attribute') || false
	, noTags  = opts.get('no-tags')
	, recursive  = opts.get('recursive') ? -1 : 1
function jsGrep () {
	jsdom.env(input, ['jquery.js'], {
		features:{
			FetchExternalResources   : false, 
			ProcessExternalResources : false,
			MutationEvents           : false,
			QuerySelector            : false
		}
	},
	function(errors, window) {
		if(window != undefined && "$" in window)
		{
			window.$(elementSelector).each(function () {
				if(!attributeName) {
					var wang = ""
					wang = domtohtml.domToHtml(this,recursive,!noTags)
					stdout.write(wang + "\n");
				}
				else{
					if(!noTags){
						var elm = domtohtml.stringifyElement(this)
						stdout.write(elm.start + " ... " + elm.end + ": ")
					}
					
					stdout.write(window.$(this).attr(attributeName) + "\n")
				}

			})
		}
	});
}

if(!input){
	var stdin = process.openStdin();
	stdin.setEncoding('utf8');
	
	input = ""
	stdin.on('data', function (chunk) {
		input += chunk;
	});
	stdin.on('end', function (chunk) {
		jsGrep();
	});
}
else{
	jsGrep();
}



