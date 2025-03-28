import './App.css'
import {Route ,BrowserRouter  ,Routes} from 'react-router-dom'
import LandingPage from './pages/landing'
import Authentication from './pages/authentication'
import { AuthProvider } from './contexts/AuthContext'
import VideoMeetComponent from './pages/VideoMeet'
import HomeComponent from './pages/home'
import History from './pages/history'

function App() {
 

  return (
    <div className='App'>
     <BrowserRouter>
     <AuthProvider>
      <Routes>
        {/* <Route path="/home" element= /> */}
        <Route path="/" element={<LandingPage/>  } />
        <Route path="/auth" element= {<Authentication/>}/>
        <Route path="/home" element= {<HomeComponent/>}/>     
        <Route path="/history" element= {<History/>}/>      
        {/* //Use this for any video call app to created a socket connection     */}
        <Route path="/:url" element= {<VideoMeetComponent/>}/>
      </Routes>
      </AuthProvider>
     </BrowserRouter>
     </div> 
  )
}

export default App
