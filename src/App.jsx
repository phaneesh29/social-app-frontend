import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Createpost from './pages/Createpost'

const App = () => {
  return (
    <>
      <Navbar />

      <div className=''>
        <Routes>
          <Route path='/create' element={<Createpost />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App