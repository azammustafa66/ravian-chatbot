import { useEffect, useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator
} from '@chatscope/chat-ui-kit-react'
import { GoogleGenerativeAI } from '@google/generative-ai'

type ChatMessage = {
  sender: string
  message: string
  sentAt?: string
}

const App = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'Gemini',
      message:
        'Hello! I am RavianBot, your chatbot assistant. How can I help you?'
    }
  ])
  const [isTyping, setIsTyping] = useState<boolean>(false)

  // Get the messages from session storage
  useEffect(() => {
    const storedMessages = sessionStorage.getItem('messages')
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }
  }, [])

  // Update session storage when messages change
  useEffect(() => {
    sessionStorage.setItem('messages', JSON.stringify(messages))
  }, [messages])

  const handleSend = async (prompt: string) => {
    const newMessage: ChatMessage = {
      sender: 'User',
      message: prompt
    }
    setMessages((prevMessages) => [...prevMessages, newMessage])
    setIsTyping(true)

    try {
      const result = await model.generateContent(prompt)
      const response = result.response
      const text = response.text()
      const geminiMessage: ChatMessage = {
        sender: 'Gemini',
        message: text
      }
      setMessages((prevMessages) => [...prevMessages, geminiMessage])
    } catch {
      const geminiMessage: ChatMessage = {
        sender: 'Gemini',
        message: 'Sorry, I was unable to process your request'
      }
      setMessages((prevMessages) => [...prevMessages, geminiMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <main className='flex justify-center items-center h-screen bg-gradient-to-r from-purple-300 to-blue-300'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content='Gemini is typing...' />
                ) : null
              }>
              {messages.map((message: ChatMessage, index: number) => (
                <Message
                  key={index}
                  model={{
                    message: message.message,
                    sender: message.sender,
                    direction:
                      message.sender === 'User' ? 'outgoing' : 'incoming',
                    position: 'single'
                  }}
                />
              ))}
            </MessageList>
            <MessageInput
              placeholder='Type your message here...'
              onSend={handleSend}
              className='mt-4'
              style={{
                backgroundColor: '#f0f0f0',
                borderRadius: '20px',
                padding: '12px',
                border: '1px solid #ddd',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
              }}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </main>
  )
}

export default App
