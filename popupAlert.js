function PopupAlert(option){
        this.type           = null;
        this.msg            = null;
        this.cb             = null;
        this.popupParent    = null;
        this.popup          = null;
        this.className      = null;
        this.init(option);
}

PopupAlert.prototype = {
    init : function(option){
        this.popup = null;
        this.className = {
            popupParent : 'popup-alert-area',
            popup       : 'popup-alert',
            btnConfirm  : 'btn-confirm-popup-alert',
            btnCancel   : 'btn-cancel-popup-alert'
        };
        this.msg    = option.msg;
        this.type    = option.type || 'alert';
        this.cb     = option.callback;

        this.createParentElement();
        this.createPopup();
        this.createBtns();
        this.popupEvent();
    },

    createParentElement : function(){
        if( document.getElementById(this.className.popupParent) === null ) {
            document.querySelector('body').insertAdjacentHTML('beforeend', '<div id="'+this.className.popupParent+'"></div>');
        }
        this.popupParent = document.getElementById(this.className.popupParent);
    },

    createPopup(){
        var idx = this.popupParent.querySelectorAll('.'+this.className.popup).length;
        var html = '<div id="'+this.className.popup+idx+'"class="' +this.className.popup+'">' +
                        '<div class="popup-alert-text-area">' + 
                            '<p class="popup-alert-text">'+this.msg+'</p>'+
                        '</div>' +
                    '</div>';
        this.popupParent.insertAdjacentHTML('beforeend', html );
        this.popup = this.popupParent.querySelector('#'+this.className.popup+idx);
    },

    createBtns: function(){
        var btns = null;
        var objthis = this;
        var btnType1 = function(){
            btns =  '<div class="popup-alert-btn-area type2">' +
                        '<button type="button" class="'+objthis.className.btnConfirm+'">확인</button>' +
                    '</div>';
        };
        var btnType2 = function(){
            btns = '<div class="popup-alert-btn-area type1">' +
                        '<button type="button" class="'+objthis.className.btnCancel+'">취소</button>' +
                        '<button type="button" class="'+objthis.className.btnConfirm+'">확인</button>' +
                    '</div>';
        };
        switch(this.type){
            case 'alert' : 
                btnType1();
                break;
            case 'confirm' : 
                btnType2();
                break;
            default : 
                throw Error('plz choise "alert" and "confirm"');
        }
        this.popup.insertAdjacentHTML('beforeend',btns);
    },

    popupEvent: function(){
        var objthis = this;
        var confirmBtn  = this.popup.querySelector('.'+this.className.btnConfirm);
        var closeBtn    = this.popup.querySelector('.'+this.className.btnCancel);
        if(this.cb ){
            if(closeBtn){closeBtn.addEventListener('click', function(){ objthis.closePopupEvent(); })};
            confirmBtn.addEventListener('click', function(){ objthis.confirmPopupEvent(); });
        }else{
            confirmBtn.addEventListener('click',function(){ objthis.closePopupEvent(); });
        }
    },

    hidePopupEvent: function(){
        if( this.popupParent.querySelectorAll('.'+this.className.popup).length == 0 ) this.popupParent.remove();
    },

    closePopupEvent: function(){
        this.popup.remove();
        this.hidePopupEvent();
    },

    confirmPopupEvent: function(){
        this.popup.remove();
        this.hidePopupEvent();
        this.cb();
    }
}