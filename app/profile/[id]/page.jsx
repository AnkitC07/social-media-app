'use client'    
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import EditProfileModal from '../../_components/layout/EditProfileModal'

const ProfileById = ({ params }) => {
    useEffect(() => {
        (async() => {
            try {
                await axios.get(`/api/users/profile?id=${params?.id}`)
                    .then(res => console.log(res.data));
            } catch (error) {
                console.log(error);
                toast.error("User not found");
            } 
        })()
    })
  return (
      <div>
          {params.id} profile
          <EditProfileModal/>
      </div>
  )
}

export default ProfileById