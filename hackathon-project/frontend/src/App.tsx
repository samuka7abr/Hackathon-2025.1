import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Transcription } from './pages/Transcription'
import { Sessions } from './pages/Sessions'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sessions/:patientName" element={<Sessions />} />
          <Route path="/transcription/:patientName" element={<Transcription />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
