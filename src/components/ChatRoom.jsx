import { useChat } from '../hooks/useChat.js'
import { EnterMessage } from './EnterMessage.jsx'
import { ChatMessage } from './ChatMessage.jsx'

export function ChatRoom() {
  const { messages, sendMessage } = useChat()

  return (
    <div>
      <div
        style={{
          maxHeight: '100px',
          maxWidth: '300px',
          overflowY: 'scroll',
          overflowX: 'scroll',
          border: '3px solid #ccc',
          padding: '20px',
        }}
      >
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
      </div>
      <EnterMessage onSend={sendMessage} />
    </div>
  )
}
