/*getSelectedCount
Description
This function will help you to get the total number of answer options selected for a question by the respondent and use it within your script.
Syntax: $survey.$survey.getSelectedCount("Question Code")
Example Script
Consider a multiple-select choice question, the number of options selected on the question can be stored as a count under a custom variable. We can fetch the value of the count by calling out the custom variable in the survey.
*/

        /* get number of options selected in Q1 */
        var count = $survey.getSelectedCount("Q1");
         
        $survey.updateCustomVariable(1, count);
        