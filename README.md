# Twitter React

## SCSS 기능

1. **변수**

- SCSS변수는 스타일시트에서 자주 사용되는 값을 저장하고 재사용 가능.
- 스타일 일관성· 유지보수 향상 기대
  - font size, color, margin 값들을 변수로 저장해 중복을 피하고 유지보수 간소화
- 변수를 사용하면 스타일 코드가 보다 명확해지는 효과 기대, 스타일 정리 더욱 편리

```js
$main-color : #f2f2f2;
$font-size : 18px;
$font-size-large : 30px;

.header{
  background-color : $main-color;
  font-size: $font-size-large;
}

.button{
  font-size: $font-size;
}
```

2. **중첩규칙**

- CSS 규칙을 더 명확하고 계층적으로 표현
- 코드의 가독성을 높이고, 유지보수 용이
  - 스타일을 중첩규칙으로 작성하면 구조적으로 코드를 정리 가능
- 상위 요소의 스타일을 중복해서 작성하지 않고도 하위 요소에 쉽게 적용 가능

```js
.header{
  background : pink;
  padding : 20px;

  h1{
    color : gray;
  }

  .menu{
    display : flex;

    li{
      margin-right: 15px;

      &:hover{
        background : skyblue;
      }
    }
  }
}
```

3. **믹스인(Mixins)**

- Mixins이란 SCSS에서 스타일 속성과 값을 묶어서 재사용 가능한 코드 블럭을 생성하는 기능
- 반복되는 스타일 중복 방지
  - 예를 들어 서비스에서 버튼이 많이 사용되면 믹스인으로 스타일을 정의하고 필요한 곳에서 호출해서 사용
- 스타일 코드를 재사용 가능한 함수로 사용 가능
- 스타일 코드의 간결성과 일관성 유지

```js

```
