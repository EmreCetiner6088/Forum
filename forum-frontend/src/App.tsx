import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './component/Register'
import Login from './component/Login'
import Home from './component/Home'
import Profile from './component/Profile'
import Chat from './component/Chat'

function App() {

  return (
    <div>
      <Routes>
        {/* Register bileşenini ana sayfa için göster */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='*' element={<h1>Not Found Page</h1>} />
      </Routes>
    </div>
  )
}

export default App
