function getScrollBarWidth () {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild (inner);

    document.body.appendChild (outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild (outer);

    return (w1 - w2);
};



(function ($){
    const template = {
        Popup: '<div class="Popup"></div>',
        PopupWrap: '<div class="Popup-Wrap"></div>',
        PopupClose: '<div class="Popup__Close"><svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 17.71L9 9.70996M17 1.70996L9 9.70996M9 9.70996L17 17.71M9 9.70996L1 1.70996" stroke="#0F0F0F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>',
        PopupContent: '<div class="Popup-Content"></div>',
    }


    let stateEl = {
        Popup: null,
        PopupContent: null,
        PopupClose: null,
    }
    let methods = {
        updateStateEl: function (){
            stateEl.Popup = this.closest('.Popup');
            stateEl.PopupContent = this.closest('.Popup-Content');
            stateEl.PopupClose = this.closest('.Popup-Wrap').find('.Popup__Close');
        },
        init: function (options){
            let _this = this;

            methods.updateStateEl.apply(_this);
            methods.wrap.apply(_this);
            methods.addCss.apply(_this, arguments);


            stateEl.Popup.on('click', function (){
                methods.hide(options);
            })

            stateEl.PopupContent.on('click', function(e){
                e.stopPropagation();
            })

            stateEl.PopupClose.on('click', function (){
                methods.hide(options);
            });

            if(options.openSelector != null){
                options.openSelector.forEach(function(item) {
                    $(document).on('click', item, function (){
                        methods.updateStateEl.apply(_this);
                        methods.show.apply(_this);;
                    })
                });
            }

        },
        wrap: function (){
            this.wrap(template.Popup);
            this.wrap(template.PopupWrap);
            this.wrap(template.PopupContent);
            this.closest('.Popup-Wrap').prepend(template.PopupClose);
        },
        show: function (){
            methods.updateStateEl.apply(this);
            $('body').addClass('BodyOverflow');
            $('body').css('padding-right', getScrollBarWidth());
            stateEl.Popup.addClass('Popup_open');
        },
        hide: function (options){
            stateEl.Popup.removeClass('Popup_open');
            setTimeout(function (){
                $('body').attr('style', '');
                $('body').removeClass('BodyOverflow');
            }, options.speedShowClose)
        },
        addCss: function (options){
            methods.updateStateEl.apply(this);
            stateEl.Popup.css({
                transition: options.speedShowClose + 'ms'
            })
            stateEl.PopupContent.css({
                padding: options.padding,
            })
            if(!options.closeBtnInside){
                stateEl.PopupClose.addClass('Popup__Close_outside');
            }
        },
    }


    $.fn.showPopup = function (options){
        if ( typeof options === 'object' || ! options ) {
            options = $.extend({
                padding: '0px',
                closeBtnInside: true,
                openSelector: null,
                speedShowClose: 500,
            }, options);
            return methods.init.apply(this, arguments);
        } else if ( methods[options] ) {
            console.log(methods[options]);
            console.log(arguments);
            return methods[options].apply(this, arguments/*, Array.prototype.slice.call( arguments, 1 )*/);
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
        }
    }
})(jQuery);

