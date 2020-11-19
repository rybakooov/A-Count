(function ($){
    // our plugin constructor

    let pluginsID = [];

    let Plugin = function( elem, options ){
        this.elem = elem;
        this.$elem = $(elem);
        this.options = $.extend({
            padding: '0px',
            closeBtnInside: true,
            openSelector: null,
            speedShowClose: 500,
        }, options);
        this.stateEl = null;
    };

    const template = {
        Popup: '<div class="Popup"></div>',
        PopupWrap: '<div class="Popup-Wrap"></div>',
        PopupClose: '<div class="Popup__Close"><svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 17.71L9 9.70996M17 1.70996L9 9.70996M9 9.70996L17 17.71M9 9.70996L1 1.70996" stroke="#0F0F0F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>',
        PopupContent: '<div class="Popup-Content"></div>',
    }



    Plugin.prototype = {
        init: function (){

            //! WRAP ELEM
            this.$elem.wrap(template.Popup);
            this.$elem.wrap(template.PopupWrap);
            this.$elem.wrap(template.PopupContent);
            this.$elem.closest('.Popup-Wrap').prepend(template.PopupClose);

            //! SET STATE EL
            this.stateEl = {
                Popup: this.$elem.closest('.Popup'),
                PopupContent: this.$elem.closest('.Popup-Content'),
                PopupClose: this.$elem.closest('.Popup-Wrap').find('.Popup__Close'),
            }

            //! ADD CSS
            this.stateEl.Popup.css({
                transition: this.options.speedShowClose + 'ms'
            })
            this.stateEl.PopupContent.css({
                padding: this.options.padding,
            })
            if(!this.options.closeBtnInside){
                this.stateEl.PopupClose.addClass('Popup__Close_outside');
            }

            //! SET LISTENERS
            let _this = this;
            this.stateEl.Popup.on('click', function (){
                _this.hide();
            })

            this.stateEl.PopupContent.on('click', function(e){
                e.stopPropagation();
            })

            this.stateEl.PopupClose.on('click', function (){
                _this.hide();
            });

            if(this.options.openSelector != null){
                this.options.openSelector.forEach(function(item) {
                    $(document).on('click', item, function (){
                        _this.show();
                    })
                });
            }

            $(window).on('resize', function(){
                _this.hide();
            })

            return this;

        },
        show: function (){
            compensateBody();
            this.stateEl.Popup.addClass('Popup_open');
        },
        hide: function (){
            this.stateEl.Popup.removeClass('Popup_open');
            setTimeout(function (){
                unCompensateBody();
            }, this.options.speedShowClose)
        },
    }

    Plugin.show = Plugin.prototype.show;
    Plugin.hide = Plugin.prototype.hide;

    $.fn.showPopup = function (options){
        if ( typeof options === 'object' || !options ) {
            let newPlugin = new Plugin(this, options).init();
            $(this[0]).attr('data-class', pluginsID.length)
            pluginsID.push(newPlugin);
        } else if(Plugin.prototype[options]) {
            pluginsID[$(this[0]).attr('data-class')][options]();
        } else {
            $.error( 'Метод с именем ' +  options + ' не существует для jQuery.tooltip' );
        }
    }
})(jQuery);

