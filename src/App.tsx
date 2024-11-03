import '../src/style/globals.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from './pages/Register'
import { RequireAuth } from './contexts/RequireAuth'
import { AuthProvider } from './contexts/AuthContext'
import { HomePage } from './pages/HomePage' 
import { Chat } from './pages/Chat'
import { Help } from './pages/Help'
import {Job} from './pages/job'
import { Positions } from './pages/Positions'
import { Profile } from './pages/Profile'
import { Settings } from './pages/Settings'
import { Notifications } from './pages/Notifications'

function App() {

  return (
    <div className='font-montserrat overflow-hidden'>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<RequireAuth><HomePage/></RequireAuth>}/>
            <Route path='/Login' element={<RequireAuth><HomePage/></RequireAuth>}/>
            <Route path='/Register/:isContractor' element={<Register/>}/>
            <Route path='/HomePage' element={<RequireAuth><HomePage/></RequireAuth>}/>
            <Route path='/Chat' element={<Chat/>}/>
            <Route path='/Profile/:id' element={<Profile/>}/>
            <Route path='/Settings' element={<Settings/>}/>
            <Route path='/Help' element={<Help/>}/>
            <Route path="/Job" element={<Job/>}/>
            <Route path='/Positions' element={<Positions/>}/>
            <Route path='/Notifications' element={<Notifications/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
