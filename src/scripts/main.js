

$(document).ready( function(){

  //! MOBILE FIX 100VH

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  //! MOBILE FIX 100VH END


  //! ACCORDION

  $('.ServicesItem:first-child').addClass('ServicesItem_active');
  $('.ServicesItem:first-child .ServicesItem-Body').slideDown(300);


  $(document).on('click', '.ServicesItem:not(.ServicesItem_active)', function(){
    let _this = $(this);
    $('.ServicesItem_active .ServicesItem-Body').slideUp(300, function(){
      $('.ServicesItem_active').removeClass('ServicesItem_active');
      _this.addClass('ServicesItem_active');
      _this.find('.ServicesItem-Body').slideDown(300);
    });
  })

  //! ACCORDION END


  //! QUIZ


  $('.Price-Quiz-Question:not(:first-child) .Price-Quiz-Answers').slideUp(0);

  function NextStep(){
    let stepsList = $('.Price-Quiz-Question');
    let currentStep = $('.Price-Quiz-Question_current')
    let currentStepIndex = stepsList.index(currentStep);
    currentStep
        .removeClass('Price-Quiz-Question_current')
        .addClass('Price-Quiz-Question_complete');

    while (stepsList.eq(currentStepIndex + 1).hasClass('Price-Quiz-Question_complete')){
      currentStepIndex++;
    }
    if(stepsList.eq(currentStepIndex + 1).length) {
      stepsList.eq(currentStepIndex + 1)
          .addClass('Price-Quiz-Question_current');
      stepsList
          .eq(currentStepIndex + 1)
          .find('.Price-Quiz-Answers')
          .slideDown(300)
    }
  }

  function CheckAndShowRate(){
    let stepsListLenght = $('.Price-Quiz-Question').length;
    let completeStepsListLength = $('.Price-Quiz-Question_complete').length;
    if(stepsListLenght == completeStepsListLength) {
      $('.Price-Result__Show').fadeIn();
    }
  }

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
    CheckAndShowRate();
  })

  //! QUIZ END


  //! TABS on INDEX

  $(document).on('click', '.Whom-List-Switch__Btn:not(.Whom-List-Switch__Btn_active)', function (){
    $('.Whom-List-Switch__Btn_active').removeClass('Whom-List-Switch__Btn_active');
    $(this).addClass('Whom-List-Switch__Btn_active');
    $('.Whom-List').toggleClass('Whom-List_second');
  })

  //! TABS on INDEX END


  //! CASES SLIDER

  $('.Cases-Slider').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: $('.Cases-Arrows__Btn_next'),
    prevArrow: $('.Cases-Arrows__Btn_prev'),
  })

  //! CASES SLIDER END


  //! MAP in "Contacts"
  if($('#ContactsMap').length){
    mapboxgl.accessToken = 'pk.eyJ1IjoicnliYWtvb292IiwiYSI6ImNrYXdkN3BsYTE5a2UycXB0YWN5dGkwN3YifQ.OH8c2DpPOXHUSei8v0PXqA';

    var map = new mapboxgl.Map({
      container: 'ContactsMap',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [37.642617, 55.847609],
      zoom: 12
    });

    let Moscow = new mapboxgl.Marker()
        .setLngLat([37.642617, 55.847609])
        .addTo(map);
    let Krym = new mapboxgl.Marker()
        .setLngLat([34.113873, 44.960612])
        .addTo(map);

    var language = new MapboxLanguage({
      defaultLanguage: 'ru'
    });
    map.addControl(language);


    $(document).on('click', '.Contacts-Info-Tabs__Tab:not(.Contacts-Info-Tabs__Tab_active)', function (){

      let index = $(this).index();

      if(index == 1){
        map.jumpTo({center: [34.113873, 44.960612]});
      } else {
        map.jumpTo({center: [37.642617, 55.847609]});
      }

      $('.Contacts-Info-Tabs__Tab_active').removeClass('Contacts-Info-Tabs__Tab_active');
      $(this).addClass('Contacts-Info-Tabs__Tab_active');

      let block = $('.Contacts-Info-Body-Block:not(.Contacts-Info-Body-Block_active)');
      $('.Contacts-Info-Body-Block_active').removeClass('Contacts-Info-Body-Block_active')
      block.addClass('Contacts-Info-Body-Block_active');


    })
  }
  //! MAP in "Contacts" END


  //! blog filter show/hide

  $(document).on('click', '.Blog-Head-Filter__More', function (e){
    e.preventDefault();
    $(this).toggleClass('Blog-Head-Filter__More_active');
    console.log($('.Blog-Head-Filter-Item:nth-last-child(2)'));
    let flag = $('.Blog-Head-Filter-Item:nth-last-child(2)').is(':visible');


    if(flag){
      for(let i = 0; i <= $('.Blog-Head-Filter-Item').length - 8; i++){
        setTimeout(function (){
          $(`.Blog-Head-Filter-Item:nth-child(${$('.Blog-Head-Filter-Item').length - i})`).toggle(300);
        }, i * 300);
      }
    } else {
      for(let i = 0; i <= $('.Blog-Head-Filter-Item').length - 8; i++){
        setTimeout(function (){
          $(`.Blog-Head-Filter-Item:nth-child(${8 + i})`).toggle(300); // Показывать
        }, i * 300);
      }
    }
  })

  //! blog filter show/hide END


  //! оборачиваем картинки на странице статьи

  if($('.Post').length){
    $('.PostArticle-Block-Content img').wrap('<div class="PostArticle-Block-Content-Img"></div>');
  }

  //! оборачиваем картинки на странице статьи END


  //! POPUP



  $('.PopupVideo').showPopup({
    openSelector: ['[data-video]'],
    closeBtnInside: false,
  })

  $('.FormPopup').showPopup({
    openSelector: ['[data-callOrder]'],
    padding: '40px 24px',
  })

  $('.SuccessForm').showPopup({
    padding: '40px 24px',
  })

  //! POPUP END
});

