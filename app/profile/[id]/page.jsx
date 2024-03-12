'use client'    
import React from 'react'

import ProfilePage from '../page.jsx'

const ProfileById = ({ params }) => {

  return (
      <div>
          <ProfilePage params={params} />
      </div>
  )
}

export default ProfileById