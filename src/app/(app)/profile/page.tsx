"use client"
import React from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'

const Profile = () => {
    const { toast } = useToast()
    const { data: session } = useSession()

    if (session) {
        const { username, email, isVerified } = session.user as User
        return (
            <div className="max-w-md mx-auto mt-10 p-10 bg-gray-100 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center mb-4">User Profile</h2>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="font-semibold">Username:</span>
                        <span>{username}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Email:</span>
                        <span>{email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Verified:</span>
                        <span>{isVerified ? "Yes" : "No"}</span>
                    </div>
                </div>
            </div>
        )
    }

    return <div className="text-center mt-10">No user session found</div>
}

export default Profile
