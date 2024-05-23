import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Box, TextField, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

import { useStore } from '../utils/store'

export default function MessageInput() {
	const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
	const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
	const [prompt, setPrompt] = useState<string>('')
	const { addMessage, setIsTyping } = useStore()

	const handleSend = async () => {
		if (!prompt.trim()) return

		const userMessage = {
			sender: 'User',
			message: prompt
		}
		addMessage(userMessage)
		setPrompt('')

		setIsTyping(true)
		try {
			const result = await model.generateContent(prompt)
			const response = await result.response.text()
			const geminiMessage = {
				sender: 'Gemini',
				message: response
			}
			addMessage(geminiMessage)
		} catch {
			const errorMessage = {
				sender: 'Gemini',
				message: 'Sorry, I was unable to process your request'
			}
			addMessage(errorMessage)
		} finally {
			setIsTyping(false)
		}
	}

	return (
		<Box sx={{ display: 'flex', p: 2, borderTop: '1px solid #ccc' }}>
			<TextField
				fullWidth
				multiline
				variant='outlined'
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault()
						handleSend()
					}
				}}
				placeholder='Type your message here...'
			/>
			<Button variant='contained' color='primary' onClick={handleSend} sx={{ ml: 2 }}>
				<SendIcon />
			</Button>
		</Box>
	)
}
