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

다음으로는 new PopupAlert() 을 선언한 뒤 인자로 option 값을 넘겨줌.

```javascript
    new PopupAlert({
        msg: 'popupAlerts', // 팝업 메세지
        button: 2, //버튼의 갯수
        callback: function(){
            console.log('hihi'); // 팝업 확인 클릭시 실행
        }
    })
```
옵션값은 다음과 같다.
1. msg: '안녕하세요.' //메세지를 string값으로 작성
2. button: 2 // 버튼 갯수를 작성 [ 1: 1개 , 2: 2개(기본값) ]
3. callback: 팝업 종료후 실행될 callback 함수를 작성.
