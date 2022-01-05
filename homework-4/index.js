const socket = require("socket.io")
const http = require("http")
const path = require("path")
const fs = require("fs")
require("dotenv").config()
const httpProxy = require("http-proxy")

const users = [
  { name: "Valery", password: "123" },
  { name: "Dima", password: "1111" },
  { name: "Coach", password: "12345" },
]

let usersOnline = []

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, "index.html")
  const readStream = fs.createReadStream(indexPath)
  readStream.pipe(res)
})

server.listen(process.env.TARGET_PORT)

const io = socket(server, { cors: { origin: "*" } })

io.on("connection", (client) => {
  client.on("new-client", (data) => {
    if (
      users.find(
        (user) => user.name === data.name && user.password === data.password
      )
    ) {
      if (usersOnline.find((user) => user === data.name)) {
        client.emit("auth-bad", "online")
        return
      }
      client.name = data.name
      usersOnline.push(client.name)
      client.broadcast.emit("update-online-clients", usersOnline)
      client.emit("update-online-clients", usersOnline)
      client.broadcast.emit("attention-new-client", client.name)
      client.emit("auth-good", client.name)
    } else {
      client.emit("auth-bad", "uncorrect")
    }
  })
  client.on("client-msg", (data) => {
    const payload = {
      name: client.name,
      message: data.message,
    }
    client.broadcast.emit("server-msg", payload)
    client.emit("server-msg", payload)
  })
  client.on("disconnect", () => {
    usersOnline = usersOnline.filter((user) => user !== client.name)
    client.broadcast.emit("update-online-clients", usersOnline)
    client.emit("update-online-clients", usersOnline)
    client.broadcast.emit("someone-leave", client.name)
  })
})

//to share app by IP on devices
httpProxy
  .createProxyServer({ target: `http://localhost:${process.env.TARGET_PORT}` })
  .listen(process.env.PROXY_PORT)
