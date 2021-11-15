import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom';

import "../styles/HomePage.css";



function HomePage(){
   
  return(

    <div className="HomePage">

      <div id="nav-bar">
      
        <img src="assets/logo-hp.png" alt="" id="logo"/>

        <ul id="nav-items">

          <a href="#tech-stack">
            <li id="about-us">About Us</li>
          </a>

          <li id="features">
            <a href="#features-container">
              Features
            </a>
          </li>

          <Link to="/login" >
            <li>
              <label for="login" id="login">
                <p>Sign In</p>
              </label>
            </li>
          </Link>
        
          
          <Link to='/register' target="_blank">
            <li>  
              <label for="register" id="register">
                <p>Register</p>
              </label>
            </li>
          </Link>
           
        
        </ul>
      </div>

      <div id="content">
        <div id="description">
          <h1>
            Share your Electronic Health Records<br/><span>Securely</span> using IPFS & Blockchain
          </h1>

          <br/>
          <br/>

          <div id="acknw">
        
           Project CoE Digital Forensics Intelligence Supported by VGST<br/><div id="et"></div>
           Department of ITBT, Government of Karnataka
        
          </div>  
          
        </div>

        <img src="assets/bc-hp.png" alt="yoooo" id="bc-img"/>

        <img src="assets/scem.png" id="scm"/>

        
       
      
      </div>

      <div id="features-container">
        <ul id="features-items-1">
          <li>
            <img src="assets/feat/1.png" alt=""/>
            <h3 id="feat-name">Secure</h3>
          </li>

          <li>
            <img src="assets/feat/2.png" alt=""/>
            <h3 id="feat-name">Efficient</h3>
          </li>

          <li>
            <img src="assets/feat/3.png" alt=""/>
            <h3 id="feat-name">Decentralized</h3>
          </li>
        </ul>

        <ul id="features-items-2">
          <li>
            <img src="assets/feat/4.png" alt=""/>
            <h3 id="feat-name">Available 24x7</h3>
          </li>

          <li>
            <img src="assets/feat/5.png" alt=""/>
            <h3 id="feat-name">Free File Storage</h3>
          </li>
        </ul>
      </div>

      <div id="showcase">

      <div id="ts-img">
            <img src="assets/ts.png" height="480" width="580" ></img>
         </div>
         
      </div>

      <div id="tech-stack">
        
      <p id="sc-text">
      Electronic Health Records are encrypted and uploaded to IPFS,<br/> 
      which is a decentralized file storage system. This files can later<br/>
      be retrived by the person to whom it was intended to share with.
      </p>
    
      </div>

      <div id="footer">

      <p> Secure Share © 2021</p>

    </div>
    </div>

 
    );
}

export default HomePage;