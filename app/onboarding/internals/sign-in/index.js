"use client";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { Button, Form, Heading, TextInput, ProgressBar } from "@carbon/react";
import { signIn } from "next-auth/react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles.scss";

function SignInForm() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setError('');

    Swal.fire({
      title: "Signing you in",
      text: "Please wait...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        axios.post('http://127.0.0.1:8000/auth/login/', {
          email: email,
          password: password
        })
        .then((response) => {
          Swal.close();
          if (response.data.success) {
            toast.success(response.data.message);
            let progressInterval = setInterval(() => {
              setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                  clearInterval(progressInterval);
                  window.location.href = "/home"; // Redirect to the home page on success
                  return 100;
                }
                return prevProgress + 1;
              });
            }, 30);
          } else {
            setError(response.data.message || 'Sign-in failed');
            toast.error(`Sign-in failed: ${response.data.message}`);
            setIsSigningIn(false);
          }
        })
        .catch((error) => {
          Swal.close();
          setError('An error occurred during sign-in.');
          toast.error('An error occurred during sign-in.');
          setIsSigningIn(false);
        });
      },
    });
};


  useEffect(() => {
    if (isSigningIn) {
      let progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prevProgress + 1;
        });
      }, 30);
    }
  }, [isSigningIn]);

  const MyForm = () => (
    <Form
      aria-label="login-form"
      className="login-form"
      onSubmit={handleSignIn}
    >
      <Heading
        style={{
          textAlign: "left",
          width: "100%",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Welcome Back, to Medlink
      </Heading>
      <TextInput
        id="email"
        type="email"
        className="inputs"
        labelText="Enter your Address"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        className="inputs"
        labelText="Enter your Password"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button size="sm" type="submit" className="btns">
        Sign In
      </Button>
      {error && <p className="error-message">{error}</p>}
      <p className="forgot-password">forgot password?</p>
      <Heading className="or-container">
        <hr className="or-line" />
        <span className="or-text">OR</span>
        <hr className="or-line" />
      </Heading>
      <Button
        kind="secondary"
        className="btns"
        size="sm"
        onClick={() => signIn()}
      >
        Continue with Google
      </Button>
    </Form>
  );

  return (
    <div className="signin-form">
      <ToastContainer />
       <MyForm />
    </div>
  );
}

export default SignInForm;
