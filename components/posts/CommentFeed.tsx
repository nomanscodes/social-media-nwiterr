import React from 'react'
import CommentItem from './CommentItem'

interface CommentFeedProps {
    comments?: Record<string, any>[]
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {


    // console.log("CommentFeed", comment)

    return (

        <>
            {comments.map((singleComment: any) => (
                <CommentItem key={singleComment.id} data={singleComment} />
            ))
            }

        </>
    )
}

export default CommentFeed