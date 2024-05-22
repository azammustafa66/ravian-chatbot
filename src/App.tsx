import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Chat from './components/Chat'

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Chat />} />
        </Routes>
      </Router>
    </>
  )
}
