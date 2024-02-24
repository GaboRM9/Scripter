/*Example Scripts
Example 1
Based on the answer options selected in the source(Q1) question, the particular column will be shown in Q2.
*/

var Question = "Q2"; // replace this with the question code
var source_question = "Q1"; // replace this with source question code

/* header */
$("." + Question + " .matrix-multipoint-question .parent-table thead tr").not('.anchor').each(function() {
    $(this).find("td").each(function(e) {
        $(this).addClass("column_" + e);
    });
});

/* body */
$("." + Question + " .matrix-multipoint-question .parent-table tbody tr").not('.error-tr').each(function() {
    $(this).find("td").each(function(e) {
        $(this).addClass("column_" + e);
    });
});

/* source question */
var autot = $survey.getSelectedOptionsIndex(source_question);

for (var i = 0; i < autot.length; i++) {
    $("." + Question + " .matrix-multipoint-question .parent-table .column_0").addClass("show_column");
    $("." + Question + " .matrix-multipoint-question .parent-table .column_" + autot[i]).addClass("show_column");
}

$("." + Question + " .matrix-multipoint-question .parent-table thead tr").not('.anchor').each(function() {
    $(this).find("td").not(".show_column").each(function() {
        $(this).remove();
    });
});

$("." + Question + " .matrix-multipoint-question .parent-table tbody tr").not('.error-tr').each(function() {
    $(this).find("td").not(".show_column").each(function() {
        $(this).remove();
    });
});

/*
Example 2
Piping text from top 2 selected options of a Rank Order question. To be used in the Post JavaScript Logic
*/

var qCode = "Q1"; // question code
var top_ = 2; // pipe top 2 options
var update_cv = 1; // update custom variable 1 with piping text
var piping_txt = [];

$("." + qCode + " .rank-order-question .answer-options").each(function() {
    var index_ = $(this).find("select.form-select").prop('selectedIndex');
    if (index_ <= top_) {
        piping_txt.push($(this).find(".control-label").text());
    }
});

$survey.updateCustomVariable(update_cv, piping_txt);
