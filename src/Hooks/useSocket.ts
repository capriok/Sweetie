import React, { useEffect, useRef } from 'react'
import io from 'socket.io-client'

const useSocket = () => {
	const socketRef: React.MutableRefObject<Socket> = useRef(
		io(process.env.REACT_APP_SERVER!, {
			path: '/socket.io',
			transports: ['websocket']
		})
	)
	const socket: Socket = socketRef.current

	useEffect(() => {
		socket.on('connect', () => {
			console.log({ SocketConnection: socket.connected })
			socket.emit('connected', {})
		})
	}, [])

	return { socket }
}

export default useSocket