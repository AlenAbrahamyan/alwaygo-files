import React, { Fragment, useState } from 'react';
// import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    


    try {
      const res = await axios.post('/api/img_profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;


      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage(/*'There was a problem with the server'*/res.data.err);
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };



  return (
    <Fragment>
      {message ? (<div className="error_msg">{message}</div>) : null}

      <form onSubmit={onSubmit}>


        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
        </div>


        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='profile_img_submit'
        />
      </form>

    </Fragment>
  );
};

export default FileUpload;