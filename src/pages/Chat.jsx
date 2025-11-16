import { Header } from '../components/Header.jsx'
import { Status } from '../components/Status.jsx'

import { Link } from 'react-router-dom'

export function Chat() {
  return (
    <div style={{ padding: 8 }}>
      <Header />
      <Link to='/'> Back To Main Page </Link>
      <br />
      <hr />
      <br />
      <Status />
    </div>
  )
}
