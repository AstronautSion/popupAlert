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
        type: 'confirm', // popup type
        msg: 'popupAlerts', // 팝업 메세지
        callback: function(){
            console.log('hihi'); // 팝업 확인 클릭시 실행
        }
    })
```


<br>
<br>

## Option


| 값 | 의미 | 기본값 |
|---|---|---:|
| `type` | 타입지정 `alert`,`confirm` | `alert` |
| `msg` | 팝업창 안에 들어갈 내용 |  |
| `callback` | 팝업 확인버튼을 클릭한 후 실행되는 함수 |  |
