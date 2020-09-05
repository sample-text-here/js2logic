module.exports = function (...input) {
  return translate(...input);
};

function translate(code, oblock) {
  //   console.log(code.type);
  var block;
  switch (code.type) {
    case "VariableDeclaration":
      block = VariableDeclaration(code, oblock);
      break;
    // case "IfStatement":
    //   break;
    // case "ForStatement":
    //   break;
    // case "FunctionDeclaration":
    //   break;
    case "Literal":
      block = oblock;
      block.code = code.value;
      block.done = true;
      break;
    default:
      block = { code: "", done: true, line: -1 };
      break;
  }
  return block;
}

function VariableDeclaration(code, block) {
  let ret = "";
  code.declarations.forEach((i) => {
    ret += `set ${i.id.name} ${i.init ? translate(i.init, block).code : 0}\n`;
  });
  return { code: ret, done: true, line: block.line };
}
