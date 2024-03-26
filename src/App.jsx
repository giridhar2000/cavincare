import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Filter from './Components/FilterCount/Filter'
import "../src/App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Test from './Components/Test/Test'
// import Datatable from './Components/DataTable/Datatable'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Filter />} />
          {/* <Route path='/dataTable' element={<Datatable />} /> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App

