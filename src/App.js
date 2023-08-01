import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home"
import AddStudent from "./Routes/AddStudent";
import EditStudent from "./Routes/EditStudent";
import Student from "./Routes/Student";
import NotFound from "./Routes/NotFound";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}></Route>   
                <Route path="/add" element={<AddStudent/>}></Route> 
                <Route path="/student" element={<Student/>}></Route> 
                <Route path="/student/:id" element={<EditStudent/>}></Route> 
                <Route path="/*" element={<NotFound/>}></Route> 
            </Routes>  
        </>
    );
};

export default App;
