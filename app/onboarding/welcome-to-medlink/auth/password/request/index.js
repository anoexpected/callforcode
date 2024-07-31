import React, { useState } from 'react';
import '@carbon/react';
import { Button, Form, Heading, TextInput } from '@carbon/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PasswordRequest() {
  const [email, setEmail] = useState('');

  const sendResetLink = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/password/reset/', { email });
      if(response.data.success){

        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);

      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="form">
      <div className="svg-part"></div>
      <div className="form-part">
        <Form aria-label="request-form" className="request-form" onSubmit={sendResetLink}>
          <Heading style={{ textAlign: 'left', width: '100%', fontWeight: 'bold', fontSize: '20px' }}>
            Reset your Password
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
          <Button size="sm" type="submit" className="btns">
            Get Reset Link
          </Button>
          <ToastContainer />
        </Form>
      </div>
    </div>
  );
}

export default PasswordRequest;
