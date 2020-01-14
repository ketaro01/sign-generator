
// :: default options ::
// * svg 전체 width, height
const BOX_WIDTH = 122;
const BOX_HEIGHT = 122;
// * font size
const CHAR_SIZE = 22;
// * stroke option
const STROKE = '#ff0000';
const STROKE_WIDTH = 2.3;
// * append word
const APPEND_WORD = '인';
// * attributes font color
const ATTRIBUTES = { fill: 'red' };
// * font list test 용
const FONT_LIST = [];
// :: default options ::

// border type
const SIGN_TYPE = {
  RECT: 'RECT',
  CIRCLE: 'CIRCLE',
};

// text_size 별 생성 유형.
const TEXT_SIZE = {
  1: (text) => [ { size: text.length, type: SIGN_TYPE.CIRCLE, col: 1, row: 1, word: text } ],
  2: (text) => [ { size: text.length, type: SIGN_TYPE.CIRCLE, col: 1, row: 2, word: text } ],
  3: (text) => [
    { size: text.length, type: SIGN_TYPE.CIRCLE, col: 1, row: 3, word: text },
    { size: text.length, type: SIGN_TYPE.CIRCLE, col: 2, row: 2, word: text + APPEND_WORD },
    { size: text.length, type: SIGN_TYPE.RECT, col: 2, row: 2, word: text + APPEND_WORD },
  ],
  4: (text) => [
    { size: text.length, type: SIGN_TYPE.CIRCLE, col: 2, row: 2, word: text },
    { size: text.length, type: SIGN_TYPE.RECT, col: 2, row: 2, word: text },
  ],
  5: (text) => [
    { size: text.length, type: SIGN_TYPE.RECT, col: 3, row: 2, word: text + APPEND_WORD },
  ],
  6: (text) => [
    { size: text.length, type: SIGN_TYPE.RECT, col: 3, row: 2, word: text },
  ],
  7: (text) => [
    { size: text.length, type: SIGN_TYPE.RECT, col: 4, row: 2, word: text + APPEND_WORD },
  ],
  8: (text) => [
    { size: text.length, type: SIGN_TYPE.RECT, col: 4, row: 2, word: text },
  ],
  9: (text) => [
    { size: text.length, type: SIGN_TYPE.RECT, col: 3, row: 3, word: text },
    { size: text.length, type: SIGN_TYPE.CIRCLE, col: 3, row: 3, word: text },
  ],
};

module.exports = {
  BOX_HEIGHT,
  BOX_WIDTH,
  STROKE,
  STROKE_WIDTH,
  ATTRIBUTES,
  CHAR_SIZE,
  SIGN_TYPE,
  FONT_LIST,
  TEXT_SIZE,
};