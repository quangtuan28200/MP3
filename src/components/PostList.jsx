import React from 'react'
import PropTypes from 'prop-types'
import "../scss/postlist.scss"

function PostList(props) {
    const { posts } = props

    return (
        <>
            <h3>POST LIST</h3>
            <ul className="post-list">
                {posts.map(post => (
                    <li key={post.id} className="post-item">{post.title}</li>
                ))}
            </ul>
        </>
    )
}

PostList.propTypes = {
    posts: PropTypes.array,
}

PostList.defaultProps = {
    posts: [],
}

export default PostList

