# auto-complete-json

auto complete from a json file is an open source javascript library 
which allow you to add an autocomplete to a text field from json objects
of files from a server

## Exemple of usage

### HTML
```html
<!-- an HTML Template -->
<script id="template" type="text/template">
	<span>{{this.name}}</span>
	<span>{{this.id}}</span>
</script>

<!-- Start (HTML Structure) -->
<div id="auto-json">		<!-- a div with an id -->
	<input type="text" placeholder="Type any thing" id="input" />	<!-- input-->
	<ul class="auto-list"></ul> 	<!-- the ul to display the list -->
</div>
<!-- End -->

<!-- importing the library -->
<script src="../src/auto-json.js"></script>

<!-- calling the library -->
<script>
	var test1 = new autoJSON({
		formId: 		'auto-json',		//div id
		templateId: 	'template',			// template id
		json: 		 	getJsonFromUrl("languages.json"),			// function to get json as text
		objectName: 	'languages',		// name of object
		primaryKey: 	'name'				// primary key (for search)
	});
</script>
```

### JSON
```json
{
	"languages": [
		{
			"id": "1",
			"name": "Ada"
		},
		{
			"id": "2",
			"name": "Asp"
		},
		{
			"id": "3",
			"name": "Python"
		},
		{
			"id": "4",
			"name": "HTML"
		}
	]
}
```

### CSS (Optional)
```css
body {
	background: #E1E1E1;
	padding: 25px 0;
	font-family: helvetica;
}
#auto-json {
	background: #FFF;
	height: 36px;
	border: 1px solid #CCC;
	margin: 0px auto;
	max-width: 350px;
	border-radius: 3px;
	position: relative;
}
#auto-json input {
	color: #212121;
	line-height: 36px;
	width: 100%;
	border: 0px none;
	padding: 0px 15px;
	border-radius: 3px;
	box-sizing: border-box;
}
#auto-json ul {
	position: absolute;
	left: 0px;
	right: 0px;
	top: 100%;
	z-index: 9;
	background: #FCFCFC;
	padding: 10px 1px;
	list-style: none;
	margin: 4px 0;
	border-radius: 3px;
	box-shadow: 0px 0px 2px rgba(51, 51, 51, 0.2);
	display: none;
}
#auto-json ul li{
	color: rgb(33, 33, 33);
	line-height: 34px;
	padding: 0px 10px;
}
#auto-json ul li span:nth-child(2) {
    float: right;
    background: rgb(91, 206, 91) none repeat scroll 0% 0%;
    line-height: 20px;
    font-size: 11px;
    padding: 1px 7px;
    color: rgb(255, 255, 255);
    border-radius: 11px;
    margin: 6px;
}

#auto-json ul li.active {
	background: rgb(126, 199, 252) none repeat scroll 0% 0%;
	color: rgb(255, 255, 255);
}
```
