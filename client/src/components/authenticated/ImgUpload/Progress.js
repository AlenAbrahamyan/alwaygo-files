import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ percentage }) => {
if(percentage === 100){
      window.location.reload()
    }
  return (
      
    <div className='progress-1'>
      <div
        className='progress-2'
        role='progressbar'
        style={{ width: `${percentage}%` }}
      >
        <div className='progress-number'>{percentage}%</div>
        
      </div>
    </div>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progress;
