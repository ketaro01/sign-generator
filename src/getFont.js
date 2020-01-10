const TextToSVG = require('text-to-svg');

const fonts = {};
async function getFont(name) {
  let fontName = name,
    fontPath = `fonts/${name}.ttf`;
  const isPath = fontName.indexOf('/') > -1;
  if (isPath) {
    const nameArr = fontName.split('/');
    fontName = nameArr[nameArr.length - 1].split('.')[0];
    fontPath = name;
  }
  if (!fonts[fontName]) {
    fonts[fontName] = await TextToSVG.loadSync(fontPath);
  }
  return fonts[fontName];
}

module.exports = getFont;