import From from '@/components/From'
import Header from '@/components/Header'
import CommentFeed from '@/components/posts/CommentFeed'
import PostItem from '@/components/posts/PostItem'
import usePost from '@/hooks/usePostDetails'
import { useRouter } from 'next/router'
import React from 'react'
import { ClipLoader } from 'react-spinners'

const PostDetails = () => {

    const router = useRouter()
    const { postId } = router.query

    const { data: fetchedPost, isLoading } = usePost(postId as string)

    // console.log("dataDETA", fetchedPost?.comments)


    if (isLoading || !fetchedPost) {
        return (
            <div className=' flex justify-center items-center h-full'>
                <ClipLoader color='lightblue' size={80} />
            </div>
        )
    }

    return (
        <div>
            <Header label='Tweet' showBackArrow />
            <PostItem data={fetchedPost} />
            <From
                postId={postId as string}
                isComment
                placeholder='Tweet your reply'
            />
            <CommentFeed comments={fetchedPost?.comments} />
        </div>
    )
}

export default PostDetails