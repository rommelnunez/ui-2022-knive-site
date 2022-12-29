$(document).ready(function() {
  // console.log("entered document .")
  // console.log(store)
  // console.log(information)
  update_learning(information)
  if (information["lesson_id"] == 1) {
    $("#backButton").attr("disabled","disabled");
  }

  if (information["lesson_id"] == 10) {
    $("#nextButton").html('QUIZ! →');
  }
})


const host = "http://127.0.0.1:5500/";

// JAVASCRIPT FOR INDEX PAGE

function update_learning(information) {
  // include an if statement of "if URL is learn/0, disable the back button (cause there is no where else to go... else do below"
  $("#backButton").click(function() {
    if (information["prevLesson_id"] == 0) {
      window.location.href = '/home'
    }
    else {
      update_progress(progress)
      window.location.href = '/learn/' + information["prevLesson_id"]
    }
  })
  // include if statement of "if URL is learn/9 disable the next button and change the button to quiz yourself....else go below"
  $("#nextButton").click(function() {
    // call the backend ro update the server and increase progress by 1
    update_progress(progress+1);
    if (information["lesson_id"] == 10){
      console.log('BUTTON TRIGGERED')
      window.location.href = '/quiz'
    } else {
      update_progress(progress)
      let progess_bar = $('<div class="progress">').css('width',id+'%').attr('aria-valuenow', id)
      $('.progress-row').append(progess_bar)
      console.log("hello on to next")
      window.location.href = '/learn/' + information["nextLesson_id"]
    }

  })
  $("#AllKnivesButton").click(function() {
    window.location.href = '/home'
  })



  let Progress_Status = $('<div>').addClass('col-md-3 progress-block').append("<div style='height:40px'class='progress'><div class='progress-bar progress-bar-striped bg-dark' role='progressbar' style='width:" + (id)*10 +"%' aria-valuenow='" + (id-1)*10 +"' aria-valuemin='0' aria-valuemax='100'>"+(id-1) +"/10" +"</div></div>")
  let second_row = $('<div>').addClass('row progress-row')
  $(second_row).append(Progress_Status)
  $('body').append(second_row)
  $('.progress-bar').html(id +'/10')


  function update_progress(progress) {
    $.ajax({
        type: "POST",
        url: "/update_progress",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(progress),
        success: function(result){
            let progress_new = result["progress"];
            progress = progress_new;
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
  }

  console.log(information)
  var newRow = $('<div class="row">')
  $.each(information, function(index, information) {
      var id_number = information["id"]
      console.log(id_number)
      var image_link = information["image"]
      var knife_name = information["name"]
      var ht = information["ht"]
      console.log(image_link)
  })
}
