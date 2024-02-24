/*getSelectedOptions
Description
This function will help you to get the answer options selected for a question by the respondents and use it within your script.
Syntax: $survey.getSelectedOptions("Question Code")
Example Script
We can capture the options that are selected in the source questions(Q1) and by default select the same answer options under the follow up question.*/
        var arr = $survey.getSelectedOptions("Q1");
        var items = ["Soccer","Cricket","Basketball","Hockey","Baseball","Tennis","Football","Badminton"];
        console.log(items);
        for (var i = 0; i < items.length; i++) {
        	if(!!~jQuery.inArray(items[i], arr)) {
        		//console.log(items[i]);
            	$survey.setOptionSelected("Q2", i+1);
        	}
        }