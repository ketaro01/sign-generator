'use strict';

var TextToSVG = require('text-to-svg');

var fonts = {};
async function getFont(name) {
  var fontName = name,
      fontPath = 'fonts/' + name + '.ttf';
  var isPath = fontName.indexOf('/') > -1;
  if (isPath) {
    var nameArr = fontName.split('/');
    fontName = nameArr[nameArr.length - 1].split('.')[0];
    fontPath = name;
  }
  if (!fonts[fontName]) {
    fonts[fontName] = await TextToSVG.loadSync(fontPath);
  }
  return fonts[fontName];
}

module.exports = getFont;