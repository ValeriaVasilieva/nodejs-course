const colors = require("colors/safe")

const args = process.argv.slice(2)

if (isNaN(parseInt(args[0])) || isNaN(parseInt(args[1]))) {
  console.log(
    colors.magenta("Одно или несколько аргументов не являются числами")
  )
  return
}

const simpleNum = []

for (let i = +args[0]; i <= +args[1]; i++) {
  let flag = 1
  if (i > 2 && i % 2 != 0) {
    for (let j = 3; j * j <= i; j = j + 2) {
      if (i % j == 0) {
        flag = 0
        break
      }
    }
  } else if (i != 2) flag = 0
  if (flag == 1) {
    simpleNum.push(i)
  }
}

if (simpleNum.length) {
  let count = 1
  simpleNum.forEach((num) => {
    if (count == 1) {
      console.log(colors.green(num))
      ++count
    } else if (count == 2) {
      console.log(colors.yellow(num))
      ++count
    } else {
      console.log(colors.red(num))
      count = 1
    }
  })
} else {
  console.log(colors.magenta("В диапозоне нет простых чисел"))
}
