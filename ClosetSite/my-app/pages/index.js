import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, {useState} from 'react'
import { Navigate, Link } from 'react-dom'
import Login from '@/comps/Login'
import SignUp from "@/comps/SignUp";
import AuthDetails from "@/comps/AuthDetails"
import { BrowserRouter } from "react-router-dom";



const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  

  return (
    <div>
        
            <Login />
            <SignUp />
            <AuthDetails />

    </div>
  );

}
