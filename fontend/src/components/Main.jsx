import "../css/Main.css";
import axios from "axios";
import * as XLSX from "xlsx";
import { createElement, useEffect, useState } from "react";
const Main = () => {
  
  const [meg, setMeg] = useState("");
  const [isListening, setIsListening] = useState(false);
  const[brachcode ,setBranchcode]=useState("");
  const[crowd ,setCrowd]=useState("");
  const [data,setData]=useState([]);
  const [keyvalue,setKeyvalue]=useState("");
  const [crowdcount,setCrowdcount]=useState("")
  
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
  
  const sendMegs = () => {
    const meg_area = document.getElementById("message_content");
    document.getElementById("send_text").value="";
    if (!meg.trim()) return; 

    var userMessage = document.createElement('h5');
    userMessage.innerHTML = meg;
    meg_area.appendChild(userMessage);

    meg_area.scrollTop = meg_area.scrollHeight;

   handleSearch(meg);
};



useEffect(()=>{
  fetch("/List.xlsx").then((response)=>response.arrayBuffer())
  .then((arrayBuffer)=>{
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);
          
          console.log(parsedData); // Debugging: Check actual column names
          setData(parsedData);
        })
        .catch((error) => console.error("Error loading Excel file:", error));
    }, []);
 const handleSearch =  (meg) => {
  console.log("hello");
     var num= meg.toUpperCase();
      if (data.length === 0) {
        console.log("Data not loaded");
        return;
      }
      const result = data.find((row) => row["Roll No"] == num);
      setCrowdcount(result ? result["Student Name"] : "Not Found");

      
    const meg_area = document.getElementById("message_content");
    var userMessage = document.createElement('h4');
    userMessage.innerHTML =(result ? result["Student Name"] : "Not Found" ).toLowerCase();
    console.log();
    
    meg_area.appendChild(userMessage);
    };
  

  return (
    <div className="main_body">
      <div className="sequare"></div>
      <div className="small_sequare"></div>
      <div className="small_sequare1"></div>

      <div className="main_container">
        <div className="img_main">
          <h3>Crowd Vista</h3>
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
            <div className="message_content" id="message_content">
               <h4 className="meg_start_one">
                hello <br /> how can I help you ?
               </h4>
                  
            </div>
            <div className="send_area">
              <span className="working" id="mic_test" >
              <i className="fa-solid fa-microphone" onClick={handleMicClick}></i>
              </span>
           
             <input type="text" id="send_text" className="send_text"  onChange={(e)=>{setMeg(e.target.value)}} placeholder="Enter your Queries.." />
             <button  className="meg_button" onClick={sendMegs}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
