'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getFont = require('./getFont');

var _require = require('./type/sign.type'),
    BOX_HEIGHT = _require.BOX_HEIGHT,
    BOX_WIDTH = _require.BOX_WIDTH,
    FONT_SIZE = _require.FONT_SIZE,
    BOX_TAG_ST = _require.BOX_TAG_ST,
    BOX_TAG_END = _require.BOX_TAG_END,
    FONT_LIST = _require.FONT_LIST;

async function signGenerator(text, font) {
  // get font
  var textToSVG = await getFont(font);
  var options = { x: 0, y: 0, fontSize: FONT_SIZE, anchor: 'top left' };
  // get metrics
  var met_info = textToSVG.getMetrics(text, options);
  var width = Math.round(met_info.width * 1000) / 1000;
  var height = Math.round(met_info.height * 1000) / 1000;
  // 중앙정렬
  options.x = (BOX_WIDTH - width) / 2;
  options.y = (BOX_HEIGHT - height) / 2;

  // 사인 생성
  var sign = textToSVG.getPath(text, options);
  return '\n    ' + BOX_TAG_ST + '\n      ' + sign + '\n    ' + BOX_TAG_END + '\n  ';
}

/**
 * 날짜 : 2020.01.08
 * 내용 : 사인 생성 main
 * @param text
 * @param options {object}
 * @param options.font {array}
 */
async function createSign(text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var font = options.font;

  var text_size = text.length;

  // text 크기는 최소 1자 ~ 9자 까지.
  if (!text_size || text_size < 0 || text_size > 20) throw new Error('invalid parameter: text(min: 1, max: 20)');
  if (!!font && (typeof font === 'undefined' ? 'undefined' : _typeof(font)) === 'object' && !Array.isArray(font)) throw new Error('invalid parameter: font');

  var fonts = [];
  var sign_list = [];

  // 폰트 정보가 있는 경우 해당 도장만 생성.
  switch (typeof font === 'undefined' ? 'undefined' : _typeof(font)) {
    case 'object':
      fonts = font;break;
    case 'string':
      fonts = [font];break;
    default:
      fonts = FONT_LIST;break;
  }

  // 등록된 폰트의 갯수만큼 루프
  for (var j = 0; j < fonts.length; j++) {
    // 도장 생성
    var sign = await signGenerator(text, fonts[j]);
    sign_list.push(sign); // 배열에 저장
  }
  return sign_list;
}

module.exports = createSign;