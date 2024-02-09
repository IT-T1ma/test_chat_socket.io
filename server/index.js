import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"

const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log(`user Connected: ${socket.id}`)

    socket.on('join_room', (data) => {
        socket.join(data)
        console.log(data)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data)
    })
})

server.listen(3001, () => {
    console.log('server start')
})