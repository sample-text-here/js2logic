const { Parser } = require("acorn");
const translate = require("./translate.js");

function parse(code) {
  code = code.replace(/\r\n/g, "\n");
  code = Parser.parse(code, { ecmaVersion: 2020 });
  return code;
}

function loop(array) {
  let ret = "";
  for (var i of array) {
    let block = tprep(i);
    ret += block.code;
    if (i.body) loop(i.body.body);
    if (!block.done) ret += tprep(i, block).code;
  }
  return ret;
}

function tprep(code, block) {
  block = block || { code: "", done: false };
  return translate(code, block);
}

module.exports = function (code) {
  code = parse(code);
  code = loop(code.body);
  return code;
};
