import  prisma  from '@/libs/prismadb';
import { NextApiRequest,NextApiResponse } from 'next';


export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
if ( req.method != 'GET') {
    return res.status(405).end()
}
try {
    const users = await prisma.user.findMany({
        orderBy:{
            createAt:'desc'
        }
    })
    return res.status(200).json(users)
} catch (error) {
    console.log(error)
    return res.status(400).end()
}
}