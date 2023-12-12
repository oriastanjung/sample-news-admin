import React from 'react'
import {Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import UsersPage from './pages/UsersPage'
import NewsPage from './pages/NewsPage'
import CreateNewsPage from './pages/CreateNewsPage'
import EditNewsPage from './pages/EditNewsPage'
function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/users' element={<UsersPage />}></Route>
      <Route path='/news' element={<NewsPage />}></Route>
      <Route path='/news/create' element={<CreateNewsPage />}></Route>
      <Route path='/news/edit/:id' element={<EditNewsPage />}></Route>
    </Routes>
  )
}

export default App