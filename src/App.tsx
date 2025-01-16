import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './pages/user/Register'
import { Provider } from 'react-redux'
import store from './store/store'
import Home from './pages/Home/Home'
import Login from './pages/user/Login'
function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>} />

          <Route path='/register' element={<Register />} />
          <Route path='/Login' element={<Login />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
