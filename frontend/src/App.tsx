import { QuestionContextProvider } from "@components/Question"
import ProtectedRoute from "@components/Utils/ProtectedRoute"
import Home from "@pages/Home"
import Login from "@pages/Login"
import MyQuestions from "@pages/MyQuestions"
import MyVotes from "@pages/MyVotes"
import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Header } from "./components/Header/Header"

const App: React.FC = () => {
    return (
        <Router>
            <QuestionContextProvider>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/my-questions" element={<MyQuestions />} />
                        <Route path="/my-votes" element={<MyVotes />} />
                    </Route>
                </Routes>
            </QuestionContextProvider>
        </Router>
    )
}

export default App
