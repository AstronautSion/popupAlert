# popupAlert 

시스템 Alert을 대체할 커스텀 가능한 popupAlert plugin 입니다.

## Installation

### HTML

먼저 popupAlert.css와 popupAlert.js 파일들을 선언.

```html
    <link rel="stylesheet" href="popupAlert.css">
    <script src="popupAlert.js"></script>
```

### JS

생성자 함수 new PopupAlert()를 선언한 뒤, option 값들을 객체로 넘겨줌.

```javascript

    new PopupAlert({
        msg: 'popupAlerts', // 팝업 메세지
        button: 2, //버튼의 갯수
        callback: function(){
            console.log('hihi'); // 팝업 확인 클릭시 실행
        }
    })
```
option 값들은 다음과 같다.
1. msg      : '팝업 메세지'        [ type: string, default: null ]
2. button   : 2 *(1, 2)*          [ type: number, default: 2]
3. callback : function(){...}   [ type: function, default: null ]
