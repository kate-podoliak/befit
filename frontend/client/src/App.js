import React, {useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import './App.scss';
import Footer from "./components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {Main} from "./pages/Main";
import {About} from "./pages/About";
import {Timetable} from "./pages/Timetable";
import {Services} from "./pages/Services";
import {NotFoundPage} from "./pages/NotFoundPage";
import Registration from "./components/Registration/Registration";
import Profile from "./pages/Profile";
import Login from "./components/Login/Login";
import Reviews from './pages/Reviews';

function App() {
  return (
      <BrowserRouter>
        <div className='wrapper'>
          <header className='header'>
            <Header/>
          </header>
          <main className='main'>
            <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="/about" element={<About/>}/>
              <Route exact path="/timetable" element={<Timetable/>}/>
              <Route exact path="/reviews" element={<Reviews/>}/>
              <Route path="/services" element={<Services/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
              <Route exact path="/registration" element={<Registration />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <footer className='footer'>
            <Footer/>
          </footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
