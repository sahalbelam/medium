import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import Publish from './pages/Publish'
import HomePage from './pages/Home'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/blog' element={<Blogs />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/publish' element={<Publish />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
