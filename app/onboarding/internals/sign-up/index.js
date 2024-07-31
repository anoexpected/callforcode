import React from "react";
import "./styles.scss";
import OnboardingHeader from "@/app/onboarding/internals/header";
import Link from "next/link";
import { ArrowLeft, Hospital, HospitalBed } from "@carbon/icons-react";
import Image from "next/image";
import OptionCard from './options-card/index';

function SignUp() {
  const optionList = [
    {
      id: 1,
      title: "Patient",
      description: "Personal Account",
      icon: <HospitalBed size={32} />,
      link:"../../welcome-to-medlink/auth/sign-up/patient",
      disabled: false,
    },
    {
      id: 2,
      title: "Clinician",
      description: "Clinician and care center account",
      icon: <Hospital size={32} />,
      link:"../../welcome-to-medlink/auth/sign-up/doctor",
      disabled:true,
      
    },
  ];

  return (
    <div>
      <OnboardingHeader>
        <div className="logo">
          <Image
            width={70}
            height={70}
            src="/logov2.svg"
            alt="logo"
            className="logo-image"
          />
            <Link href='../../welcome-to-medlink'> <section className="back">
          <ArrowLeft size={32} /> Back
        </section></Link>
        </div>
     
        <section className="log-in">
          <h4 className="log-in">
            Already have an Account?{" "}
            <Link className="link" href="../../welcome-to-medlink/auth/sign-in">
              Sign in
            </Link>
          </h4>
        </section>
      </OnboardingHeader>
      <section className="sign-up-container">
       <div className="form-part">
       <section className="join-us">
          <h4 className="signup-title">Join Us today and explore features made for you</h4>
          <h4 className="signup-description">
            We cater for clinicians and patients because we believe <br /> in providing
            access for all.
          </h4>
          <h4>Please select an option</h4>
          <div className="sign-up-option">
            {optionList.map((option) => (
              <OptionCard
              href={option.link}
                key={option.id}
                icon={option.icon}
                description={option.description}
                title={option.title}
                disabled={option.disabled}
              />
            ))}
          </div>
        </section>
       </div>
       <div className="svg-part"></div>
      </section>
    </div>
  );
}

export default SignUp;
