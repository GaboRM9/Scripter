/*setOptionSelected
Description: This function will help you to auto-select an answer option in a survey based on the previous selections made by the respondents.
Syntax:
Single Select: $survey.setOptionSelected("Question Code","Option Index");
Multi Select: $survey.setOptionSelected("Question Code","Option Index Array");
Example Script
We can capture the options that are selected in the source questions(Q1) and by default select the same answer options under the follow up question.*/

        var arr = $survey.getSelectedOption("Q1");
        var items = ["Soccer","Cricket","Basketball","Hockey","Baseball","Tennis","Football","Badminton"];
        //console.log(items);
        for (var i = 0; i < items.length; i++) {
        	if(items[i] == arr) {
        		//console.log(items[i]);
            	$survey.setOptionSelected("Q2", i+1);
        	}
        }
