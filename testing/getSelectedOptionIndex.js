/*getSelectedOptionIndex
Description
This function will help you to get the index of the answer option selected for a question by the respondents and use it within your script.
Syntax: $survey.getSelectedOptionIndex("Question Code")
Example Script
We can capture the option by index that is selected in the source questions(Q1) and by default select the same answer options under the follow up question.
*/
        var _index = $survey.getSelectedOptionIndex("Q1");
        $survey.setOptionSelected("Q2",_index);
