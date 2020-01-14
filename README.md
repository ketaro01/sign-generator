# sign-generator
도장 및 서명을 svg 형태로 생성하기 위한 라이브러리 입니다.

## Installation: 
```` 
$ npm install --save sign-generator
```` 

## Usage
file 형태의 폰트를 사용해야 하기 때문에 express 서버에서 사용하는 것을 권장합니다.

## In Node.js: 
```javascript
const { createSign, createStamp } = require('sign-generator');

// SIGN ES6
try {
    const fonts = ['PINYON_EN', 'PARISIENNE_EN', 'PETITFORMAL_EN'].map(value => `fonts/${value}.ttf`); // ttf file path
    const signItems = await createSign(text, fonts); // return <svg>...</svg>
} catch(e) {
    // error
} 

// STAMP ES6
try {
    const fonts = ['MISEANG', 'GODOMAUM', 'TVN'].map(value => `fonts/${value}.ttf`); // ttf file path
    const signItems = await createStamp(text, fonts); // return <svg>...</svg>
} catch(e) {
    // error
}
```

## In express: 
```javascript
const { createSign } = require('sign-generator');

app.get('/sign/:text', async (req, res) => {
    try {
        const signItems = await createSign(req.params.text, 'fonts/PINYON_EN.ttf'); // return <svg>...</svg>
        res.status(200).send(signItems.join('\n'));
    } catch(e) {
        // error
    } 
});
```

## Output
### sign
<img src="https://i.ibb.co/2WdTPW5/sign.png" alt="sign" border="0">

### stamp
<img src="https://i.ibb.co/DQkyb9P/stamp.png" alt="stamp" border="0">


## createSign, createStamp parameters
name                | type               | required   | default   | description
:------------------ | :----------------: | :--------: | :-------: | ------------
`text`              | string             | ✓          | -         | 변환할 텍스트
`fonts`             | string&#124;object | ✓          | -         | 폰트 경로(only file) 
`options`           | object             | ✘          | -         | 세부 옵션 

#### createSign Available options
name                | type               | default                    | description
:------------------ | :----------------: | :------------------------- | ------------
`fontSize`          | number             | 22                         | font size
`attributes`        | object             | { fill: 'black' }          | font color 
`boxOption`         | object             | { width: 100,height: 200 } | 전체 svg 화면 크기

 
 #### createStamp Available options
name                | type               | default                                 | description
:------------------ | :----------------: | :-------------------------------------- | ------------
`fontSize`          | number             | 22                                      | font size 
`attributes`        | object             | { fill: 'black' }                       | font color
`boxOption`         | object             | { width: 100,height: 200 }              | 전체 svg 화면 크기
`borderOption`      | object             | { stroke: '#ff0000', strokeWidth: 2.3 } | border option
