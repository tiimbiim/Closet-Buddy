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
import { auth } from "../firebase";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth"



const inter = Inter({ subsets: ["latin"] });

const routerPage = () => {
  
    const currentAuth = getAuth();

    onAuthStateChanged(currentAuth, (user) => {

        if(user) {

            const uid = user.uid;
            console.log(uid, 'uid');

        }
        else {

            

        }

    })

    const handleClick = (e) => {

        signOut(auth).then(val => {

            console.log(val);
            console.log('you are now logged out');

        })

    }

  return (
    <div>
        <h1>Home</h1>
        <button onClick={handleClick}>Sign Out</button>
    </div>

  )
}
 
export default routerPage;

  



