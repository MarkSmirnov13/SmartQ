import express from "express"
import mongoose from "mongoose"
import http from "http"
import socketServer from "socket.io"
import bodyParser from "body-parser"

import queueModel from "./database/models/Queue"
import { createRouter } from "./router"

const app = express()
const server = http.createServer(app)
const io = socketServer(server)

app.use(bodyParser.json())
app.use(createRouter())

const { PORT } = process.env
const { DB_URI } = process.env

async function start() {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    server.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log("Server Error:", e.message)
    process.exit(1)
  }
}

start()

io.on("connection", socket => {
  console.log(`Connected to Socket!! ${socket.id}`)

  socket.on("disconnect", () => {
    console.log(`Disconnected - ${socket.id}`)
  })

  socket.on("loadQueue", uuid => {
    queueModel.find({ uuid }, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        socket.emit("queueLoaded", result)
      }
    })
  })
})
