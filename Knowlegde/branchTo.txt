/*branchTo
Description
This function will help you to modify the flow of the survey for the respondent by apply branching logic via script.
Note: This function only works in Post JavaScript logic.
Syntax: $survey.branchTo("Question Code")
Example Script
We can apply individual scores to the answer options of a question. Based on the score we can then branch the answer option to a particular followup question.
*/
          /* get score */
          var _score = parseInt($survey.surveyResponseJson.score);
             
         if (_score == 1) {
          branchTo(Q2);
         } else if (_score == 2) {
          branchTo(Q3);
         } else if (_score == 3) {
          branchTo(Q4);
         } else if (_score == 4) {
          branchTo(Q5);
         }
