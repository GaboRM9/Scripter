 /*showQuestion 
Description:
This function will help you to show a specific question in a survey when the respondents are answering the survey.
Syntax: $survey.showQuestion("Question Code");
Example Script
Based on the answer options selected in the source(Q1) question the particular follow up question can be displayed or kept hidden.
*/
        /* hide questions on load of a page */
        $survey.hideQuestion("Q2");
        $survey.hideQuestion("Q3");
        $survey.hideQuestion("Q4");
        $survey.hideQuestion("Q5");
              
        /* get which option is selected in Q1 */
        var a = $survey.getSelectedOptionIndex("Q1");
                      
        /* based on option selected in Q1 show questions  */
        if (a == 1) {
                        $survey.showQuestion("Q2");
                     } else if (a == 2) {
                        $survey.showQuestion("Q3");
                     } else if (a == 3) {
                        $survey.showQuestion("Q4");
                     } else if (a == 4) {
                        $survey.showQuestion("Q5");
                     }