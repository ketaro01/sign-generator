const getFont = require('./getFont');
const {
  BOX_WIDTH,
  BOX_HEIGHT,
  STROKE,
  STROKE_WIDTH,
  ATTRIBUTES,
  CHAR_SIZE,
  SIGN_TYPE,
  FONT_LIST,
  TEXT_SIZE,
} = require('./type/stamp.type');

/**
 * 날짜 : 2020.01.07
 * 내용 : border 생성 함수
 */
function createBorder(size, fontSize, type, option, boxOption) {
  const { width, height, stroke = STROKE, strokeWidth = STROKE_WIDTH } = option;
  const { width: boxWidth, height: boxHeight } = boxOption;
  let border = '';
  if (type === SIGN_TYPE.CIRCLE && (width === height)) {
    // 원형
    border = `<circle fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" cx="${boxWidth / 2}" cy="${boxHeight / 2}" r="${width / 2}"></circle>`;
  } else if (type === SIGN_TYPE.CIRCLE) {
    // 타원형
    border = `<ellipse fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" cx="${boxWidth / 2}" cy="${boxHeight / 2}" rx="${fontSize}" ry="${height / 2.5}"></ellipse>`;
  } else if (type === SIGN_TYPE.RECT) {
    const x = (boxWidth - width) / 2;
    const y = (boxHeight - height) / 2;
    // 사각형
    border = `<rect fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" x="${x}" y="${y}" width="${width}" height="${height}"></rect>`;
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
async function stampGenerator(
  text,
  font,
  fontSize,
  type,
  col,
  row,
  attributes = ATTRIBUTES,
  boxOption,
  borderOption = {},
) {
  const { width = BOX_WIDTH, height = BOX_HEIGHT } = boxOption;

  // get font
  const textToSVG = await getFont(font);
  const rowHeight = row * fontSize;

  const middle = height - rowHeight;
  const items = [];
  let top = null, // top 좌표값
    left = null, // left 좌표값
    text_index = 0, // text index
    left_index = 0; // row index
  for (let i = 0; i < row; i++) {
    if (top === null) top = Math.round(middle / 2); // 중앙 위치값
    else top = top + fontSize; // 루프마다 문자열 크기만큼 위치를 지정

    left = null; // 매 루프 시작 시 left 값을 initialize
    for (let j = 0; j < col; j++) {
      if (!left) left = (width - (fontSize * col)) / 2; // 초기값 지정
      else left = left + fontSize; // 루프마다 문자열 크기만큼 위치를 지정
      const t_value = text.charAt(text_index);
      // 문자열 위치 지정
      const options = { x: left, y: top, fontSize, anchor: 'top left', attributes };
      items.push(textToSVG.getPath(t_value, options));
      text_index++;
    }
    left_index++;
  }
  borderOption.width = Math.round(fontSize * col * 1.4);
  borderOption.height = Math.round(fontSize * row * 1.4);

  const border = createBorder(text.length, fontSize, type, borderOption, { width, height });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}">
      ${border}
      ${items.join('\n')}
    </svg>
  `;
}

async function createStamp(text, fonts, options = {}) {
  const { attributes, boxOption = {}, borderOption = {}, fontSize } = options;
  const text_size = text.length;

  // text 크기는 최소 1자 ~ 9자 까지.
  if (!text_size || (text_size < 0 || text_size > 9)) throw new Error('invalid parameter: text(min: 1, max: 9)');
  if (!fonts || (!!fonts && typeof fonts === 'object' && !Array.isArray(fonts))) throw new Error('invalid parameter: font');

  // text 크기에 해당하는 생성 리스트를 가져옴
  const createFunc = TEXT_SIZE[text_size];
  const data = createFunc(text); // 생성 리스트

  const stamp_list = [];
  for (let i = 0; i < data.length; i++) {
    const { type, col, row, word } = data[i]; // 생성해야할 text info
    let fontList = [];

    // 폰트 정보가 있는 경우 해당 도장만 생성.
    switch (typeof fonts) {
      case 'object': fontList = fonts; break;
      case 'string': fontList = [fonts]; break;
      default: fontList = FONT_LIST; break;
    }

    // 등록된 폰트의 갯수만큼 루프
    for (let j = 0; j < fontList.length; j++) {
      // 도장 생성
      const stamp = await stampGenerator(word, fontList[j], fontSize || CHAR_SIZE, type, col, row, attributes, boxOption, borderOption);
      stamp_list.push(stamp); // 배열에 저장
    }
  }
  return stamp_list;
}

module.exports = createStamp;