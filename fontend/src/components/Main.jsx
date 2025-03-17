import "../css/Main.css";
import { useState } from "react";

const Main = () => {
  
  const [meg, setMeg] = useState("");
  const [isListening, setIsListening] = useState(false);
  const[brachcode ,setBranchcode]=useState("");
  const[crowd ,setCrowd]=useState("");
  
  const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new Speech();
  
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "ta-IN";
  const mic_test=document.getElementById("mic_test");
  
  recognition.onstart = () => {
    mic_test.classList.add("startmic");
    setIsListening(true);
  };
  
  recognition.onresult = async(event) => {
    const transcript = event.results[0][0].transcript;
    if(recognition.lang=="ta-IN"){
      const tamilText = await convertToTamil(transcript);
      setText(tamilText);
    }
    else{
      setMeg(transcript);
    }
    
  };
  
  
  recognition.onend = () => {
    setIsListening(false);
    mic_test.classList.remove("startmic");
  };
  
  const handleMicClick = () => {
    if (!isListening) {
      recognition.lang = navigator.language === "ta-IN" ? "ta-IN" : "en-US"; // Switch between English and Tamil
      recognition.start();
    }
  };

  const convertToTamil = async (tanglishText) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${tanglishText}&langpair=en|ta`
      );
      const data = await response.json();
      console.log("API Response:", data);
      
      if (data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      }
      
      return tanglishText; // Fallback: return original Tanglish if API fails
    } catch (error) {
      console.error("Error in Transliteration:", error);
      return tanglishText;
    }// Fallback: return original Tanglish if API fails
  };


  
  const handlechat = () => {
    const chatbot = document.getElementById("chatbot");
    if (chatbot) {
      chatbot.classList.remove("showbot");
      chatbot.classList.add("hidebot");
    }
  };
  const handleShowchat = () => {
    const chatbot = document.getElementById("chatbot");
    if (chatbot) {
      chatbot.classList.add("showbot");
      chatbot.classList.remove("hidebot");
    }
  };
  const loadind=document.getElementById("loading");
  const handleCheckCrowd=(event)=>{
    setCrowd("");
    event.preventDefault();
      if(brachcode==="SBI0007"){
             setTimeout(()=>{
              setCrowd("360 people");
              loadind.style.opacity=0;
             },4000)
             loadind.style.opacity=1;
            
      }
      else{
        setTimeout(()=>{
          setCrowd("Wrong Branch code")
          loadind.style.opacity=0;
         },4000)
         loadind.style.opacity=1;
        
      }
  }

  return (
    <div className="main_body">
      <div className="sequare"></div>
      <div className="small_sequare"></div>
      <div className="small_sequare1"></div>

      <div className="main_container">
        <div className="img_main">
          <h3>Bank Flow</h3>
          <div className="images"></div>
        </div>
        <form action="" className="main_form" onSubmit={handleCheckCrowd}> 
          <h1>Happy to See You !</h1>
          <h3>Enter Branch code and check It</h3>
          <div className="inputs_main">
            <input type="text" placeholder="EX : BXE2000SBI" onChange={(e)=>{setBranchcode(e.target.value)}} />
            <i className="fa-solid fa-building-columns"></i>
          </div>
          <button type="submit">Check</button>
          <p>{crowd}</p>
          <div className="loading" id="loading"  >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </form>
      </div>
      <div className="ai">
        <div className="ai_container" onClick={handleShowchat}></div>
      </div>
      <div className="chatbot " id="chatbot">
        <div className="closebot">
          <div className="title_chat">
            <i className="fa-solid fa-robot"></i>
            <h3>ChatBot</h3>
          </div>

          <i className="fa-solid fa-xmark" id="closebot" onClick={handlechat}></i>
        </div>
        <div className="chat">
            <div className="message_content"></div>
            <div className="send_area">
              <span className="working" id="mic_test" >
              <i className="fa-solid fa-microphone" onClick={handleMicClick}></i>
              </span>
           
             <input type="text" id="send_text" className="send_text" value={meg} onChange={(e)=>{setMeg(e.target.value)}} placeholder="Enter your Queries.." />
             <button className="meg_button">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
