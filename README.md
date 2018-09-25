# popupAlert

## 수정된 부분
- PopupAlert arguments의 갯수 3개로 제한
- arguments의 type에 따라 적용 ( string : alert msg ) / ( function : callback ) / ( number : button type )
- 버튼 경우의 수 ( 1: 확인 버튼 1개 , 2: 확인 취소 버튼 2개 )

## 수정할 부분
- 객체로 옵션값 넘기기
  1. 팝업 아이디 혹은 클래스명
  2. 팝업 레이아웃, 버튼 클래스명
  3. 버튼 수 옵션에 포함
  4. 반응형 대응 pc only or mobile only 