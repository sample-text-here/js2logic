const path = require("path");
module.exports = require("yargs")
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
