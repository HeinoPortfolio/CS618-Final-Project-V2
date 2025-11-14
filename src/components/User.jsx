import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { getUserInfo } from '../api/users.js'

// Get user information component =============================================
/*
    Notes:
    -- Will use getUserInfo() API to get the information as the query 
    function
    -- Will return the user ID with strong emphasis
    -- If not ID is found it will return just the ID passed to it
    
*/
export function User({ id }) {
  const userInfoQuery = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserInfo(id),
  })
  const userInfo = userInfoQuery.data ?? {}
  return <strong>{userInfo?.username ?? id}</strong>
}

User.propTypes = {
  id: PropTypes.string.isRequired,
}
