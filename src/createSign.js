const getFont = require('./getFont');
const {
  BOX_HEIGHT,
  BOX_WIDTH,
  ATTRIBUTES,
  FONT_SIZE,
  FONT_LIST,
} = require('./type/sign.type');

async function signGenerator(
  text,
  font,
  fontSize,
  attributes = ATTRIBUTES,
  boxOption,
) {
  const { width = BOX_WIDTH, height = BOX_HEIGHT } = boxOption;

  // get font
  const textToSVG = await getFont(font);
  let options = { x: 0, y: 0, fontSize, anchor: 'top left', attributes };
  // get metrics
  const met_info = textToSVG.getMetrics(text, options);
  const textWidth = Math.round(met_info.width * 1000) / 1000;
  const textHeight = Math.round(met_info.height * 1000) / 1000;
  // 중앙정렬
  options.x = (width - textWidth) / 2;
  options.y = (height - textHeight) / 2;

  // 사인 생성
  const sign = textToSVG.getPath(text, options);
  return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}">
      ${sign}
    </svg>
  `;
}

/**
 * 날짜 : 2020.01.08
 * 내용 : 사인 생성 main
 */
async function createSign(text, fonts, options = {}) {
  const { fontSize, attributes, boxOption = {} } = options;
  const text_size = text.length;

  // text 크기는 최소 1자 ~ 9자 까지.
  if (!text_size || (text_size < 0 || text_size > 20)) throw new Error('invalid parameter: text(min: 1, max: 20)');
  if (!!fonts && typeof fonts === 'object' && !Array.isArray(fonts)) throw new Error('invalid parameter: font');

  let fontList = [];
  const sign_list = [];

  // 폰트 정보가 있는 경우 해당 도장만 생성.
  switch (typeof fonts) {
    case 'object': fontList = fonts; break;
    case 'string': fontList = [fonts]; break;
    default: fontList = FONT_LIST; break;
  }

  // 등록된 폰트의 갯수만큼 루프
  for (let i = 0; i < fontList.length; i++) {
    // 도장 생성
    const sign = await signGenerator(text, fontList[i], fontSize || FONT_SIZE, attributes, boxOption);
    sign_list.push(sign); // 배열에 저장
  }
  return sign_list;
}

module.exports = createSign;