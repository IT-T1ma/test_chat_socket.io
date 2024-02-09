import './App.css';
import io from "socket.io-client"
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:3001")

function App() {

	const [room, SetRoom] = useState()
	const [message, setMessage] = useState('')
	const [recieveMessage, setRecieveMessage] = useState('')

	const joinRoom = () => {
		if (room !== '') {
			socket.emit('join_room', room)
		}
	}

	const sendMessage = () => {
		socket.emit("send_message", { message, room})
	}

	useEffect(() => {
		socket.on('recieve_message', (data) => {
			setRecieveMessage(data.message)
		})
	}, [socket])

	return (
		<div className="App">
			<input
				placeholder="Room Number..."
				onChange={(e) => {
					SetRoom(e.target.value)
				}}
			/>
			<button onClick={joinRoom}> Join Room</button>

			<input placeholder='Message...' onChange={(e) => {
				setMessage(e.target.value)
			}} />
			<button onClick={sendMessage}>Send</button>
			<h3>Message: {recieveMessage}</h3>
		</div>
	);
}

export default App;
