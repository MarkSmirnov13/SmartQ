import queueModel from "./database/models/Queue"
import { generateUuid } from "./database/queries/utils"

export const onConnectionHandler = socket => {
  console.log(`Connected to Socket!! ${socket.id}`)

  socket.on("disconnect", () => {
    console.log(`Disconnected - ${socket.id}`)
  })

  socket.on("loadQueue", uuid => {
    queueModel.findOne({ uuid }, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        socket.emit("queueLoaded", result)
      }
    })
  })

  socket.on("addMember", ({ queueId, name, uuid }) => {
    const memberUuid = uuid || generateUuid()
    const newMember = {
      uuid: memberUuid,
      name
    }
    queueModel.findOneAndUpdate(
      { uuid: queueId },
      { $push: { members: newMember } },
      { new: true, upsert: true },
      error => {
        if (error) {
          console.log(error)
        } else {
          socket.emit("memberAdded", newMember)
        }
      }
    )
  })
}
