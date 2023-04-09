import Header from '@/components/Header'
import React from 'react'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import NotificationFeed from '@/components/NotificationFeed'

export async function getServerSideProps(context: NextPageContext) {

    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                parmanent: false
            }
        }
    }
    return {
        props: {
            session
        }
    }
}


const notification = () => {
    return (
        <div>
            <Header label='Notification' showBackArrow />
            <NotificationFeed />
        </div>
    )
}

export default notification