function PopupAlert(){
    
    this._popupParent    = null;
    this._popup          = null;
    this._classNm        = null;
    this._btnNum         = null;
    this._msg            = null;
    this._cb             = null;
    this.init(arguments);
}
PopupAlert.error = function(){
    throw Error('new PopupAlert( string, [ function ]) ::Plz check the Type of arguments');
}
PopupAlert.prototype = {
    
    init : function( arguments){

        if(arguments.lenth > 2 ) throw Error('arguments length too many..');
        else if(arguments.lenth === 0) throw Error('plz write a letter');
        var that = this;
        Array.prototype.slice.call(arguments).forEach(function(a){
            if( typeof a === 'string' ) that._msg = a; 
            else if( typeof a === 'fuction') that._cb = a;
            else if( typeof a === 'number') that._btnNum = a;
        });
        
        this._popupParent    = document.getElementById('popupAlert');
        this._popup          = null;
        this._classNm       = {
            popup       : 'popup-alert',
            btnConfirm  : 'btn-confirm-popup-alert',
            btnCancel   : 'btn-cancel-popup-alert'
        };
       
        this.initEvent();
        this.createPopup();
        this.createBtnChoice();
        this.popupEvent();
    },
    initEvent: function(){
        if( document.querySelectorAll('.'+this._classNm.popup).length === 0 ){
            this._popupParent.style.display = "block";
        }
    },
    createPopup : function(){
        var idx = document.querySelectorAll('.'+this._classNm.popup).length;
        var html = '<div id="'+this._classNm.popup+idx+'" class="'+this._classNm.popup+'">' + 
                        '<div class="popup-alert-text-area">' + 
                            '<p class="popup-alert-text">'+this._msg+'</p>' +
                        '</div>' +
                    '</div>';   
        this._popupParent.insertAdjacentHTML('beforeend', html);
        this._popup = this._popupParent.querySelector('#'+this._classNm.popup+idx);
    },
    createBtnChoice : function(){
        if( this._btnNum == null ){
            console.log('test');
        }
        //null = 기본상태 (2)
        //1 = 버튼 1개 콜백 0개
        //2 = 버튼 1개 콜백 1개
        //3 = 버튼 2개 콜백 1개

        var btns = null;
        if(this._cb){
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
    popupEvent : function(){
        var that        = this;
        var confirmBtn  = this._popup.querySelector('.'+this._classNm.btnConfirm);
        var closeBtn    = this._popup.querySelector('.'+this._classNm.btnCancel);
        if(this._cb){
            closeBtn.addEventListener('click', function(){ that.closePopupEvent(); });
            confirmBtn.addEventListener('click', function(){ that.confirmPopupEvent(); });
        }else{
            confirmBtn.addEventListener('click', function(){ that.closePopupEvent(); });
        }
    },
    hidePopupEvent : function(){
        if( this._popupParent.querySelectorAll('.'+this._classNm.popup).length == 0 ){
            this._popupParent.style.display = 'none';
        }
    },
    closePopupEvent: function(){
        this._popup.remove();
        this.hidePopupEvent();
    },
    confirmPopupEvent: function(){
        this._popup.remove();
        this.hidePopupEvent();
        this._cb();
    }
}

