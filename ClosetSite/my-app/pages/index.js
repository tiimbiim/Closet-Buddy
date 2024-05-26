import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, {useState} from 'react'
import { Navigate, Link } from 'react-dom'
import Login from '@/comps/Login'
import SignUp from "@/comps/SignUp";
import AuthDetails from "@/comps/AuthDetails"
import PasswordLogin from "./PasswordLogin";
import ImageUpload from "./ImageUpload";
import { BrowserRouter, Routes, Route } from "react-router-dom";



const inter = Inter({ subsets: ["latin"] });

const home = () => {
  
  return (
    <BrowserRouter>
      <div>
          <Routes>
              <Route path="/" element={<PasswordLogin/>} />
              <Route path="/home" element={<ImageUpload/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}
 
export default home;

  



