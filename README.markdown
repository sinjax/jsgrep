## Introduction

This is a tool for performing jQuery CSS selection from the command line. It outputs elements or attributes to the command line letting you use the rest of the command line tools to do sexy things with HTML content. I wrote this mainly to solve a small problem I had but also as an excuse to use node.js


	Usage: node src/jsgrep.js [options]
	Show this help message
		--help
	Also print subelements (with tags unless --no-tags is set)
		-r, --recursive
	Only print text nodes, do not print tags
		-nt, --no-tags
	Extract and print attribute per element matching (with source tags unless --no-tags is set)
		-a, --attribute <value>
	The CSS selector to use 
		-s, --selector <value>
	HTML URL or Filename
		-i, --input <value>


## Installation

You can use npm to install jsgrep like this:
	npm install jsgrep
or you can clone this and have a go yourself.

## Examples

Get all the images from a url and use sort and uniq to get a unique list

### Command:

	curl -s sinjax.net | node src/jsgrep.js -s img -a src -nt | sort | uniq

### Outputs:

	/graphics/cats.png
	/graphics/comments.png
	/graphics/date.png
	/graphics/globe.png
	/graphics/link.png
	/style/face


Get all the top level section names of a wikipedia article

### Command:
	curl -s http://en.wikipedia.org/wiki/Markdown | node src/jsgrep.js -s ".toclevel-1>a>.toctext" -nt -r  | sed 's/ /_/g'

### Output:
	Syntax_examples
	Markdown_users
	See_also
	References
	External_links

