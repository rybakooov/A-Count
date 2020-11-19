// функции для смены номера телефона от города

function waitforCSSisApplied() {
    if (!document.body) {
        return new Promise((res, rej) => {
            window.addEventListener('DOMContentLoaded', e => {
                waitforCSSisApplied().then(res);
            });
        });
    }
    const waiter = document.createElement('style');
    waiter.innerHTML = 'body{opacity:.99;}';
    return new Promise((res, rej) => {
        // will trigger only when all styles are applied
        function done(evt) {
            // some cleanup
            waiter.parentNode && waiter.parentNode.removeChild(waiter);
            trigger.parentNode && trigger.parentNode.removeChild(trigger);
            res();       // resolve the promise
        }
        function trigger(){
            const trigger = document.createElement('style');
            trigger.innerHTML = 'body{opacity:1;  transition: opacity 0.1s linear;}';
            document.body.offsetWidth; // trigger a reflow
            document.head.appendChild(trigger);
        }
        document.head.appendChild(waiter);
        document.body.addEventListener('transitionend', done, {
            once: true
        })

        if(document.readyState !== 'complete'){
            // append it only when all resources are fetched
            window.addEventListener('load', trigger);
        }
        else{
            // wait for the end of current js thread
            setTimeout(trigger, 0);
        }
    });
}

function setCityWidth(){
    $('.HeaderInfo-City').width($('.HeaderInfo-City__El_active').width());
}

function sortAndMoveCities(){
    let notActiveCities = $('.HeaderInfo-City__El:not(.HeaderInfo-City__El_active)');
    for(let i = 0; i < notActiveCities.length; i++){
        let top = (24 + 8) * (i + 1);
        $(notActiveCities[i]).css('top', top + 'px');
    }
}

function setBgGabarites(){
    let cities = $('.HeaderInfo-City__El');
    let width = 0;
    let height = 40;
    for(let i = 0; i < cities.length; i++){
        if($(cities[i]).width() > width){
            width = $(cities[i]).width();
        }
        height += 32;
    }
    height -= 32;
    width += 24;
    $('.HeaderInfo-City__Bg').width(width);
    $('.HeaderInfo-City__Bg').height(height);
}

function setNewCity(_this){
    $('.HeaderInfo-City__El_active').removeClass('HeaderInfo-City__El_active');
    _this.addClass('HeaderInfo-City__El_active');

    $('.HeaderInfo__Phone_active').removeClass('HeaderInfo__Phone_active');
    $(`.HeaderInfo__Phone[data-phonenum="${_this.attr('data-phonenum')}"]`).addClass('HeaderInfo__Phone_active');

    setBgGabarites();
    sortAndMoveCities();
    setCityWidth();
}

// Функции адаптивного меню




$(document).ready( function(){
    sortAndMoveCities();
    waitforCSSisApplied().then(() => {
        setTimeout(function (){
            setCityWidth();
        }, 200);
        setBgGabarites();
    })
    $(document).on('click', '.HeaderInfo-City__El:not(.HeaderInfo-City__El_active)', function (){
        setNewCity($(this))
    })
});


function showMobMenu(){
    compensateBody();
    $('.Burger').addClass('Burger_active');
    $('.mobileMenu').addClass('mobileMenu_active');
}
function hideMobMenu(){
    $('.mobileMenu').removeClass('mobileMenu_active');
    $('.Burger').removeClass('Burger_active');
    setTimeout(function (){
        unCompensateBody();
    }, 300)
}

$(document).ready(function (){
    $(document).on('click', '.Burger', function (){
        if(!$(this).hasClass('Burger_active')){
            showMobMenu();
        } else {
            hideMobMenu();
        }
    })

    $(document).on('click', '.mobileMenu', function (){
        hideMobMenu();
    })

    $(document).on('click', '.mobileMenu-Wrap', function (e){
        e.stopPropagation();
    })
})