import { useEffect, useRef, useState } from 'react'
import { Box, Typography, Paper, Avatar, CircularProgress } from '@mui/material'
import ReactMarkdown from 'react-markdown'

import { useStore } from '../utils/store'

export default function MessageList() {
	const { messages, isTyping, setMessages } = useStore()
	const chatWindowRef = useRef<HTMLDivElement>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadMessages = async () => {
			const storedMessages = localStorage.getItem('messages')
			if (storedMessages) {
				const parsedMessages = JSON.parse(storedMessages)
				setMessages(parsedMessages)
			} else {
				const defaultMessage = {
					message: "Hello, I'm Gemini, your AI assistant. How can I help you today?",
					sender: 'Gemini'
				}
				const defaultMessagesArray = [defaultMessage]
				setMessages(defaultMessagesArray)
				localStorage.setItem('messages', JSON.stringify(defaultMessagesArray))
			}
			setIsLoading(false)
		}

		loadMessages()
	}, [setMessages])

	useEffect(() => {
		localStorage.setItem('messages', JSON.stringify(messages))
	}, [messages])

	useEffect(() => {
		chatWindowRef.current?.scrollTo({
			top: chatWindowRef.current.scrollHeight,
			behavior: 'smooth'
		})
	}, [messages])

	return (
		<Box
			sx={{
				maxHeight: '70vh',
				overflowY: 'auto',
				p: 2,
				scrollbarWidth: 'none'
			}}
			ref={chatWindowRef}
		>
			{isLoading ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%'
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				messages.map((msg, index) => (
					<Box
						key={index}
						sx={{
							display: 'flex',
							justifyContent: msg.sender === 'User' ? 'flex-end' : 'flex-start',
							mb: 2
						}}
					>
						<Paper
							elevation={3}
							sx={{
								p: 2,
								backgroundColor: '#fff',
								maxWidth: '60%',
								wordWrap: 'break-word',
								borderRadius: msg.sender === 'User' ? '10px 10px 0 10px' : '10px 10px 10px 0'
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'start',
									gap: 1,
									wordWrap: 'break-word',
									wordBreak: 'break-word'
								}}
							>
								<Avatar
									sx={{
										bgcolor: msg.sender === 'User' ? 'primary.main' : 'secondary.main'
									}}
								>
									{msg.sender === 'User' ? 'U' : 'G'}
								</Avatar>
								<Typography variant='body2' color='black'>
									<ReactMarkdown>{msg.message}</ReactMarkdown>
								</Typography>
							</Box>
						</Paper>
					</Box>
				))
			)}

			{isTyping && (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-start',
						mb: 2,
						ml: 2
					}}
				>
					<CircularProgress size={20} />
					<Typography variant='body2' color='textSecondary' ml={1}>
						Typing...
					</Typography>
				</Box>
			)}
		</Box>
	)
}
