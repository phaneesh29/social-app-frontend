import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'
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