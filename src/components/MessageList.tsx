import { Box, Typography, Paper, Avatar, CircularProgress } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import { useEffect, useRef } from 'react'

import { useStore } from '../utils/store'

export default function MessageList() {
  const { messages, isTyping, setMessages } = useStore()
  const chatWindowRef = useRef<HTMLDivElement>(null)

  //Retrive messages from the sessionStorage and display them in the chat window
  useEffect(() => {
    const storedMessages = localStorage.getItem('messages')
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages)
      setMessages(parsedMessages)
    } else if (messages.length === 0) {
      // Add the default message only if messages array is empty
      const defaultMessage = {
        message:
          "Hello, I'm Gemini, your AI assistant, how can I help you today?",
        sender: 'Gemini'
      }
      setMessages(defaultMessage)
    }
  }, [])

  // Store new messages whenever a new message is added
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages))
  }, [messages])

  // Scroll to the bottom of the chat window when a new message is added
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
      ref={chatWindowRef}>
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: msg.sender === 'User' ? 'flex-end' : 'flex-start',
            mb: 2
          }}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              backgroundColor: '#fff',
              maxWidth: '60%',
              wordWrap: 'break-word',
              borderRadius:
                msg.sender === 'User' ? '10px 10px 0 10px' : '10px 10px 10px 0'
            }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'start',
                gap: 1,
                wordWrap: 'break-word',
                wordBreak: 'break-word'
              }}>
              <Avatar
                sx={{
                  bgcolor:
                    msg.sender === 'User' ? 'primary.main' : 'secondary.main'
                }}>
                {msg.sender === 'User' ? 'U' : 'G'}
              </Avatar>
              <Typography variant='body2' color='black'>
                <ReactMarkdown>{msg.message}</ReactMarkdown>
              </Typography>
            </Box>
          </Paper>
        </Box>
      ))}
      {isTyping && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            mb: 2,
            ml: 2
          }}>
          <CircularProgress size={20} />
          <Typography variant='body2' color='textSecondary' ml={1}>
            Typing...
          </Typography>
        </Box>
      )}
    </Box>
  )
}
