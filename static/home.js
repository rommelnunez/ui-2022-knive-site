$(document).ready(function(){
    display_learning(information)
  displayKnifeRow(information)
})

function display_learning(information){
    $(learn).click(function(){
        window.location.href = '/learn/1'
    })
}

function displayKnifeRow(knives){
    for (knife of knives){
      let imgSrc = knife["image"];
      let imgID = knife["lesson_id"];
      let imgHt = 400 * knife["ht"] / 12;
      let imgHtml = $('<a href="/learn/'+imgID+'"><img class="knifeRowImg" src='+imgSrc+' alt="Knife Image" height='+ imgHt +'/></a>');
      // let imgHtml = $('<input type="image" class="knifeRowImg" src="../static/imgs/butter_knife.png" alt="Butter Knife" />');
      $('#knifeRow').append(imgHtml);
    }
}
