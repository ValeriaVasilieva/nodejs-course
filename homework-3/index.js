const fs = require("fs")
const readline = require("readline")
const { COMMON_PATH, IP_1, IP_2, getWritePath } = require("./constants")

let firstLine = true

const readStream = fs.createReadStream(COMMON_PATH, {
  encoding: "utf-8",
  highWaterMark: 250,
})

const writeStreamIP1 = fs.createWriteStream(getWritePath(IP_1), {
  encoding: "utf-8",
  flags: "a",
})

const writeStreamIP2 = fs.createWriteStream(getWritePath(IP_2), {
  encoding: "utf-8",
  flags: "a",
})

rl = readline.createInterface({
  input: readStream,
})

rl.on("line", (line) => {
  if (line.includes(IP_1)) writeStreamIP1.write(line + "\n")
  if (line.includes(IP_2)) writeStreamIP2.write(line + "\n")
  if (firstLine) {
    console.log("Loading...")
    firstLine = false
  }
}).on("close", () => {
  console.log("Finish")
  process.exit(0)
})
