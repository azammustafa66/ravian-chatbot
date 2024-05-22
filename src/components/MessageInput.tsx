import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Box, TextField, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

import { useStore } from '../utils/store'

export default function MessageInput() {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  const [prompt, setPrompt] = useState<string>('')
  const { setMessages, setIsTyping } = useStore()

  const handleSend = async () => {
    if (!prompt) return
    if (prompt.trim()) {
      const userMessage = {
        sender: 'User',
        message: prompt
      }
      setMessages(userMessage)
      setPrompt('')
    }

    setIsTyping(true)
    try {
      const result = await model.generateContent(prompt)
      const response = result.response
      const text = response.text()
      const geminiMessage = {
        sender: 'Gemini',
        message: text
      }
      setMessages(geminiMessage)
    } catch {
      const geminiMessage = {
        sender: 'Gemini',
        message: 'Sorry, I was unable to process your request'
      }
      setMessages(geminiMessage)
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
          if (e.key === 'Enter') handleSend()
        }}
        placeholder='Type your message here...'
      />
      <Button
        variant='contained'
        color='primary'
        onClick={handleSend}
        sx={{ ml: 2 }}>
        <SendIcon />
      </Button>
    </Box>
  )
}
