import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from '../Avatar';


interface CommentItemprops {
    data: Record<string, any>

}

const CommentItem: React.FC<CommentItemprops> = ({ data }) => {

    // console.log("CommentItem", data)

    const router = useRouter()


    const goToUser = useCallback((event: any) => {
        event.stopPropagation()

        router.push(`/users/${data.user.id}`)

    }, [router, data.user.id])


    const createdAt = useMemo(() => {
        if (!data?.createAt) {
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createAt))
    }, [data?.createAt])


    return (
        <div
            className='border-b-[1px] border-neutral-500 p-5 cursor-pointer hover:bg-neutral-900 transition'
        >
            <div className='flex flex-row items-start gap-3'>
                <Avatar userId={data.userId} />  <div>
                    <div className='flex flex-row items-center gap-2'>
                        <p onClick={goToUser} className=' text-white font-semibold cursor-pointer hover:underline'>{data.user.name}</p>
                        <span className=' text-neutral-500 cursor-pointer hover:underline hidden md:block'>@{data.user.username}</span>
                        <span className=' text-neutral-500'>{createdAt}</span>
                    </div>
                    <div className='text-white mt-1'>
                        {data.body}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CommentItem