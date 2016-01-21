/*
 * autoJSON v0.1
 * Developed by Mohamed El Amine DADDOU
 * https://github.com/Mohamed-El-Amine-D/auto-complete-json
 * 
 * Not yet
 * (c) 2016, Mohamed El Amine DADDOU
 */

var autoJSON = function(autoObject)
{
	"use strict";

	var div = document.getElementById(autoObject.formId);			// div element 
	var input = div.getElementsByTagName('input')[0];	// input element (i used 0 to select the first one)
	var ul = div.getElementsByTagName('ul')[0];			// ul element to append list on changing the input text
	var template = document.getElementById(autoObject.templateId).innerHTML;		// template innerHTML

	var primaryIndex = autoObject.primaryKey;		// the key used as primary
	var objectName = autoObject.objectName;			// object name
	var dataList = autoObject.json;		// an Array of objects
	dataList = JSON.parse(dataList)[objectName];		// getting the list of objects from the JSON obejct

	var tempList = [];														// temp Array to push element to display
	var inputValue;					// a temp variable to stock a copy of the text field value

	var currentIndex = -1;			// the position of the index into the list (used to navigate)

	setup(); 		// call setup function

	// setup function (coonfiguration, ajax call etc ....)
	function setup() {
		// adding input listener to the input (onchange function as callback)
		input.addEventListener("input", onchange, false);

		div.addEventListener('keypress', function(e) {			// adding a keypress listener to div to navigate the list (li)
			switch (e.keyCode) { 				// e.keycode = the key taped
				
				case 13: 					// case key = enter button
					setValue(currentIndex);	// calling the function to put the value of selected li into the text field 
				break;
				case 38: 				// case key = arrow up
					navigate('up');		// navigate to the top
				break;
				case 40: 				// case key = arrow bottom
					navigate('down');	// navigate to the bottom
				break;
			}
		}, false);

		input.addEventListener('click', function() {	// click listener to input to reload the list
			currentIndex = -1;
			onchange();			// call onchange function to render a new list
		}, false);
	}

	// this function is executed when changing the text inside the input
	function onchange() {

		var val = new String(input.value.toUpperCase()); 	// getting the value of the input (uppercase just for searching)
		var str;					// used to compare value of input with all values of the dataList

		tempList = [];				// reinitialize the temp arrays

		//verify if the text field is not empty
		if (val.length > 0) {
			// a loop to compare all the array element with the input value
			for (var i = 0; i < dataList.length; i++)
			{
				str = new String(dataList[i][primaryIndex].toUpperCase()); 	// putting an element of dataList into str (uppercase just for searching)

				if (str.search(val) == 0) {				// verify if the typed text is part of Strings in Array
					tempList.push(dataList[i]);			// push the String in the tempList
				}
			}
			tempList.sort();		// sorting the tempList (from A to B)
		}

		inputValue = input.value;	// save a copy of the text field value (we use it when navigating)
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
				li.innerHTML = getModel(i);
				ul.appendChild(li);									// appending the li element to the ul
			}

			var element = ul.getElementsByTagName('li');			// selecting all li elements

			for (var i = 0; i < element.length; i++) {				// a loop to select all element (element by element)

				// add a mouseover listener to add "active" class to the li over
				(function(index){
					element[index].addEventListener('mouseover', function() {
						currentIndex = index;						// setting the current index accoring to the index of hover li
						setfocus(false);				// setting the vue according to the hover li index (false to not set the input value)	
					});
				})(i);		// sending i as parameter

				// add a click listener to set the input value when clicking an li element
				(function(index){
					element[index].addEventListener('click', function() {
						setValue(index);				// setting the li text as input value
					});
				})(i);	// sending i as parameter
			}
		}
		else {
			ul.style.display = 'none';		// hide the ul (list)
		}
	}

	// function to navigate in the list (li) by inc & dec the currentIndex
	function navigate(dir) {
		if(dir == 'up') {			// if the key is up
			if(currentIndex > 0)	// if the position is > 0
			{
				currentIndex--;		// position is decrementing (navigating to the top)
			}
			else if (currentIndex == 0) {			// if currentIndex == 0 (and going up)
				currentIndex = -1;					// move position to -1 (no element(li) selected)
				input.value = inputValue;			// recovering the saved copy of text field value
			}
		}
		else if (dir == 'down') {	// if the key id down
			if(currentIndex < (ul.getElementsByTagName('li').length-1)) { 	//if current position is not the last one (max)
				currentIndex++;		// position is incrementing (navigating to the bottom)
			}
		}

		setfocus(true);		 // setting the vue according to the position(currentIndex) (true to set the input value while navigating)
	}

	// function to set the vue according to the position(currentIndex) & giving it a class = "active"
	function setfocus(setInputValue) {
		var li = ul.getElementsByTagName('li');		// select all the li inside the ul

		for(var i = 0; i < li.length; i++) {		// a loop to initialize all the li class to ""
			li[i].className = "";					// remove classes from li
		}

		li[currentIndex].className = "active";		// give the selected li a class = "active"

		if (setInputValue == true) {	// if true set the value of the input value to the selected li
			input.value = tempList[currentIndex][primaryIndex];	// and setting the value of the text field to the inner text of the selected li
		}
	}

	// setting the value of the text field when selection an element(by pressing enter + or mouse click) 
	// position sent by parameter index
	function setValue(index){		
		if (currentIndex != -1) {					// if currentIndex == -1 so there is not element to select
			var li = ul.getElementsByTagName('li');	// selecto all li's
			input.value = tempList[index][primaryIndex];		// setting the text of li[index] to the text field
		}

		inputValue = input.value 					// save a copy of the text field value 
		currentIndex = -1;							// return the position to the default -1
		tempList = [];								// empty the tempList
		render();									// apply render to clear the list ul
	}

	// parsing the template to an usable html in the list
	function getModel(id) {
		var temp = template;	// temp is the inner html of the template
		var keys = Object.keys(tempList[id]);	// getting the obejct keys

		temp = temp.replace(/\s/g,"");		// deleting all spaces in the template

		// a loop to replace all kaywords by there values
		for (var i = 0; i < keys.length; i++)
		{
			temp = temp.replace("{{this." + keys[i] + "}}", tempList[id][keys[i]]);
		}
		return temp; // return the html to display it in the list
	}
}

// function to get json from a link
function getJsonFromUrl(link) {
	var xmlhttp = new XMLHttpRequest();

	var dataJSON;


	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			dataJSON = xmlhttp.responseText;
		}
	};
	xmlhttp.open("GET", link, false);
	xmlhttp.send();
	return dataJSON;
}