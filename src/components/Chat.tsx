import { Box } from '@mui/material'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

export default function Chat() {
  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        scrollbarWidth: 'none'
      }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <MessageList />
      </Box>
      <Box>
        <MessageInput />
      </Box>
    </Box>
  )
}
