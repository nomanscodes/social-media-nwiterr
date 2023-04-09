import serverAuth from "@/libs/serverauth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        res.status(405).end()
    }
    try {
        const { userId } = req.body
        const { currentUser } = await serverAuth(req, res)

        if (!userId || typeof userId !== 'string') {
            throw new Error("Invalide ID")
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new Error("Invalide ID")
        }

        let updatedFollingIds = [...(user.followingIds || [])]

        if (req.method == 'POST') {
            updatedFollingIds.push(userId)

            try {

                await prisma.notification.create({
                    data: {
                        body: "Someone followed you",
                        userId
                    }
                });

                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        hasNotification: true
                    }
                })

            } catch (error) {
                console.log(error)
            }
        }

        if (req.method == 'DELETE') {
            updatedFollingIds = updatedFollingIds.filter(followingId => followingId !== userId)
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollingIds
            }
        })

        return res.status(200).json(updatedUser)

    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}