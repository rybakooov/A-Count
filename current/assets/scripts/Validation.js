// Валидация и маска телефон

function checkPhone(){
    if ($(this).attr('data-required') !== undefined) {
        if(!$(this).inputmask("isComplete")){
            $(this).removeClass('input-border');
            $(this).addClass('input-err');
        } else {
            $(this).removeClass('input-err');
            $(this).addClass('input-border');
        }
    } else if ($(this).val() === '') {
        $(this).removeClass('input-border');
    } else {
        $(this).addClass('input-border');
    }
}


// Валидация email

const emailPattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;

function checkEmail(){
    if ($(this).attr('data-required') !== undefined) {
        if($(this).val().search(emailPattern) !== 0){
            $(this).removeClass('input-border');
            $(this).addClass('input-err');
        } else {
            $(this).removeClass('input-err');
            $(this).addClass('input-border');
        }
    } else if ($(this).val() === '') {
        $(this).removeClass('input-border');
    } else {
        $(this).addClass('input-border');
    }
}

// Валидация обычных текстовых полей

function checkText(){
    if ($(this).attr('data-required') !== undefined) {
        if($(this).val() === ''){
            $(this).removeClass('input-border');
            $(this).addClass('input-err');
        } else {
            $(this).removeClass('input-err');
            $(this).addClass('input-border');
        }
    } else if ($(this).val() === '') {
        $(this).removeClass('input-border');
    } else {
        $(this).addClass('input-border');
    }
}



// Валидация чек-боксов

function checkCheckbox(){
    if($(this).prop('checked') !== true) {
        $(this).removeClass('input-border');
        $(this).addClass('input-err');
    } else {
        $(this).removeClass('input-err');
        $(this).addClass('input-border');
    }
}


// Подсвечиваем всю форму
function checkForm(form){
    let phones = form.find('input[data-type="tel"]');
    let emails = form.find('input[data-type="email"]');
    let texts = form.find('input:not([data-type="email"]):not([data-type="tel"])');
    let checks = form.find('input[type="checkbox"][data-required]');

    phones.each(function (){
        checkPhone.apply(this);
    })
    emails.each(function (){
        checkEmail.apply(this);
    })
    texts.each(function (){
        checkText.apply(this);
    })
    checks.each(function (){
        checkCheckbox.apply(this);
    })
}



// Проверяем всю форму
function Validation(form){
    let valid = true;
    form.find('input[data-required]').each(function (el, i){
        if (!$(this).hasClass('input-border')){
            valid = false;
        }
    })
    return valid;
}



// Чистим форму
function cleanForm(form){
    form.find('.input-err, .input-border').each(function (){
        $(this)
            .removeClass('input-err')
            .removeClass('input-border')
            .val('')
    })
}





function submitForm(elem, event){
    event.preventDefault();
    let form = $(elem).closest('form');
    checkForm(form);
    if (Validation(form)) {
        if(form.hasClass('FormPopup')){
            $('.FormPopup').showPopup('hide');
            setTimeout(function (){
                $('.SuccessForm').showPopup('show');
                setTimeout(function (){
                    $('.SuccessForm').showPopup('hide');
                }, 2000)
            }, 500)
        } else {
            $('.SuccessForm').showPopup('show');
            setTimeout(function (){
                $('.SuccessForm').showPopup('hide');
            }, 2000)
        }
        cleanForm(form);
    }
}




$(document).ready(function (){



    $(document).find('[data-type="tel"]').inputmask({
        mask: "+7 (999) 999-99-99",
        showMaskOnHover: false,
        showMaskOnFocus: true
    });

    $(document).on('blur', 'input[data-type="tel"]', function (){
        checkPhone.apply(this);
    })

    $(document).on('blur', 'input[data-type="email"]', function (){
        checkEmail.apply(this);
    })

    $(document).on('blur', 'input:not([data-type="email"]):not([data-type="tel"])', function (){
        checkText.apply(this);
    })

    $(document).on('change', 'input[type="checkbox"][data-required]', function (){
        checkCheckbox.apply(this);
    })


})