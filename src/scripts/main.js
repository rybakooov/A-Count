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


  //! TABS on INDEX


  $('.Whom-List__Item').each(function(){
    $(this).height($(this).find('p:nth-child(2)').height());
  })

  function UpdateHeightWhomListItems (){
    if($('.Whom-List_second').length){
      $('.Whom-List__Item').each(function(){
        console.log($(this).find('p:nth-child(1)'));
        $(this).height($(this).find('p:nth-child(1)').height());
      })
    } else {
      $('.Whom-List__Item').each(function(){
        $(this).height($(this).find('p:nth-child(2)').height());
      })
    }
  }

  $(document).on('click', '.Whom-List-Switch__Btn:not(.Whom-List-Switch__Btn_active)', function (){
    $('.Whom-List-Switch__Btn_active').removeClass('Whom-List-Switch__Btn_active');
    $(this).addClass('Whom-List-Switch__Btn_active');


    $('.Whom-List').toggleClass('Whom-List_second');
    UpdateHeightWhomListItems();
  })

  $(window).on('resize', function(){
    UpdateHeightWhomListItems();
  })

  //! TABS on INDEX END


  //! CASES SLIDER

  $('.Cases-Slider').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: $('.Cases-Arrows__Btn_next'),
    prevArrow: $('.Cases-Arrows__Btn_prev'),
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      }
    },{
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        variableWidth: true
      }
    },]
  })

  //! CASES SLIDER END


  //! MAP in "Contacts"
  if($('#ContactsMap').length){
    $('#ContactsMap').css('left', ($('.Contacts-Info').width() + $('.Contacts-Info').offset().left + 24) + 'px');
    $('#ContactsMap').width(document.body.clientWidth - ($('.Contacts-Info').width() + $('.Contacts-Info').offset().left + 24));

    
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


    $(window).on('resize', function(){
      
      $('#ContactsMap').css('left', ($('.Contacts-Info').width() + $('.Contacts-Info').offset().left + 24) + 'px');
      $('#ContactsMap').width(document.body.clientWidth - ($('.Contacts-Info').width() + $('.Contacts-Info').offset().left + 24));

    })

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

  $('.FormPopup').showPopup({
    openSelector: ['[data-callOrder]'],
  });

  $('.SuccessForm').showPopup();

  //! POPUP END
  

  //! VIDEO

  $('.PopupVideo').showPopup({
    openSelector: ['[data-video]'],
    closeBtnInside: false,
  })

  const videoCoef = $('.PopupVideo').attr('height') / $('.PopupVideo').attr('width');
  $('.PopupVideo').height($('.PopupVideo').width() * videoCoef)
  
  //! VIDEO END





  $(window).resize(function(){
    $('.PopupVideo').height($('.PopupVideo').width() * videoCoef)
    hideMobMenu();
  })
  
});

