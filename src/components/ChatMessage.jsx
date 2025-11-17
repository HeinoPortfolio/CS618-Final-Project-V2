import PropTypes from 'prop-types'

// Chat message component for displayng the chat messages =====================
// Shows the user name and the associated message =====
export function ChatMessage({ username, message }) {
  return (
    <div style={{ padding: '5px' }}>
      {username ? (
        <span>
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
}
