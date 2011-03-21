.h2 Introduction

This is a tool for performing jQuery CSS selection from the command line. It outputs elements or attributes to the command line letting you use the rest of the command line tools to do sexy things with HTML content. I wrote this mainly to solve a small problem I had but also as an excuse to use node.js


Usage: src/jsgrep.js [options]
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

.h2 Examples

