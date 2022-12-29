
function display_home(){
  // populate new data
  // set correct_answers to 0 and update server.py via ajax
  // quiz home
  let text = $('<div>').append("<div class= 'quiz-home-text grey font-weight-bold'>Are you the sharpest knife in the drawer?<div>").addClass('m-5')
  let but = $('<div>').append("<button value='submit' class='start-quiz quiz-button btn btn-dark btn-lg goButton quiz-home-button'>BEGIN QUIZ!</button>").addClass('m-5')
  let img = $('<div>').append("<img class='quiz-img' src='/static/imgs/knives-crossing.png' alt='Begin Quiz'></img>")
  let container = $('<div>').addClass('row quiz-container hammersmith')
  $(container).append(text)
  $(container).append(img)
  $(container).append(but)
  $('body').append(container)

  $( ".start-quiz" ).click(function() {
    window.location.href = '/quiz/1'
  });
}

function display_mc_pic_question(id){
  // populate new data
  let row = $('<div>').addClass('row text-center answers-row' )

  let c1 = $('<div>').addClass('pic-choice ch col-md-3').attr('id','op1')
  let t1 = $('<div>').append('A. '+ quiz_data[id]['op1']).addClass('hammersmith quiz-font-size')
  let img1 = $('<img />', {
    id: 'pic1',
    src: quiz_data[id]['op1_pic'],
    alt: 'option 1',
    class: 'quiz-choice-pic text-center'
  })
  $(c1).append(t1)
  $(c1).append(img1)

  let c2 = $('<div>').addClass('pic-choice ch col-md-3').attr('id','op2')
  let t2 = $('<div>').append('B. '+ quiz_data[id]['op2']).addClass('hammersmith quiz-font-size')
  let img2 = $('<img />', {
    id: 'pic2',
    src: quiz_data[id]['op2_pic'],
    alt: 'option 2',
    class: 'quiz-choice-pic text-center'
  })
  $(c2).append(t2)
  $(c2).append(img2)

  let c3 = $('<div>').addClass('pic-choice ch col-md-3').attr('id','op3')
  let t3 = $('<div>').append('C. '+ quiz_data[id]['op3']).addClass('hammersmith quiz-font-size')
  let img3 = $('<img />', {
    id: 'pic3',
    src: quiz_data[id]['op3_pic'],
    alt: 'option 3',
    class: 'quiz-choice-pic text-center'
  })
  $(c3).append(t3);
  $(c3).append(img3);

  let progess_bar = $('<div>').addClass('col-md-3 progress-block').append("<div style='height:40px'class='progress'><div class='progress-bar progress-bar-striped bg-dark' role='progressbar' style='width:" + (id-1)*10 +"%' aria-valuenow='" + (id-1)*10 +"' aria-valuemin='0' aria-valuemax='100'>"+(id-1) +"/10" +"</div></div>")

  let second_row = $('<div>').addClass('row progress-row pb-3')
  let score = $('<div>').append('Score: ' + correct_answers + '/10').addClass('font-weight-bold quiz-text col-md-3 offset-md-5');

  $(second_row).append(progess_bar)
  $(second_row).append(score)


  $(row).append(c1)
  $(row).append(c2)
  $(row).append(c3)

  $('body').append(row)
  $('body').append(second_row)

  $(".ch").hover(function(){
    $(this).css("background", "darkgrey");
    },
    function(){
        $(this).css("background","transparent");
    });


  $('body').on('click', '.ch',function(){
    $(this).css('background-color', '#838383');
    if($(this).attr('id')===quiz_data[id]['answer']){
      $('.progress-row').empty()
      let progess_bar = $('<div>').addClass('col-md-3 progress-block').append("<div style='height:40px'class='progress'><div class='progress-bar progress-bar-striped bg-success' role='progressbar' style='width:" + id*10 +"%' aria-valuenow='" + id*10 +"' aria-valuemin='0' aria-valuemax='100'>"+id +"/10" +"</div></div>")
      $('.progress-row').append(progess_bar)
      let score = $('<div>').append('Score: ' + (correct_answers+1) + '/10').addClass('font-weight-bold quiz-text col-md-3 offset-md-5');
      $(second_row).append(score)
      $( "body" ).off( "click", ".ch")
      $('.ch').off('mouseenter mouseleave');

      display_mc_pic_question_correct(id)
    }else{
      $('.progress-row').empty()
      let progess_bar = $('<div>').addClass('col-md-3 progress-block').append("<div style='height:40px'class='progress'><div class='progress-bar progress-bar-striped bg-success' role='progressbar' style='width:" + id*10 +"%' aria-valuenow='" + id*10 +"' aria-valuemin='0' aria-valuemax='100'>"+id +"/10" +"</div></div>")
      $('progress-row').append(progess_bar)
      $(second_row).append(progess_bar)
      let selected = $(this).attr('id')
      $( "body" ).off( "click", ".ch")
      $('.ch').off('mouseenter mouseleave');
      display_mc_pic_question_wrong(id,selected)
    }
  })
}
function display_mc_pic_question_correct(id){
  // populate new data
  // When the answer is correct, we need to call the update_correct_answer function
  update_correct_answer(correct_answers)
  console.log('correct')

  let correct_op = quiz_data[id]['answer']
  $('#' + correct_op).css('background-color','#90EE90')
  let but = $('<div>').append("<button value='submit' class='btn btn-dark btn-lg goButton quiz-but'>NEXT</button>").addClass('m-5')
  $('.answers-row').append(but)

  $( ".quiz-but" ).click(function() {
    window.location.href = '/quiz/' + (parseInt(id)+1);
  });

}

function display_mc_pic_question_wrong(id,selected){
  // populate new data
  console.log('incorrect')
  let correct_op = quiz_data[id]['answer']
  $('#' + correct_op).css('background-color','#90EE90')
  let incorrect_op = selected;
  $('#' + incorrect_op).css('background-color','#ffcccb')
  let desc = $('<div>').append(quiz_data[id]['explanation']).addClass('text-danger hammersmith font-weight-bold col-md-5')
  $('.quiz-but').html('NEXT')
  $('.progress-row').append(desc)
  let but = $('<div>').append("<button value='submit' class='btn btn-dark btn-lg goButton quiz-but'>NEXT</button>").addClass('m-5')
  $('.answers-row').append(but)
  let score = $('<div>').append('Score: ' + correct_answers + '/10').addClass('font-weight-bold quiz-text col-md-2');
  $('.progress-row').append(score)
  $( ".quiz-but" ).click(function() {
    window.location.href = '/quiz/' + (parseInt(id)+1);
  });
}

function display_mc_word_question(id){
  // populate new data
  let row = $('<div>').addClass('row text-center answers-row' )

  let c1 = $('<div>').addClass('pic-choice-sm ch col-md-3').attr('id','op1')
  let t1 = $('<div>').append('A. '+ quiz_data[id]['op1']).addClass('hammersmith quiz-font-size')

  $(c1).append(t1)

  let c2 = $('<div>').addClass('pic-choice-sm ch col-md-3').attr('id','op2')
  let t2 = $('<div>').append('B. '+ quiz_data[id]['op2']).addClass('hammersmith quiz-font-size')

  $(c2).append(t2)


  let c3 = $('<div>').addClass('pic-choice-sm ch col-md-3').attr('id','op3')
  let t3 = $('<div>').append('C. '+ quiz_data[id]['op3']).addClass('hammersmith quiz-font-size')

  $(c3).append(t3)

  let progess_bar = $('<div>').addClass('col-md-3 progress-block').append("<div style='height:40px'class='progress'><div class='progress-bar progress-bar-striped bg-dark' role='progressbar' style='width:" + (id-1)*10 +"%' aria-valuenow='" + (id-1)*10 +"' aria-valuemin='0' aria-valuemax='100'>"+(id-1) +"/10" +"</div></div>")
  let score = $('<div>').append('Score: ' + correct_answers + '/10').addClass('font-weight-bold quiz-text col-md-3 offset-md-5');
  let second_row = $('<div>').addClass('row progress-row pb-3')
  $(second_row).append(progess_bar)
  $(second_row).append(score)


  $(row).append(c1)
  $(row).append(c2)
  $(row).append(c3)

  $('body').append(row)
  $('body').append(second_row)


  $('body').append(second_row)
  $(".ch").hover(function(){
    $(this).css("background", "darkgrey");
    },
    function(){
        $(this).css("background","transparent");
    });


  $('body').on('click', '.ch',function(){
    $(this).css('background-color', '#838383');

    if($(this).attr('id')===quiz_data[id]['answer']){
      $( "body" ).off( "click", ".ch")
      $('.ch').off('mouseenter mouseleave');
      $('.progress-row').empty()
      let progess_bar = $('<div>').addClass('col-md-3 progress-block').append("<div style='height:40px'class='progress'><div class='progress-bar progress-bar-striped bg-success' role='progressbar' style='width:" + id*10 +"%' aria-valuenow='" + id*10 +"' aria-valuemin='0' aria-valuemax='100'>"+id +"/10" +"</div></div>")
      $('.progress-row').append(progess_bar)
      let score = $('<div>').append('Score: ' + (correct_answers+1) + '/10').addClass('font-weight-bold quiz-text col-md-3 offset-md-5');
      $('.progress-row').append(score)

      display_mc_word_question_correct(id)
    }else{
      $('.progress-row').empty()
      let progess_bar = $('<div>').addClass('col-md-3 progress-block').append("<div style='height:40px'class='progress'><div class='progress-bar progress-bar-striped bg-danger' role='progressbar' style='width:" + id*10 +"%' aria-valuenow='" + id*10 +"' aria-valuemin='0' aria-valuemax='100'>"+id +"/10" +"</div></div>")
      $('.progress-row').append(progess_bar)

      let selected = $(this).attr('id')
      $( "body" ).off( "click", ".ch")
      $('.ch').off('mouseenter mouseleave');
      display_mc_word_question_wrong(id,selected)
    }
  })
}

function display_mc_word_question_correct(id){
  // populate new data
  // When the answer is correct, we need to call the update_correct_answer function
  update_correct_answer(correct_answers)
  console.log('correct')

  let correct_op = quiz_data[id]['answer']
  $('#' + correct_op).css('background-color','#90EE90')
  let but = $('<div>').append("<button value='submit' class='btn btn-dark btn-lg goButton quiz-but'>NEXT</button>").addClass('m-5')
  $('.answers-row').append(but)

  $( ".quiz-but" ).click(function() {
    window.location.href = '/quiz/' + (parseInt(id)+1);
  });
}

function display_mc_word_question_wrong(id,selected){
  // populate new data
  console.log('incorrect')
  let correct_op = quiz_data[id]['answer']
  $('#' + correct_op).css('background-color','#90EE90')
  let incorrect_op = selected;
  $('#' + incorrect_op).css('background-color','#ffcccb')
  let desc = $('<div>').append(quiz_data[id]['explanation']).addClass('text-danger hammersmith font-weight-bold col-md-5')
  $('.quiz-but').html('NEXT')
  $('.progress-row').append(desc)
  let but = $('<div>').append("<button value='submit' class='btn btn-dark btn-lg goButton quiz-but'>NEXT</button>").addClass('m-5')
  $('.answers-row').append(but)
  let score = $('<div>').append('Score: ' + correct_answers + '/10').addClass('font-weight-bold quiz-text col-md-2');
  $('.progress-row').append(score)
  $( ".quiz-but" ).click(function() {
    window.location.href = '/quiz/' + (parseInt(id)+1);
  });
}

function display_tf_question(id){
  // populate new data
  let row = $('<div>').addClass('row text-center answers-row' )

  let c1 = $('<div>').addClass('pic-choice-sm ch col-md-3').attr('id','op1')
  let t1 = $('<div>').append('A. '+ quiz_data[id]['op1']).addClass('hammersmith quiz-font-size')

  $(c1).append(t1)

  let c2 = $('<div>').addClass('pic-choice-sm ch col-md-3').attr('id','op2')
  let t2 = $('<div>').append('B. '+ quiz_data[id]['op2']).addClass('hammersmith quiz-font-size')

  $(c2).append(t2)

  let progess_bar = $('<div>').addClass('col-md-3 progress-block').append("<div style='height:40px'class='progress'><div class='progress-bar progress-bar-striped bg-dark' role='progressbar' style='width:" + (id-1)*10 +"%' aria-valuenow='" + (id-1)*10 +"' aria-valuemin='0' aria-valuemax='100'>"+(id-1) +"/10" +"</div></div>")
  let score = $('<div>').append('Score: ' + correct_answers + '/10').addClass('font-weight-bold quiz-text col-md-3 offset-md-5');
  let second_row = $('<div>').addClass('row progress-row pb-3')
  $(second_row).append(progess_bar)
  $(second_row).append(score)

  let offset = $('<div>').addClass('col-md-3 col-md-offset-1')
  $(row).append(offset)
  $(row).append(c1)
  $(row).append(c2)

  $('body').append(row)
  $('body').append(second_row)

  $('body').append(second_row)
  $(".ch").hover(function(){
    $(this).css("background", "darkgrey");
    },
    function(){
        $(this).css("background","transparent");
    });


  $('body').on('click', '.ch',function(){
    $(this).css('background-color', '#838383');
    if($(this).attr('id')===quiz_data[id]['answer']){
      $( "body" ).off( "click", ".ch")
      $('.ch').off('mouseenter mouseleave');
      $('.progress-row').empty()
      let progess_bar = $('<div>').addClass('col-md-3 progress-block').append("<div style='height:40px'class='progress'><div class='progress-bar progress-bar-striped bg-success' role='progressbar' style='width:" + id*10 +"%' aria-valuenow='" + id*10 +"' aria-valuemin='0' aria-valuemax='100'>"+id +"/10" +"</div></div>")
      $('.progress-row').append(progess_bar)
      update_correct_answer(correct_answers+1);
      let score = $('<div>').append('Score: ' + (correct_answers+1) + '/10').addClass('font-weight-bold quiz-text col-md-3 offset-md-5');
      $(second_row).append(score)
      display_mc_word_question_correct(id)
    }else{
      $('.progress-row').empty()
      let progess_bar = $('<div>').addClass('col-md-3 progress-block').append("<div style='height:40px'class='progress'><div class='progress-bar progress-bar-striped bg-danger' role='progressbar' style='width:" + id*10 +"%' aria-valuenow='" + id*10 +"' aria-valuemin='0' aria-valuemax='100'>"+id +"/10" +"</div></div>")
      $('progress-row').append(progess_bar)
      $(second_row).append(progess_bar)
      let selected = $(this).attr('id')
      $( "body" ).off( "click", ".ch")
      $('.ch').off('mouseenter mouseleave');
      display_mc_word_question_wrong(id,selected)
    }
  })
}

function display_tf_question_correct(id){
  // populate new data
  // When the answer is correct, we need to call the update_correct_answer function
  update_correct_answer(correct_answers)
  console.log('correct')

  let correct_op = quiz_data[id]['answer']
  $('#' + correct_op).css('background-color','#90EE90')
  let but = $('<div>').append("<button value='submit' class='btn btn-dark btn-lg goButton quiz-but'>NEXT</button>").addClass('m-5')
  $('.answers-row').append(but)

  $( ".quiz-but" ).click(function() {
    window.location.href = '/quiz/' + (parseInt(id)+1);
  });
}

function display_tf_question_wrong(id,selected){
  // populate new data
  console.log('incorrect')

  let correct_op = quiz_data[id]['answer']
  $('#' + correct_op).css('background-color','#90EE90')
  let incorrect_op = selected;
  $('#' + incorrect_op).css('background-color','#ffcccb')
  let desc = $('<div>').append(quiz_data[id]['explanation']).addClass('text-danger hammersmith font-weight-bold col-md-6')
  $('.quiz-but').html('NEXT')
  $('.progress-row').append(desc)
  let but = $('<div>').append("<button value='submit' class='btn btn-dark btn-lg goButton quiz-but'>NEXT</button>").addClass('m-5')
  $('.answers-row').append(but)

  $( ".quiz-but" ).click(function() {
    window.location.href = '/quiz/' + (parseInt(id)+1);
  });
}

function update_correct_answer(correct_answers) {
  $.ajax({
      type: "POST",
      url: "/update_correct_answer",
      dataType : "json",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(correct_answers),
      success: function(result){
          let correct_answers_new = result["correct_answers"];
          // update correct_answers in quiz.html?
          correct_answers = correct_answers_new;
      },
      error: function(request, status, error){
          console.log("Error");
          console.log(request)
          console.log(status)
          console.log(error)
      }
  });
}
function display_end(){
  let text = $('<div>').append("<div class= 'quiz-home-text blue font-weight-bold'>Good Job! This is your score: "+ correct_answers +"/10<div>").addClass('m-5')
  let but = $('<div>').append("<button value='submit' class='start-quiz quiz-button btn btn-dark btn-lg goButton quiz-home-button'>RETAKE QUIZ!</button>").addClass('m-5')
  let but2 = $('<div>').append("<button value='submit' class='go-learn quiz-button btn btn-secondary btn-lg goButton quiz-end-button'>KEEP STUDYING</button>").addClass('m-5')
  let img = $('<div>').append("<img class='quiz-img' src='/static/imgs/knives-crossing.png' alt='Begin Quiz'></img>")
  let container = $('<div>').addClass('row quiz-container hammersmith')
  $(container).append(text)
  $(container).append(img)
  $(container).append(but)
  $(container).append(but2)
  $('body').append(container)

  $( ".start-quiz" ).click(function() {

    window.location.href = '/quiz/1'
  });
  $( ".go-learn" ).click(function() {
    window.location.href = '/home'
  });
}



$(document).ready(function(){
  // depending on value from id, go to entry in quiz_data, find the "type" for the data entry, and call the write function to display it (e.g. if the "type" is "mc_pic", call the display_mc_pic_question(id))
  if(id === null){
    display_home();
    update_correct_answer(-1)
  }else if(id < 11){
    //question text
    let question = $('<div>').append('Q'+id + ': ' + quiz_data[id]['question']).addClass('font-weight-bold quiz-text');
    $('body').append(question);
    //display question
    if(quiz_data[id]['type']==='mc_pic'){
      display_mc_pic_question(id);
    }else if(quiz_data[id]['type']==='tf'){
      display_tf_question(id);
    }else if(quiz_data[id]['type']==='mc_word'){
      display_mc_word_question(id);
    }
  }else {
    update_correct_answer(-1)
    display_end();
  }
})
