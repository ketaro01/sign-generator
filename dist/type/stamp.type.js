'use strict';

// :: default options ::
// * svg 전체 width, height
var BOX_WIDTH = 122;
var BOX_HEIGHT = 122;
// * font size
var CHAR_SIZE = 22;
// * stroke option
var STROKE = '#ff0000';
var STROKE_WIDTH = 2.3;
// * append word
var APPEND_WORD = '인';
// * attributes font color
var ATTRIBUTES = { fill: 'red' };
// * font list test 용
var FONT_LIST = [];
// :: default options ::

// border type
var SIGN_TYPE = {
  RECT: 'RECT',
  CIRCLE: 'CIRCLE'
};

// text_size 별 생성 유형.
var TEXT_SIZE = {
  1: function _(text) {
    return [{ size: text.length, type: SIGN_TYPE.CIRCLE, col: 1, row: 1, word: text }];
  },
  2: function _(text) {
    return [{ size: text.length, type: SIGN_TYPE.CIRCLE, col: 1, row: 2, word: text }];
  },
  3: function _(text) {
    return [{ size: text.length, type: SIGN_TYPE.CIRCLE, col: 1, row: 3, word: text }, { size: text.length, type: SIGN_TYPE.CIRCLE, col: 2, row: 2, word: text + APPEND_WORD }, { size: text.length, type: SIGN_TYPE.RECT, col: 2, row: 2, word: text + APPEND_WORD }];
  },
  4: function _(text) {
    return [{ size: text.length, type: SIGN_TYPE.CIRCLE, col: 2, row: 2, word: text }, { size: text.length, type: SIGN_TYPE.RECT, col: 2, row: 2, word: text }];
  },
  5: function _(text) {
    return [{ size: text.length, type: SIGN_TYPE.RECT, col: 3, row: 2, word: text + APPEND_WORD }];
  },
  6: function _(text) {
    return [{ size: text.length, type: SIGN_TYPE.RECT, col: 3, row: 2, word: text }];
  },
  7: function _(text) {
    return [{ size: text.length, type: SIGN_TYPE.RECT, col: 4, row: 2, word: text + APPEND_WORD }];
  },
  8: function _(text) {
    return [{ size: text.length, type: SIGN_TYPE.RECT, col: 4, row: 2, word: text }];
  },
  9: function _(text) {
    return [{ size: text.length, type: SIGN_TYPE.RECT, col: 3, row: 3, word: text }, { size: text.length, type: SIGN_TYPE.CIRCLE, col: 3, row: 3, word: text }];
  }
};

module.exports = {
  BOX_HEIGHT: BOX_HEIGHT,
  BOX_WIDTH: BOX_WIDTH,
  STROKE: STROKE,
  STROKE_WIDTH: STROKE_WIDTH,
  ATTRIBUTES: ATTRIBUTES,
  CHAR_SIZE: CHAR_SIZE,
  SIGN_TYPE: SIGN_TYPE,
  FONT_LIST: FONT_LIST,
  TEXT_SIZE: TEXT_SIZE
};