#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const args = require("./cli.js")

const { Parser } = require("acorn");

const toclean = fs.readFileSync(args.input, "utf-8");
const toparse = toclean.replace(/\r\n/g, "\n");
const parsed = Parser.parse(toparse, { ecmaVersion: 2020 });

fs.writeFileSync("a.json", JSON.stringify(parsed));
loop(parsed.body)

function loop(body) {
  // console.log(body)
  body.forEach((i) => {
    // console.log(i.type);
    parse(i)
    if (i.body) {
      loop(i.body.body)
    }
  });
}

function parse(node) {
  switch (node.type) {
    case "VariableDeclaration":
      node.declarations.forEach(i => { makeVariable(i) });
      break;
    default:
      break;
  }
}

function makeVariable(v) {
  console.log(v)
  // append(`set ${valid(i.id.name)} ${(typeof i.init === "number" ? i.init : {} || {}).value || 0}`)
}

function append(test) {
  console.log(test)
}
