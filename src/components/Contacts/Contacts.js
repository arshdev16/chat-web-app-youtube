import React from 'react'
import AddContact from './AddContact'
import ReceivedRequests from './ReceivedRequests'
import SentRequests from './SentRequests'

const Contacts = () => {
  return (
    <div>
      <AddContact />
      <SentRequests />
      <ReceivedRequests />
    </div>
  )
}

export default Contacts