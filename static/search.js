
$(document).ready(function(){
    $("#search").keypress(function(e) {
        if(e.which == 13) {
        search()
        }
    }),
    $("#submit").Click(function(){
        search()
    }),
    
function search (){
    let search_Value = $("#search").val().toLowerCase();
    if(!$.trim(search)){
        // warning message! 

},