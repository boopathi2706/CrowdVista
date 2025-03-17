import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import Login from './components/Login';
import Main from './components/Main';
import AdminDash from './components/AdminDash';
// import VoiceToText from './components/VoiceToText';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/main' element={<Main />}></Route>
     < Route path='/admin' element={<AdminDash/>}></Route>

    </Routes>
    </BrowserRouter>
    {/* <Main /> */}
    </>
  )
}

export default App
