'use strict';

var BOX_HEIGHT = 122;
var BOX_WIDTH = 122;
var CHAR_HEIGHT = 22;
var APPEND_WORD = '인';
var BOX_TAG_ST = '<svg width="' + BOX_WIDTH + '" height="' + BOX_HEIGHT + '">';
var BOX_TAG_END = '</svg>';
var SIGN_TYPE = {
  RECT: 'RECT',
  CIRCLE: 'CIRCLE'
};
var FONT_LIST = [];

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
    return [{ size: text.length, type: SIGN_TYPE.RECT, col: 3, row: 3, word: text }];
  }
};

module.exports = {
  BOX_HEIGHT: BOX_HEIGHT,
  BOX_WIDTH: BOX_WIDTH,
  CHAR_HEIGHT: CHAR_HEIGHT,
  BOX_TAG_ST: BOX_TAG_ST,
  BOX_TAG_END: BOX_TAG_END,
  SIGN_TYPE: SIGN_TYPE,
  FONT_LIST: FONT_LIST,
  TEXT_SIZE: TEXT_SIZE
};