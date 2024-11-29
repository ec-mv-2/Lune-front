import '../src/style/globals.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from './pages/Register'
import { RequireAuth } from './contexts/RequireAuth'
import { AuthProvider } from './contexts/AuthContext'
import { HomePage } from './pages/HomePage' 
import { Chat } from './pages/Chat'
import { Help } from './pages/Help'
import {Job} from './pages/Job'
import { Positions } from './pages/Positions'
import { Profile } from './pages/Profile'
import { Settings } from './pages/Settings'
import { Notifications } from './pages/Notifications'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { CoverLetterForm } from './pages/CoverLetter'
function App() {

  return (
    <div className='font-montserrat overflow-hidden'>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Login' element={<RequireAuth><HomePage/></RequireAuth>}/>
            <Route path='/Register/:isContractor' element={<Register/>}/>
            <Route path='/HomePage' element={<RequireAuth><HomePage/></RequireAuth>}/>
            <Route path='/Chat' element={<Chat/>}/>
            <Route path='/Profile/:id' element={<RequireAuth><Profile/></RequireAuth>}/>
            <Route path='/Settings' element={<Settings/>}/>
            <Route path='/Help' element={<Help/>}/>
            <Route path="/Job/:jobId" element={<Job/>}/>
            <Route path='/Positions' element={<Positions/>}/>
            <Route path='/Notifications' element={<Notifications/>}/>
            <Route path='/Dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}/>
            <Route path='/RegisterAdm' element={<RequireAuth><HomePage/></RequireAuth>}/>
            <Route path='/CoverLetter' element={<RequireAuth><CoverLetterForm/></RequireAuth>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
