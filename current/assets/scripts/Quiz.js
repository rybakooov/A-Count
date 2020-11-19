

function NextStep(){
  let stepsList = $('.Price-Quiz-Question');
  let currentStep = $('.Price-Quiz-Question_current');
  let currentStepIndex = stepsList.index(currentStep);

  if(currentStepIndex != 1){
    $('.Price-Quiz-Control__Prev').show().css('display', 'flex');
  }
  currentStep
      .removeClass('Price-Quiz-Question_current')
      .addClass('Price-Quiz-Question_complete');
  //! Ищем следующий шаг
  while (stepsList.eq(currentStepIndex + 1).hasClass('Price-Quiz-Question_complete')){
    currentStepIndex++;
  }
  
  

  //! Если слеюущий шаг существует
  if(stepsList.eq(currentStepIndex + 1).length) {
    stepsList.eq(currentStepIndex + 1)
        .addClass('Price-Quiz-Question_current');
    if(document.body.clientWidth >= 768){
      //! Показываем ответ сследующего вопроса для десктопа
      stepsList
        .eq(currentStepIndex + 1)
        .find('.Price-Quiz-Answers')
        .slideDown(300)
    } else {
      slideWrap();
    }
  } else {
    if(document.body.clientWidth < 768){
      slideWrap();
    }
  }

  if(stepsList.eq(currentStepIndex + 1).length){
    $('.Price-Quiz-Control__State_cur').html(currentStepIndex + 2)
  } else {
    $('.Price-Quiz-Control__State_cur').html($('.Price-Quiz-Question').length);
  }
   /*else {
    $('.Price-Quiz-Control__State_cur').html(stepsList.index(currentStep) + 2)
  }*/
}

function PrevStep(){
  let currentStep = $('.Price-Quiz-Control__State_cur').html();

  
  $('.Price-Quiz-Question_current').removeClass('Price-Quiz-Question_current');
  if($(`.Price-Quiz-Question:nth-child(${currentStep})`).find('input:checked').length){
    $(`.Price-Quiz-Question:nth-child(${currentStep})`).addClass('Price-Quiz-Question_complete');
  }
  $(`.Price-Quiz-Question:nth-child(${currentStep - 1})`).addClass('Price-Quiz-Question_current');
  $('.Price-Quiz-Question_current').removeClass('Price-Quiz-Question_complete')
  currentStep--;
  
  $('.Price-Quiz-Control__State_cur').html(currentStep);
  slideWrap()


  if(currentStep == 1){
    $('.Price-Quiz-Control__Prev').hide();
  }
}

let firstStep = true;
let desktop = true;

function slideWrap(){
  console.log(1);
  if(!$('.Price-Quiz-Question_current').length) {
    $('.Price-Quiz-Wrap').css('transform', 'translateX(' + (-1) * $('.Price-Quiz-Question_complete:last-child').position().left + 'px)');
    return false;
  }
  if(firstStep){
    $('.Price-Quiz-Wrap').css('transform', 'translateX(' + (-1) * ($('.Price-Quiz-Question_current').position().left - 12) + 'px)');
    firstStep = false;
  } else {
    $('.Price-Quiz-Wrap').css('transform', 'translateX(' + (-1) * $('.Price-Quiz-Question_current').position().left + 'px)');
  }
  setHeightWrap();
}


//! Проверяем значения инпутов и показываем тариф
function CheckAndShowRate(){
  let stepsListLenght = $('.Price-Quiz-Question').length;
  let completeStepsListLength = $('.Price-Quiz-Question_complete').length;
  if(stepsListLenght == completeStepsListLength) {
    $('.Price-Result__Show').slideDown();
  }
}

function setHeightWrap(){
  let height = $('.Price-Quiz-Question_current').height();
  $('.Price-Quiz-Wrap').height(height);
}

function setWidthWrap(){
  let stepsList = $('.Price-Quiz-Question');
  $('.Price-Quiz-Wrap').width($('.Price-Quiz').width() * stepsList.length + (24 * (stepsList.length)));
}




$(document).ready(function(){

  $('.Price-Quiz-Control__State_all').html($('.Price-Quiz-Question').length)

  setWidthWrap();
  setHeightWrap();
  //! QUIZ


  $(document).on('click', '.Price-Quiz-Control__Prev', function(){
    PrevStep();
  })

  $(document).on('transitionend', '.Price-Quiz-Wrap', function(){
    //console.log('Transitn zakonch');
    slideWrap();
  })


  $(window).on('resize', function(){
    //console.log(screen.width);
    if(document.body.clientWidth < 768){
      setWidthWrap();
      setHeightWrap();
    }
  })

  //! Прячем все ответы кроме первого (для десктопа)
  $('.Price-Quiz-Question:not(:first-child) .Price-Quiz-Answers').slideUp(0);

  

  $(document).on('change', '.Price-Quiz-Answers input', function(){
    NextStep();
    CheckAndShowRate();
  })

  $(document).on('click', '.Price-Quiz-Answers__Change', function(){
    if($('.Price-Quiz-Question_current input:checked').length){
      $('.Price-Quiz-Question_current')
          .removeClass('Price-Quiz-Question_current')
          .addClass('Price-Quiz-Question_complete');
    } else {
      $('.Price-Quiz-Question_current')
          .removeClass('Price-Quiz-Question_current');
    }
    $(this).closest('.Price-Quiz-Question_complete')
        .removeClass('Price-Quiz-Question_complete')
        .addClass('Price-Quiz-Question_current');
    if(document.body.clientWidth > 767) {
      $(this).closest('.Price-Quiz-Answers').css('display', 'flex');
    }
    CheckAndShowRate();
  })

  //! QUIZ END

})