'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getFont = require('./getFont');

var _require = require('./type/sign.type'),
    BOX_HEIGHT = _require.BOX_HEIGHT,
    BOX_WIDTH = _require.BOX_WIDTH,
    ATTRIBUTES = _require.ATTRIBUTES,
    FONT_SIZE = _require.FONT_SIZE,
    FONT_LIST = _require.FONT_LIST;

async function signGenerator(text, font, fontSize) {
  var attributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ATTRIBUTES;
  var boxOption = arguments[4];
  var _boxOption$width = boxOption.width,
      width = _boxOption$width === undefined ? BOX_WIDTH : _boxOption$width,
      _boxOption$height = boxOption.height,
      height = _boxOption$height === undefined ? BOX_HEIGHT : _boxOption$height;

  // get font

  var textToSVG = await getFont(font);
  var options = { x: 0, y: 0, fontSize: fontSize, anchor: 'top left', attributes: attributes };
  // get metrics
  var met_info = textToSVG.getMetrics(text, options);
  var textWidth = Math.round(met_info.width * 1000) / 1000;
  var textHeight = Math.round(met_info.height * 1000) / 1000;
  // 중앙정렬
  options.x = (width - textWidth) / 2;
  options.y = (height - textHeight) / 2;

  // 사인 생성
  var sign = textToSVG.getPath(text, options);
  return '\n    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + width + '" height="' + height + '">\n      ' + sign + '\n    </svg>\n  ';
}

/**
 * 날짜 : 2020.01.08
 * 내용 : 사인 생성 main
 */
async function createSign(text, fonts) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var fontSize = options.fontSize,
      attributes = options.attributes,
      _options$boxOption = options.boxOption,
      boxOption = _options$boxOption === undefined ? {} : _options$boxOption;

  var text_size = text.length;

  // text 크기는 최소 1자 ~ 9자 까지.
  if (!text_size || text_size < 0 || text_size > 20) throw new Error('invalid parameter: text(min: 1, max: 20)');
  if (!!fonts && (typeof fonts === 'undefined' ? 'undefined' : _typeof(fonts)) === 'object' && !Array.isArray(fonts)) throw new Error('invalid parameter: font');

  var fontList = [];
  var sign_list = [];

  // 폰트 정보가 있는 경우 해당 도장만 생성.
  switch (typeof fonts === 'undefined' ? 'undefined' : _typeof(fonts)) {
    case 'object':
      fontList = fonts;break;
    case 'string':
      fontList = [fonts];break;
    default:
      fontList = FONT_LIST;break;
  }

  // 등록된 폰트의 갯수만큼 루프
  for (var i = 0; i < fontList.length; i++) {
    // 도장 생성
    var sign = await signGenerator(text, fontList[i], fontSize || FONT_SIZE, attributes, boxOption);
    sign_list.push(sign); // 배열에 저장
  }
  return sign_list;
}

module.exports = createSign;