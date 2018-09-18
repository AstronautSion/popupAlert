# popupAlert

수정된 부분
- PopupAlert arguments의 갯수 3개로 제한
- arguments의 type에 따라 적용 ( string : 얼럿메세지 ) / ( function : callback ) / ( number : button type )

수정할 부분
1. 버튼 경우의 수 :
    - null : 기본세팅값 (3)
    - 1    : 버튼 1, 콜백 0
    - 2    : 버튼 1, 콜백 1
    - 3    : 버튼 2, 콜백 1 