function PopupAlert(msg, callback){
    this.popupParent    = null;
    this.popup          = null;

    this.strPopup       = null;
    this.strBtnConfirm  = null;
    this.strBtnCancel   = null;

    this.msg            = null;
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
        this.popup          = null;
        
        this.strPopup       = 'popup-alert';
        this.strBtnConfirm  = 'btn-confirm-popup-alert';
        this.strBtnCancel   = 'btn-cancel-popup-alert';

        this.msg            = msg;
        this.cb             = callback;

        this.initEvent();
        this.createPopup();
        this.createBtnChoice();
        this.popupEvent();
    },
    initEvent: function(){
        if( document.querySelectorAll('.'+this.strPopup).length === 0 ){
            this.popupParent.style.display = "block";
        }
    },
    createPopup : function(){
        var idx = document.querySelectorAll('.'+this.strPopup).length;
        var html = '<div id="'+this.strPopup+idx+'" class="'+this.strPopup+'">' + 
                        '<div class="popup-alert-text-area">' + 
                            '<p class="popup-alert-text">'+this.msg+'</p>' +
                        '</div>' +
                    '</div>';   
        this.popupParent.insertAdjacentHTML('beforeend', html);
        this.popup = this.popupParent.querySelector('#'+this.strPopup+idx);
    },
    createBtnChoice : function(){
        var btns = null;
        if(this.cb){
            btns =  '<div class="popup-alert-btn-area type1">' + 
                        '<button type="button" class="'+this.strBtnCancel+'">취소</button>' +
                        '<button type="button" class="'+this.strBtnConfirm+'">확인</button>' +
                    '</div>';
        }else{ 
            btns =  '<div class="popup-alert-btn-area type2">' + 
                        '<button type="button" class="'+this.strBtnConfirm+'">확인</button>' +
                    '</div>';
        }
        this.popup.insertAdjacentHTML('beforeend',btns);
    },
    popupEvent : function(){
        var that        = this;
        var confirmBtn  = this.popup.querySelector('.'+this.strBtnConfirm);
        var closeBtn    = this.popup.querySelector('.'+this.strBtnCancel);
        if(this.cb){
            closeBtn.addEventListener('click', function(){ that.closePopupEvent(); });
            confirmBtn.addEventListener('click', function(){ that.confirmPopupEvent(); });
        }else{
            confirmBtn.addEventListener('click', function(){ that.closePopupEvent(); });
        }
    },
    hidePopupEvent : function(){
        if( this.popupParent.querySelectorAll('.'+this.strPopup).length == 0 ){
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

