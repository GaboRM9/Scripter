/*updateCustomVariable
This function will help you to update the custom variables for the respondents while they are answering the survey.
Syntax: $survey.updateCustomVariable("Custom Variable Index", "Value")
*/
      /* Example*/
        var new_value = "value";
         
        $survey.updateCustomVariable(1, new_value);
        document.forms['run'].onsubmit();
