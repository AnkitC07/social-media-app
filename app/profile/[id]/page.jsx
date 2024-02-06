'use client'    
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import ProfilePage from '../page.jsx'
import EditProfileModal from '../../_components/layout/EditProfileModal'

const ProfileById = ({ params }) => {
    // useEffect(() => {
    //     (async() => {
    //         try {
    //             await axios.get(`/api/users/profile?id=${params?.id}`)
    //                 .then(res => console.log(res.data));
    //         } catch (error) {
    //             console.log(error);
    //             toast.error("User not found");
    //         } 
    //     })()
    // })
  return (
      <div>
          <ProfilePage params={params} />
      </div>
  )
}

export default ProfileById