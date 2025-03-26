import React from 'react'
import '../css/AdminDash.css'
import { useState,useRef} from 'react'

const AdminDash = () => {
    const videoRef=useRef(null)
    const[camara_start,setCamara_start]=useState(null);
  const startCamera=async()=>{
      try{
        const media=await navigator.mediaDevices.getUserMedia({video:true});
        if(videoRef.current){
          videoRef.current.srcObject=media;
        }
        setCamara_start(media);
      }catch(e){
        console.error("error camara not workig",e);
      }
    };
    const stopCamera=()=>{
      if(camara_start){
        camara_start.getTracks().forEach(track =>track.stop());
        setCamara_start(null);
      }
    };

    const hideDropdown=()=>{
       const popup=document.getElementById("admin_details_area");
       popup.classList.remove("show_admin_details");
       popup.classList.add("hide_admin_details")
    }

  return (
    <div className="admin_main_body">
      <div className="sequare"></div>
      <div className="small_sequare"></div>
      <div className="small_sequare1"></div>

      <div className="admin_main_container">
          <div className="left_admin_side">
            <h3>Admin DashBoard</h3>
            <div className="camara_show_area">
              <video ref={videoRef} autoPlay className='camera-view'/>


            </div>
            <div className="buttons_admin">
            <button className='camara_start' onClick={startCamera}>Start</button>
            <button className='camara_stop' onClick={stopCamera}>Stop</button>
            </div>
          
          </div>
          <div className="right_admin_side">

          </div>
      </div>

      <div className="admin_details_area show_admin_details" id='admin_details_area'>
         <div className="close_mark_admin_details">
                <i className="fa-solid fa-xmark" onClick={hideDropdown}></i>
         </div>
         

      </div>


      <div className="r_sequare"></div>
      <div className="r_small_sequare"></div>
      <div className="r_small_sequare1"></div>
   
    </div>
  )
}
export default AdminDash;
