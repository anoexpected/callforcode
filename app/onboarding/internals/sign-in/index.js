"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Heading,
  TextInput,
  ProgressBar,
} from "@carbon/react";
import './styles.scss';

function SignInForm() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsSigningIn(true);
  };

  useEffect(() => {
    if (isSigningIn) {
      let progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(progressInterval);
            window.location.href = "/home"; 
            return 100;
          }
          return prevProgress + 1;
        });
      }, 30); 
    }
  }, [isSigningIn]);

  const MyForm = () => (
    <Form aria-label="login-form" className="login-form" onSubmit={handleSignIn}>
      <Heading style={{ textAlign: "left", width: "100%", fontWeight: "bold", fontSize: "20px" }}>
        Welcome Back, to Medlink
      </Heading>
      <TextInput
        id="email"
        type="email"
        className="inputs"
        labelText="Enter your Address"
        placeholder="Email Address"
      />
      <TextInput
        className="inputs"
        labelText="Enter your Password"
        type="password"
        placeholder="password"
      />
      <Button size="sm" type="submit" className="btns">
        Sign In
      </Button>
      <Heading className="or-container">
        <hr className="or-line" />
        <span className="or-text">OR</span>
        <hr className="or-line" />
      </Heading>
      <Button kind="secondary" className="btns" size="sm">
        Continue with Google
      </Button>
    </Form>
  );

  const SignInProgress = () => (
    <div className="signin-progress">
      <img src="../../../../logov2.svg" alt="Medlink Logo" className="logo-progress" />
      <Heading style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>
        Signing you in to Medlink
      </Heading>
      <ProgressBar className="my-progress" label={`${progress}%`} value={progress} />
    </div>
  );

  return (
    <div className="signin-form">
      {isSigningIn ? <SignInProgress /> : <MyForm />}
    </div>
  );
}

export default SignInForm;
