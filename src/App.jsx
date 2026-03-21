import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Input from './pages/Input'
import Result from './pages/Result'

function App() {
  const [resumeText, setResumeText] = useState('')
  const [jdText, setJdText] = useState('')
  const [result, setResult] = useState(null)

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/input"
          element={
            <Input
              resumeText={resumeText}
              setResumeText={setResumeText}
              jdText={jdText}
              setJdText={setJdText}
              setResult={setResult}
            />
          }
        />
        <Route
          path="/result"
          element={<Result result={result} />}
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
