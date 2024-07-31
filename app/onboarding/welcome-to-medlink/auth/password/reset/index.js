import React, { useState } from "react";
import "@carbon/react";
import { Button, Form, Heading, PasswordInput } from "@carbon/react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PasswordReset() {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!uid || !token) {
      toast.error('Invalid reset link');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/auth/password/reset/confirm/${uid}/${token}/`, 
        { password, confirm_password: confirmPassword }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      toast.success(response.data.message);
      window.location.href = "/onboarding/welcome-to-medlink/auth/password/complete"
    } catch (err) {
      toast.error(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="form">
      <div className="form-part">
        <Form aria-label="reset-form" className="reset-form" onSubmit={handlePasswordReset}>
          <Heading style={{ textAlign: "left", width: "100%", fontWeight: "bold", fontSize: "20px" }}>
            Reset your Password
          </Heading>
          <div className="password-inputs">
            <PasswordInput
              id="password"
              labelText="New Password"
              helperText="Your password must meet the following criteria: at least 8 characters long, include both uppercase and lowercase letters, and contain at least one number and one special character."
              autoComplete="off"
              className="input-fields"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput
              id="cpassword"
              labelText="Confirm Password"
              helperText="The passwords provided must match in order to proceed."
              autoComplete="off"
              className="input-fields"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button size="sm" type="submit" className="btns">
            Change My Password
          </Button>
        </Form>
      </div>
      <div className="svg-part"></div>
      <ToastContainer />
    </div>
  );
}

export default PasswordReset;
