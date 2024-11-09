import {Header} from './components/Header/Header'
import Home from '@pages/Home'
import MyQuestions from '@pages/MyQuestions'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
    
  
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-questions" element={<MyQuestions />} />
        </Routes>
      </Router>
  )
}

export default App
