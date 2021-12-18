const COMMON_PATH = "./homework-3/access.log"
const IP_1 = "89.123.1.41"
const IP_2 = "34.48.240.111"
const getWritePath = (IP) => {
  return `./homework-3/${IP}_requests.log`
}

module.exports = {
  COMMON_PATH,
  IP_1,
  IP_2,
  getWritePath,
}
