import { useContext, useState, useEffect, createContext } from "react"
import io, { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"
const socketContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap>>({} as any)

export default function SocketProvider({ user, children }: { user: any, children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>()
  useEffect(() => {
    const newSocket = io("http://localhost:8080/chat", {
      query: { id: user.id }
    })
    setSocket(newSocket)
  }, [user.id])

  return <socketContext.Provider value={socket as Socket}>{children}</socketContext.Provider>
}

export const useSocket = () => {
  return useContext(socketContext)
}
