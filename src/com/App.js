import React, { useEffect } from 'react'
import errorHandler from '../lib/errorHandler'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'

import '../style/App.css'


export default function App() {
  useEffect(() => {
    console.error = errorHandler
  }, [])
  
  
  return <>
    <Header />
    
    <Main />
    
    <Footer />
  </>
}