import React from "react";
import {BrowserRouter, Route, Routes, Link} from "react-router";
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Navbar from './components/Navbar';
import Coworking from './components/Coworking';
import Meeting from './components/Meeting';
import Callbox from './components/Callbox';
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />

                <Route element={<PrivateRoute/>}>
                    <Route path="/coworking" element={<Coworking />} />
                    <Route path="/meeting" element={<Meeting />} />
                    <Route path="/callbox" element={<Callbox />} />
                </Route>


            </Routes>
        </BrowserRouter>

    );
}

export default App;
