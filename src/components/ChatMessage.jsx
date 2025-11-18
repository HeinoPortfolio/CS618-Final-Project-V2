import PropTypes from 'prop-types'

// Chat message component for displayng the chat messages =====================
// Shows the user name and the associated message =====
export function ChatMessage({ room, username, message, replayed }) {
  return (
    <div style={{ padding: '5px', opacity: replayed ? 0.5 : 1.0 }}>
      {username ? (
        <span>
          <code>[{room}]</code>
          <b>{username}</b>: {message}
        </span>
      ) : (
        <i>{message}</i>
      )}
    </div>
  )
}

ChatMessage.propTypes = {
  username: PropTypes.string,
  message: PropTypes.string.isRequired,
  replayed: PropTypes.bool,
  room: PropTypes.string,
}
