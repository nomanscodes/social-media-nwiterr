import useCurrentUser from '@/hooks/useCurrentUser';
import useLike from '@/hooks/uselike';
import useLoginModal from '@/hooks/useLoginModal';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from 'react-icons/ai';
import Avatar from '../Avatar';



interface PostItemProps {
    data: Record<string, any>
    userId?: string
}

const PostItem: React.FC<PostItemProps> = ({ userId, data }) => {

    // console.log("dataPost", data);

    const router = useRouter()
    const LoginModal = useLoginModal()

    const { data: currentUser } = useCurrentUser()

    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId })

    const goToUser = useCallback((event: any) => {
        event.stopPropagation()
        router.push(`/users/${data.user.id}`)
    }, [router, data.user.id])


    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`)
    }, [router, data.id])


    const onLike = useCallback((event: any) => {
        event.stopPropagation()
        if (!currentUser) {
            return LoginModal.onOpen()
        }

        toggleLike()
    }, [LoginModal, currentUser, toggleLike])


    const createAt = useMemo(() => {
        if (!data?.createAt) {
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createAt))
    }, [data.createAt])


    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart


    return (
        <div onClick={goToPost} className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition'>
            <div className='flex flex-row items-center gap-3 '>
                <div className='w-12'>
                    <Avatar userId={data.user.id} />
                </div>
                <div >
                    <div className='flex flex-row items-center gap-2'>
                        <p onClick={goToUser} className='text-white font-semibold cursor-pointer hover:underline'>{data.user.name}</p>
                        <span className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@{data.user.username}</span>
                        <span className='text-neutral-500 text-sm'>{createAt}</span>
                    </div>
                    <div className=' text-white mt-1'>{data.body}</div>
                    <div className=' flex flex-row items-center mt-3 gap-5'>
                        <div className=' flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
                            <AiOutlineMessage size={20} />
                            <p>{data.comments?.length || 0}</p>
                        </div>
                        <div onClick={onLike} className=' flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500'>
                            <LikeIcon size={20} color={hasLiked ? 'red' : ''} />
                            <p>{data.likedIds?.length || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem;