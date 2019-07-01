class PopupAlert{
    constructor(option){
        this.type           = null;
        this.msg            = null;
        this.cb             = null;
        this.popupParent    = null;
        this.popup          = null;
        this.className      = null;
        this.init(option);
    }

    init(option){
        this.popup = null;
        this.className = {
            popupParent : 'popup-alert-area',
            popup       : 'popup-alert',
            btnConfirm  : 'btn-confirm-popup-alert',
            btnCancel   : 'btn-cancel-popup-alert'
        };
        this.msg    = option.msg;
        this.type   = option.button || 'alert';
        this.cb     = option.callback;

        this.createParentElement();
        this.createPopup();
        this.createBtns();
        this.popupEvent();
    }
    
    createParentElement(){
        if( document.getElementById(this.className.popupParent) === null ) {
            document.querySelector('body').insertAdjacentHTML('beforeend', '<div id="'+this.className.popupParent+'"></div>');
        }
        this.popupParent = document.getElementById(this.className.popupParent);
    }

    createPopup(){
        let idx = this.popupParent.querySelectorAll('.'+this.className.popup).length;
        let html = `
            <div id="`+this.className.popup+idx+`" class="`+this.className.popup+`">
                <div class="popup-alert-text-area">
                    <p class="popup-alert-text">`+this.msg+`</p>
                </div>  
            </div>`;

        this.popupParent.insertAdjacentHTML('beforeend', html );
        this.popup = this.popupParent.querySelector('#'+this.className.popup+idx);
    }

    createBtns(){
        let btns = null;
        let btnType1 = () => {
            btns =  `
                <div class="popup-alert-btn-area type2">
                    <button type="button" class="`+this.className.btnConfirm+`">확인</button>
                </div>`;
        };
        let btnType2 = () => {
            btns =  `
                <div class="popup-alert-btn-area type1">
                    <button type="button" class="`+this.className.btnCancel+`">취소</button>
                    <button type="button" class="`+this.className.btnConfirm+`">확인</button>
                </div>`;
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
    }

    popupEvent(){
        let confirmBtn  = this.popup.querySelector('.'+this.className.btnConfirm);
        let closeBtn    = this.popup.querySelector('.'+this.className.btnCancel);
        if(this.cb ){
            if(closeBtn){closeBtn.addEventListener('click', () => { this.closePopupEvent(); })};
            confirmBtn.addEventListener('click', () => { this.confirmPopupEvent(); });
        }else{
            confirmBtn.addEventListener('click',() => { this.closePopupEvent(); });
        }
    }
    
    hidePopupEvent(){
        if( this.popupParent.querySelectorAll('.'+this.className.popup).length == 0 ) this.popupParent.remove();
    }

    closePopupEvent(){
        this.popup.remove();
        this.hidePopupEvent();
    }

    confirmPopupEvent(){
        this.popup.remove();
        this.hidePopupEvent();
        this.cb();
    }



}
