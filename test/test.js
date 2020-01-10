const assert = require('assert');
const { createStamp, createSign } = require('../src/index');

describe("sign generator full test", () => {
  it("stamp test", async () => {
    console.log('타원형, 원형, 사각형 생성');
    assert.equal((await createStamp('윤대훈', { font: ['fonts/NotoSansKr-Thin.woff'] })).length, 3);
    console.log('원형, 사각형 생성');
    assert.equal((await createStamp('윤대훈임', { font: ['fonts/NotoSansKr-Thin.woff'] })).length, 2);
    console.log('사각형 생성');
    assert.equal((await createStamp('윤대훈임돠', { font: ['fonts/NotoSansKr-Thin.woff'] })).length, 1);
  });
  it("sign test", async () => {
    console.log('한글 서명 생성');
    assert.equal((await createSign('윤대훈', { font: ['fonts/NotoSansKr-Thin.woff'] })).length, 1);
    console.log('영문 서명 생성');
    assert.equal((await createSign('david.yoon', { font: ['fonts/NotoSansKr-Thin.woff'] })).length, 1);
  });
});