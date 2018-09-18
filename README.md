# popupAlert

## 수정된 부분
- PopupAlert arguments의 갯수 3개로 제한
- arguments의 type에 따라 적용 ( string : alert msg ) / ( function : callback ) / ( number : button type )

## 수정할 부분
1. 버튼 경우의 수 :
    - null : default value 3
    - 1    : button 1, callback 0
    - 2    : button 1, callback 1
    - 3    : button 2, callback 1 