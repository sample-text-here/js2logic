#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const args = require("yargs")
  .strict()
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  })
  .option("output", {
    alias: "o",
    description: "Where to output (Otherwise will be printed to console)",
  })
  .option("input", {
    alias: "i",
    description: "Where to output (Otherwise will be printed to console)",
  })
  .demandOption(["input"], "js2masm requires an input file")
  .coerce(["input", "output"], path.resolve)
  .help().argv;

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
      const declarations = node.declarations
      declarations.forEach(i => {
        append(`set ${valid(i.id.name)} ${(typeof i.init === "number" ? i.init : {} || {}).value || 0}`)
      })
      break;
    default:
      break;
  }
}

function valid(text) {
  return text.replace(/\$/g, "_")
}

function append(test) {
  console.log(test)
}
