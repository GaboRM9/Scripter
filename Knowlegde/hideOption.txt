/*hideOption
Description: This function will help you to hide a specific answer option in a survey when the respondents are answering the survey.
Syntax: $survey.hideOption("Question Code","Option Index");
Example Script
Based on the answer options selected in the source question(Q1) we can display the same answer options under the followup question(Q2).
*/
        /* get options selected in Q1 */
        var arr = $survey.getSelectedOptions("Q1");
        console.log(arr);
        /* check if Soccer is selected in Q1, if selected hide 1st option of Q2  */
        if (jQuery.inArray("Soccer", arr) == -1) {
                $survey.hideOption("Q2", 1);
            }
        if (jQuery.inArray("Cricket", arr) == -1) {
                $survey.hideOption("Q2", 2);
            }
        if (jQuery.inArray("Basketball", arr) == -1) {
                $survey.hideOption("Q2", 3);
            }
        if (jQuery.inArray("Hockey", arr) == -1) {
                $survey.hideOption("Q2", 4);
            }
        if (jQuery.inArray("Baseball", arr) == -1) {
                $survey.hideOption("Q2", 5);
            }
