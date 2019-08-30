import React, { Component } from 'react';
import axios from 'axios';
import AddPost from'./AddPost';
import PostBoxMain from './PostBoxMain';

class MainBar extends Component {
    state = {
        posts: null
      }
      componentDidMount(){
        axios.get('api/post/get_all_post')
          .then(res => {
            this.setState({
              posts: res.data
            });
            
          });
          
      }
    render() {
        return (
            <div className="MainBar" >
                <AddPost /> 
                {this.state.posts!=null?(
                    <PostBoxMain posts={this.state.posts} />
                    ):(<div>Posts Uploading...</div>)}
            </div>
        )
    }
}

export default MainBar;