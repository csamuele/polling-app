import {Header} from './components/Header/Header'
import Home from '@pages/Home'
import MyQuestions from '@pages/MyQuestions'
import MyVotes from '@pages/MyVotes'
import ProtectedRoute from '@components/Utils/ProtectedRoute'
import { QuestionContextProvider } from '@components/Question'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '@pages/Login'

function App() {
    
  
  return (
      <Router>
        <QuestionContextProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute/>}>
              <Route path="/my-questions" element={<MyQuestions />} />
              <Route path="/my-votes" element={<MyVotes />} />
            </Route>
          </Routes>
        </QuestionContextProvider>
      </Router>
  )
}

export default App
