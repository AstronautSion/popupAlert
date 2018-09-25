function PopupAlert(){
    
    this._popupParent    = null;
    this._popup          = null;
    this._classNm        = null;
    this._btnNum         = null;
    this._msg            = null;
    this._cb             = null;
    this._init(arguments);
}

PopupAlert.prototype = {
    
    _init : function( arguments){

        if(arguments.lenth > 2 ) throw Error('arguments length too many..');
        else if(arguments.lenth === 0) throw Error('plz write a letter');

        var objThis = this;
        Array.prototype.slice.call(arguments).forEach(function(arg){
            if( typeof arg === 'string' ) objThis._msg = arg; 
            else if( typeof arg === 'function') objThis._cb = arg;
            else if( typeof arg === 'number') {
                if(arg === null || ( arg >= 0 && arg < 3 )) objThis._btnNum = arg;
                else{ throw Error('Choice number 1 and 2'); }
            }
        });
        
        this._popupParent    = document.getElementById('popupAlert');
        this._popup          = null;
        this._classNm       = {
            popup       : 'popup-alert',
            btnConfirm  : 'btn-confirm-popup-alert',
            btnCancel   : 'btn-cancel-popup-alert'
        };
       
        this._initEvent();
        this._createPopup();
        this._createBtnChoice();
        this._popupEvent();
    },
    _initEvent: function(){
        if( document.querySelectorAll('.'+this._classNm.popup).length === 0 ){
            this._popupParent.style.display = "block";
        }
    },
    _createPopup : function(){
        var idx = document.querySelectorAll('.'+this._classNm.popup).length;
        var html = '<div id="'+this._classNm.popup+idx+'" class="'+this._classNm.popup+'">' + 
                        '<div class="popup-alert-text-area">' + 
                            '<p class="popup-alert-text">'+this._msg+'</p>' +
                        '</div>' +
                    '</div>';   
        this._popupParent.insertAdjacentHTML('beforeend', html);
        this._popup = this._popupParent.querySelector('#'+this._classNm.popup+idx);
    },
    _createBtnChoice : function(){
        var btns = null;
        if(this._btnNum === 2 ){
            btns =  '<div class="popup-alert-btn-area type1">' + 
                        '<button type="button" class="'+this._classNm.btnCancel+'">취소</button>' +
                        '<button type="button" class="'+this._classNm.btnConfirm+'">확인</button>' +
                    '</div>';
        }else{ 
            btns =  '<div class="popup-alert-btn-area type2">' + 
                        '<button type="button" class="'+this._classNm.btnConfirm+'">확인</button>' +
                    '</div>';
        }
        this._popup.insertAdjacentHTML('beforeend',btns);
    },
    _popupEvent : function(){
        var objThis     = this;
        var confirmBtn  = this._popup.querySelector('.'+this._classNm.btnConfirm);
        var closeBtn    = this._popup.querySelector('.'+this._classNm.btnCancel);
        
        if(this._cb ){
            if(closeBtn){closeBtn.addEventListener('click', function(){ objThis._closePopupEvent(); })};
            confirmBtn.addEventListener('click', function(){ objThis._confirmPopupEvent(); });
        }else{
            confirmBtn.addEventListener('click', function(){ objThis._closePopupEvent(); });
        }
    },
    _hidePopupEvent : function(){
        if( this._popupParent.querySelectorAll('.'+this._classNm.popup).length == 0 ){
            this._popupParent.style.display = 'none';
        }
    },
    _closePopupEvent: function(){
        this._popup.remove();
        this._hidePopupEvent();
    },
    _confirmPopupEvent: function(){
        this._popup.remove();
        this._hidePopupEvent();
        this._cb();
    }
}

