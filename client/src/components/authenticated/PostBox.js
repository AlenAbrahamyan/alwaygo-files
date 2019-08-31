import React from 'react';


const PostBox = ({ posts, profile_img }) => {
    return (
        <div>
           
            {posts.map(post => {
                return (
                    <div>
                        <br />
                        <div className='PostBox'>
                            
                                <div className='PostBox1'>
                                <div className='for_size'>
                                    <img src={profile_img}  className='PostBox2' />
                                    <div className='PostBox3'>
                                        <a href={`/profile/${post.username}`} className='post_name'>{post.name} {post.last_name}</a>
                                        <p className="gray">@{post.username}</p>
                                    </div>
                                </div>
                                <p>{post.text}</p>
                            </div>
                            <img className="lazyload" data-src={post.post_img} width='577px' />


                        </div>
                        <br />
                    </div>

                )
            })}
        </div>
    );
};

export default PostBox;