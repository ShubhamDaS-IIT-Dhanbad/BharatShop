import React from 'react';
import './App.css'

// import 'bootstrap/dist/css/bootstrap.min.css';

import Windows from './windowsApp.jsx'
const App=React.memo(()=> {
  return (
    <>
      <Windows />
    </>
  )
})
export default App


