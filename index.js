const { Parser } = require("acorn");

module.exports = function (code) {
  code = code.replace(/\r\n/g, "\n");
  code = Parser.parse(code, { ecmaVersion: 2020 });
  return code;
}
