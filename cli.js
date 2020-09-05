const path = require("path");
const fs = require("fs");
const args = require("yargs")
  .strict()
  .option("force", {
    alias: "f",
    type: "boolean",
    description: "Overwrite output file if it exists",
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

const input = fs.readFileSync(args.input, "utf-8")
const output = require("./index.js")(input);

if (args.output) {
  if (!fs.existsSync(args.output) || args.force) {
    fs.writeFileSync(args.output, output);
  } else {
    throw new Error("Output file already exists (use --force or -f to force");
  }
} else {
  console.log(output)
}
