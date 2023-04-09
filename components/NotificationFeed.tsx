import useCurrentUser from '@/hooks/useCurrentUser'
import useNotification from '@/hooks/useNotification'
import React, { useEffect } from 'react'
import { BsTwitter } from 'react-icons/bs';


const NotificationFeed = () => {

    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()

    const { data: fetchedNotifications = [] } = useNotification(currentUser?.id)

    useEffect(() => {
        mutateCurrentUser()
    }, [mutateCurrentUser])


    if (fetchedNotifications.length == 0) {
        return (
            <div className=' text-neutral-600 text-center p-6 text-xl'>
                No Notification
            </div>
        )
    }

    return (
        <div className=' flex flex-col'>
            {fetchedNotifications.map((notification: Record<string, any>) => (
                <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
                    <BsTwitter size={32} color="white" />
                    <p className='text-white'>{notification.body}</p>
                </div>
            ))}
        </div>
    )
}

export default NotificationFeed