var opts = require('opts')
var $ = require('jquery');
var stdout = process.stdout;

// Setup the command line arguments
var options = [
	{ short : 'i'
	, long : 'input'
	, description : 'HTML URL or Filename or raw HTML'
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
	{ short : 'ht'
	, long : 'html'
	, description : 'force print as html'
	},
];

// Grab the options
opts.parse(options, true);
var input  = opts.get('input') || false 
	, elementSelector = opts.get('selector') || 'p' 
	, attributeName  = opts.get('attribute') || false
	, noTags  = opts.get('no-tags')
	, recursive  = opts.get('recursive') ? true : false
	, html = opts.get('html') ? true : false
function jsGrep () {
	var selected = $(input).find(elementSelector);
	if (!recursive){
		selected = selected.children().remove().end()
	}
	selected.each(function (index,value) {
		var tidyString = "";
		if(html){
			tidyString = $("<div>").append($(value)).html()
		} else {
			if(attributeName)
				tidyString = $(value).attr(attributeName)
			else
				tidyString = $(value).text().replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s+/g," ");
			if(!noTags){
				var tagName = $(value)[0].nodeName.toLowerCase();
				if(attributeName)
					tidyString = "<" + tagName + "> ... </" + tagName + ">: " + tidyString;
				else
					tidyString = "<" + tagName + ">" + tidyString + "</" + tagName + ">";
			}
		}
		
		console.log(tidyString)
	})
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



