function PopupAlert(msg, callback){
    this.popupParent    = null;
    this.popup          = null;
    this.cb             = null;
    this.init(msg, callback);
}
PopupAlert.error = function(){
    throw Error('new PopupAlert( string, [ function ]) ::Plz check the Type of arguments');
}

PopupAlert.prototype = {

    init : function(msg, callback){
        if(typeof msg !== 'string') this.error();
        if(callback) if(typeof callback !== 'function'){ this.error(); }

        this.popupParent    = document.getElementById('popupAlert');
        this.msg            = msg;
        this.cb             = callback;
        this.createPopup();
        this.createBtnChoice();
        this.popupEvent();
    },
    createPopup : function(){ 
        var idx = document.querySelectorAll('.popup-alert').length;
        var html = '<div id="popup-alert'+idx+'" class="popup-alert">' + 
                        '<div class="popup-alert-text-area">' + 
                            '<p class="popup-alert-text">'+this.msg+'</p>' +
                        '</div>' +
                    '</div>';   
        this.popupParent.insertAdjacentHTML('beforeend', html);
        this.popup = this.popupParent.querySelector('#popup-alert'+idx);
    },
    createBtnChoice : function(){
        var btns = null;
        if(this.cb){
            btns =  '<div class="popup-alert-btn-area type1">' + 
                        '<button type="button" class="btn-close-popup-alert">취소</button>' +
                        '<button type="button" class="btn-confirm-popup-alert">확인</button>' +
                    '</div>';
        }else{ 
            btns =  '<div class="popup-alert-btn-area type2">' + 
                        '<button type="button" class="btn-confirm-popup-alert">확인</button>' +
                    '</div>';
        }
        this.popup.insertAdjacentHTML('beforeend',btns);
    },
    popupEvent : function(){
        var that        = this;
        var confirmBtn  = this.popup.querySelector('.btn-confirm-popup-alert');
        var closeBtn    = this.popup.querySelector('.btn-close-popup-alert');
        if(this.cb){
            closeBtn.addEventListener('click', function(){ that.closePopupEvent(); });
            confirmBtn.addEventListener('click', function(){ that.confirmPopupEvent(); });
        }else{
            confirmBtn.addEventListener('click', function(){ that.closePopupEvent(); });
        }
    },
    hidePopupEvent : function(){
        if( this.popupParent.querySelectorAll('.popup-alert').length == 0 ){
            this.popupParent.style.display = 'none';
        }
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
