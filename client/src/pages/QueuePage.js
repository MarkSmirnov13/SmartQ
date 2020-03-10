import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import io from "socket.io-client"

import { addMember } from "../store/actions/queue"
import { useForm, useLocalStorage } from "../hooks"

export const QueuePage = () => {
  const dispatch = useDispatch()
  const socket = io.connect("http://localhost:5000")
  const { id } = useParams()
  const [values, handleChange] = useForm({ name: "" })
  const [uuid, setUuid] = useLocalStorage("smartQ_uuid", null)
  const { members } = useSelector(state => state.queue.queue)
  console.log(members)

  useEffect(() => {
    socket.on("memberAdded", member => {
      console.log(member)
      dispatch(addMember(member))
      setUuid(member.uuid)
    })
  })

  const enterQueueHandler = async event => {
    event.preventDefault()
    try {
      socket.emit("addMember", { queueId: id, name: values.name, uuid })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h1>Очередь {id}</h1>
      <form onSubmit={enterQueueHandler}>
        <input name="name" value={values.name} placeholder="Ваше имя:" onChange={handleChange} />
        <button type="submit">Войти в очередь!</button>
        {members.map(el => (
          <div key={el.uuid}>{el.name}</div>
        ))}
      </form>
    </div>
  )
}
