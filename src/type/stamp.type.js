
const BOX_HEIGHT = 122;
const BOX_WIDTH = 122;
const CHAR_HEIGHT = 22;
const APPEND_WORD = '인';
const BOX_TAG_ST = `<svg width="${BOX_WIDTH}" height="${BOX_HEIGHT}">`;
const BOX_TAG_END = '</svg>';
const SIGN_TYPE = {
  RECT: 'RECT',
  CIRCLE: 'CIRCLE',
};
const FONT_LIST = [];

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
  ],
};

module.exports = {
  BOX_HEIGHT,
  BOX_WIDTH,
  CHAR_HEIGHT,
  BOX_TAG_ST,
  BOX_TAG_END,
  SIGN_TYPE,
  FONT_LIST,
  TEXT_SIZE,
};