/*hideQuestion
Description: This function will help you to hide a specific question in a survey when the respondents are answering the survey.
Syntax: $survey.hideQuestion("Question Code");
Example Script:
Based on the answer options selected in the source(Q1) question that particular option follow up question can be hidden.*/

        /* get which option is selected in Q1 */
        var a = $survey.getSelectedOptionIndex("Q1");
        /* based on option selected in Q1 show questions  */
        if (a == 1) {
            $survey.hideQuestion("Q2");
        } else if (a == 2) {
            $survey.hideQuestion("Q3");
        } else if (a == 3) {
            $survey.hideQuestion("Q4");
        } else if (a == 4) {
            $survey.hideQuestion("Q5");
        }