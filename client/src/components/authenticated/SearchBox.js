import React, { Component } from 'react';


class SearchBox extends Component {
    state = {
        username:""
    }

    render() {

        const onChange = (e) =>{
            this.setState({ username: e.target.value });
        }

        const SearchSubmit = (e) =>{
            e.preventDefault();
            window.location.replace(`/profile/${this.state.username}`);
        }

        return (
            <form className='search_form' onSubmit={SearchSubmit}>
            <input type="text" onChange={onChange} className="SearchBox" name="firstname" placeholder="Find with Username" />
            </form>

        )
    }
}
 


export default SearchBox;