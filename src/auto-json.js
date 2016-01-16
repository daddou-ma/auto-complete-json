/*
 * autoJSON v0.1
 * Developed by Mohamed El Amine DADDOU
 * https://github.com/Mohamed-El-Amine-D/auto-complete-json
 * 
 * Not yet
 * (c) 2016, Mohamed El Amine DADDOU
 */
var autoJSON = function(tagId)
{
	"use strict";

	var div = document.getElementById(tagId);			// div element 
	var input = div.getElementsByTagName('input')[0];	// input element (i used 0 to select the first one)
	var ul = div.getElementsByTagName('ul')[0];			// ul element to append list on changing the input text

	var dataList = ['java', 'c++', 'ruby', 'ada', 'php', 'javascript'];		// an Array for the first test
	var tempList = [];														// temp Array to push element to display

	setup(); 		// call setup function

	// setup function (coonfiguration, ajax call etc ....)
	function setup() {
		//TODO: getting configuration form div attributes
		div.addEventListener("input", onchange, false);			// adding input listener to the input (onchange function as callback)
	}

	// this function is executed when changing the text inside the input
	function onchange() {

		var val = new String(input.value); 		// getting the value of the input
		var str;					// used to compare value of input with all values of the dataList

		tempList = [];				// reinitialize the temp arrays

		//verify if the text field is not empty
		if (val.length > 0) {
			// a loop to compare all the array element with the input value
			for (var i = 0; i < dataList.length; i++)
			{
				str = new String(dataList[i]); 			// putting an element of dataList into str

				if (str.search(val) >= 0) {				// verify if the typed text is part of Strings in Array
					tempList.push(dataList[i]);			// push the String in the tempList
				}
			}
		}

		render(); 		// render the tempList to the vue (HTML)
	}

	// this function render the vue(html) according to the tempList
	function render() {
		var li; // create a commun li element to display the list

		ul.innerHTML = "";			// clearing the ul tag to display new list

		// verify if the tempList is not empty
		if (tempList.length > 0) {
			ul.style.display = 'block';		// display the ul (list)

			// a loop to append li element into the ul according to tempList
			for (var i = 0; i < tempList.length; i++)
			{
				li = document.createElement("li");							// create a li element
				li.appendChild(document.createTextNode(tempList[i]));		// giving the value of the string to the innerHTML of li
				ul.appendChild(li);											// appending the li element to the ul
			}
		}
		else {
			ul.style.display = 'none';		// hide the ul (list)
		}
	}
}