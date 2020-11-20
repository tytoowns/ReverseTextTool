var textFromFile;
$(document).ready(function() { // wait for document to be ready
	
	// Input toggle buttons
	$('.selection-input').click(function(e) {
		$(this).siblings().removeClass('selected');//remove the selected class
		$(this).addClass('selected'); //add it to the selected button
		
		if( $('#inputFormTextField').hasClass('selected'))//if the text input isnt showing then
		{
				$('#text-input').show();//show the text input
				$('#file-input').hide();//hide the file input
		}
		else
		{
				$('#text-input').hide();
				$('#file-input').show();
		}
	});
	
	//file output toggle buttons
	$('.selection-output').click(function(e) {
		$(this).siblings().removeClass('selected');
		$(this).addClass('selected'); 
		$('#reverse-text-output').hide();//hide the text output when they change output types
	});
	
	
	
	//Reverse Text
	$('#reverseTextBtn').click(function(e) {
		var reversedText;
		//check input
		if( $('#text-input').css('display') == 'none')//if the user wants to input from FILE
		{
			reversedText = reverseText(textFromFile);
		}
		else //if the user wants to input from TEXT box
		{
			reversedText = reverseText($('#reverse-text-input').val());
		}
		
		
		//check output
		if( $('#output-text-option').hasClass('selected')) //if the user wants to output to TEXT box
		{
			$('#reverse-text-output').val(reversedText);
			$('#reverse-text-output').show();
		}
		else //if the user wants to output to FILE
		{
			var element = document.createElement('a');
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reversedText));
			element.setAttribute('download', "reversedText");

			element.style.display = 'none';
			document.body.appendChild(element);

			element.click();

			document.body.removeChild(element);
		}
	});
	
	//reverse Text Function
	function reverseText(textToReverse) {
		var textArray = textToReverse.split('');

		var len = textToReverse.length;
		var x = len - 1; //x will be counting down from the size of the array
		
		//simple algorithm which reverses text.
		//works by counting up and down at same time and swapping the values as it counts up/down
		for (var i = 0; i < len / 2; i++)
		{
			//swap value of x and i
			var tempVal = textArray[i];
			textArray[i] = textArray[x];
			textArray[x] = tempVal;
			x--;
		}
		return textArray.join('');//return the array as a string
	}

	//simple file loader
	document.getElementById("myfile").onchange = function(){
		var reader = new FileReader();
		reader.onload = function(e) {
			var data = e.target.result;
			data = data.replace("data:text/plain;base64,","");
			textFromFile = window.atob(data);
			//document.getElementById("data_div").innerHTML = window.atob(data);
		};
		reader.readAsDataURL(this.files[0]);
	};
});


