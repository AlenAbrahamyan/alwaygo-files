import React from 'react';


const Redirect = () => {
    return (
        <div>{
        window.location.replace("/")
        }
        </div>
    );
};

export default Redirect;