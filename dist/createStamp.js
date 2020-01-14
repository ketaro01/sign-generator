'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getFont = require('./getFont');

var _require = require('./type/stamp.type'),
    BOX_WIDTH = _require.BOX_WIDTH,
    BOX_HEIGHT = _require.BOX_HEIGHT,
    STROKE = _require.STROKE,
    STROKE_WIDTH = _require.STROKE_WIDTH,
    ATTRIBUTES = _require.ATTRIBUTES,
    CHAR_SIZE = _require.CHAR_SIZE,
    SIGN_TYPE = _require.SIGN_TYPE,
    FONT_LIST = _require.FONT_LIST,
    TEXT_SIZE = _require.TEXT_SIZE;

/**
 * 날짜 : 2020.01.07
 * 내용 : border 생성 함수
 */


function createBorder(size, fontSize, type, option, boxOption) {
  var width = option.width,
      height = option.height,
      _option$stroke = option.stroke,
      stroke = _option$stroke === undefined ? STROKE : _option$stroke,
      _option$strokeWidth = option.strokeWidth,
      strokeWidth = _option$strokeWidth === undefined ? STROKE_WIDTH : _option$strokeWidth;
  var boxWidth = boxOption.width,
      boxHeight = boxOption.height;

  var border = '';
  if (type === SIGN_TYPE.CIRCLE && width === height) {
    // 원형
    border = '<circle fill="none" stroke="' + stroke + '" stroke-width="' + strokeWidth + '" cx="' + boxWidth / 2 + '" cy="' + boxHeight / 2 + '" r="' + width / 2 + '"></circle>';
  } else if (type === SIGN_TYPE.CIRCLE) {
    // 타원형
    border = '<ellipse fill="none" stroke="' + stroke + '" stroke-width="' + strokeWidth + '" cx="' + boxWidth / 2 + '" cy="' + boxHeight / 2 + '" rx="' + fontSize + '" ry="' + height / 2.5 + '"></ellipse>';
  } else if (type === SIGN_TYPE.RECT) {
    var x = (boxWidth - width) / 2;
    var y = (boxHeight - height) / 2;
    // 사각형
    border = '<rect fill="none" stroke="' + stroke + '" stroke-width="' + strokeWidth + '" x="' + x + '" y="' + y + '" width="' + width + '" height="' + height + '"></rect>';
  } else {
    // error
    throw new Error('invalid parameters');
  }
  return border;
}

/**
 * 날짜 : 2020.01.07
 * 내용 : 도장 생성 함수
 */
async function stampGenerator(text, font, fontSize, type, col, row) {
  var attributes = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : ATTRIBUTES;
  var boxOption = arguments[7];
  var borderOption = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : {};
  var _boxOption$width = boxOption.width,
      width = _boxOption$width === undefined ? BOX_WIDTH : _boxOption$width,
      _boxOption$height = boxOption.height,
      height = _boxOption$height === undefined ? BOX_HEIGHT : _boxOption$height;

  // get font

  var textToSVG = await getFont(font);
  var rowHeight = row * fontSize;

  var middle = height - rowHeight;
  var items = [];
  var top = null,
      // top 좌표값
  left = null,
      // left 좌표값
  text_index = 0,
      // text index
  left_index = 0; // row index
  for (var i = 0; i < row; i++) {
    if (top === null) top = Math.round(middle / 2); // 중앙 위치값
    else top = top + fontSize; // 루프마다 문자열 크기만큼 위치를 지정

    left = null; // 매 루프 시작 시 left 값을 initialize
    for (var j = 0; j < col; j++) {
      if (!left) left = (width - fontSize * col) / 2; // 초기값 지정
      else left = left + fontSize; // 루프마다 문자열 크기만큼 위치를 지정
      var t_value = text.charAt(text_index);
      // 문자열 위치 지정
      var options = { x: left, y: top, fontSize: fontSize, anchor: 'top left', attributes: attributes };
      items.push(textToSVG.getPath(t_value, options));
      text_index++;
    }
    left_index++;
  }
  borderOption.width = Math.round(fontSize * col * 1.4);
  borderOption.height = Math.round(fontSize * row * 1.4);

  var border = createBorder(text.length, fontSize, type, borderOption, { width: width, height: height });

  return '\n    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + width + '" height="' + height + '">\n      ' + border + '\n      ' + items.join('\n') + '\n    </svg>\n  ';
}

async function createStamp(text, fonts) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var attributes = options.attributes,
      _options$boxOption = options.boxOption,
      boxOption = _options$boxOption === undefined ? {} : _options$boxOption,
      _options$borderOption = options.borderOption,
      borderOption = _options$borderOption === undefined ? {} : _options$borderOption,
      fontSize = options.fontSize;

  var text_size = text.length;

  // text 크기는 최소 1자 ~ 9자 까지.
  if (!text_size || text_size < 0 || text_size > 9) throw new Error('invalid parameter: text(min: 1, max: 9)');
  if (!fonts || !!fonts && (typeof fonts === 'undefined' ? 'undefined' : _typeof(fonts)) === 'object' && !Array.isArray(fonts)) throw new Error('invalid parameter: font');

  // text 크기에 해당하는 생성 리스트를 가져옴
  var createFunc = TEXT_SIZE[text_size];
  var data = createFunc(text); // 생성 리스트

  var stamp_list = [];
  for (var i = 0; i < data.length; i++) {
    var _data$i = data[i],
        type = _data$i.type,
        col = _data$i.col,
        row = _data$i.row,
        word = _data$i.word; // 생성해야할 text info

    var fontList = [];

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
    for (var j = 0; j < fontList.length; j++) {
      // 도장 생성
      var stamp = await stampGenerator(word, fontList[j], fontSize || CHAR_SIZE, type, col, row, attributes, boxOption, borderOption);
      stamp_list.push(stamp); // 배열에 저장
    }
  }
  return stamp_list;
}

module.exports = createStamp;