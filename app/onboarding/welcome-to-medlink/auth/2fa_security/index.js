import { React, useState } from "react";
import "@carbon/react";
import { Button, Form, Heading, TextInput } from "@carbon/react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams to get query parameters
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TwoFactorAuth() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const verify2Fa = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://127.0.0.1:8000/auth/verify_2fa/`, { email, code }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setSuccess(response.data.message);
        setError('');
        toast.success('2FA verified successfully.');
        router.push('/onboarding/welcome-to-medlink/auth/2fa_security/verified');  // Redirect after successful 2FA
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
      toast.error('An error occurred during 2FA verification.');
    }
  };

  const resendCode = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/auth/resend-2fa-code/`, { email }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success('2FA code resent. Please check your email.');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error('An error occurred while resending the 2FA code.');
    }
  };

  return (
    <div className="form">
      <ToastContainer />
      <div className="svg-part"></div>
      <div className="form-part">
        <Form
          aria-label="request-form"
          className="fa-form"
          onSubmit={verify2Fa}
        >
          <Heading
            style={{
              textAlign: "left",
              width: "100%",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Two Factor Authentication
          </Heading>
          <Heading>
            You are seeing this feature because you enabled two-factor
            authentication. You can disable this in your account settings.
          </Heading>
          <TextInput
            id="code"
            type="number"
            className="inputs"
            labelText="Enter the code"
            placeholder="Enter your 2FA code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        <div className="flex-btnss">  <Button size="sm" type="submit" className="btns">
            Proceed
          </Button>
          <Heading style={{cursor:"pointer"}} onClick={resendCode}>Resend 2FA code</Heading></div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </Form>
      </div>
    </div>
  );
}

export default TwoFactorAuth;
