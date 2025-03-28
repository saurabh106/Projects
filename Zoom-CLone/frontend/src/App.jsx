import './App.css'
import {Route ,BrowserRouter  ,Routes} from 'react-router-dom'
import LandingPage from './pages/landing'

function App() {
 

  return (
    <div className='App'>
     <BrowserRouter>
      <Routes>
        {/* <Route path="/home" element= /> */}
        <Route path="/" element={<LandingPage/>  } />
        {/* <Route path="/home" element= {}/> */}
        {/* <Route path="/home" element= {}/> */}
      </Routes>
     </BrowserRouter>
     </div> 
  )
}

export default App
