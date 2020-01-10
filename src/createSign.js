const getFont = require('./getFont');
const {
  BOX_HEIGHT,
  BOX_WIDTH,
  FONT_SIZE,
  BOX_TAG_ST,
  BOX_TAG_END,
  FONT_LIST,
} = require('./type/sign.type');

async function signGenerator(text, font) {
  // get font
  const textToSVG = await getFont(font);
  let options = { x: 0, y: 0, fontSize: FONT_SIZE, anchor: 'top left' };
  // get metrics
  const met_info = textToSVG.getMetrics(text, options);
  const width = Math.round(met_info.width * 1000) / 1000;
  const height = Math.round(met_info.height * 1000) / 1000;
  // 중앙정렬
  options.x = (BOX_WIDTH - width) / 2;
  options.y = (BOX_HEIGHT - height) / 2;

  // 사인 생성
  const sign = textToSVG.getPath(text, options);
  return `
    ${BOX_TAG_ST}
      ${sign}
    ${BOX_TAG_END}
  `;
}

/**
 * 날짜 : 2020.01.08
 * 내용 : 사인 생성 main
 * @param text
 * @param options {object}
 * @param options.font {array}
 */
async function createSign(text, options = {}) {
  const { font } = options;
  const text_size = text.length;

  // text 크기는 최소 1자 ~ 9자 까지.
  if (!text_size || (text_size < 0 || text_size > 20)) throw new Error('invalid parameter: text(min: 1, max: 20)');
  if (!!font && typeof font === 'object' && !Array.isArray(font)) throw new Error('invalid parameter: font');

  let fonts = [];
  const sign_list = [];

  // 폰트 정보가 있는 경우 해당 도장만 생성.
  switch (typeof font) {
    case 'object': fonts = font; break;
    case 'string': fonts = [font]; break;
    default: fonts = FONT_LIST; break;
  }

  // 등록된 폰트의 갯수만큼 루프
  for (let j = 0; j < fonts.length; j++) {
    // 도장 생성
    const sign = await signGenerator(text, fonts[j]);
    sign_list.push(sign); // 배열에 저장
  }
  return sign_list;
}

module.exports = createSign;