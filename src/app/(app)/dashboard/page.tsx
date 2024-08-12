"use client"
import React from 'react'
import { getSession,signIn,signOut } from 'next-auth/react'

const Dashboard = () => {
  return (
    <>
    <div>Dashboard</div>
    <button onClick={()=>{signOut()}}>SignOut</button>
    </>
  )
}

export default Dashboard