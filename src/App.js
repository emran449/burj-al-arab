import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import { createContext, useState } from 'react';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <p>Name: {loggedInUser.name}</p>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/home' element= {<Home />} />
      <Route path='/login' element= {<Login />} />
      
      <Route element = {<PrivateRoutes/>}>
      <Route path='/book/:bedType' element= {<Book />} />

      </Route>
      <Route path='/' element= {<Home />} />
    </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
