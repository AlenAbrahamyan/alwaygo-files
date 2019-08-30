import React from "react";
import { storage } from '../../config/firebaseConfig' ;
 
class Demo extends React.Component {

    handleImgUpload = (e) => {
        if (e.target.files[0]){
            const image = (e.target.files[0]);
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
            (snapshot) => {
                console.log(snapshot);
                snapshot.ref.getDownloadURL().then((downloadUrl) => {
                    console.log(downloadUrl);
                })
            }, 
           
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL(
                    url => {
                        console.log(url)
                    }
                )
            }
            )
        }
    }

    render() {
        return (
          <div>
              <input onChange={this.handleImgUpload} type='file' />
          </div>
        )
    }
}
 
export default Demo;