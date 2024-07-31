import React from "react";
import OnboardingHeader from "@/app/onboarding/internals/header";
import SignInForm from "../../../internals/sign-in/index";
import Link from "next/link";
import { ArrowLeft } from "@carbon/icons-react";
import Image from "next/image";
function SignIn() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <OnboardingHeader>
        <div className="logo">
          <Image
            width={70}
            height={70}
            src="/logov2.svg"
            alt="logo"
            className="logo-image"
          />
          <Link href="../../welcome-to-medlink">
            {" "}
            <section className="back">
              <ArrowLeft size={32} /> Back
            </section>
          </Link>
        </div>

        <section className="log-in">
          <h4 className="log-in">
            No Account yet ?
            <Link className="link" href="../../welcome-to-medlink/auth/sign-up">
              Sign up
            </Link>
          </h4>
        </section>
      </OnboardingHeader>
      <section className="signin-container">
        <div className="svg-part"></div>
        <div className="form-part">
          <SignInForm />
        </div>
      </section>
    </div>
  );
}

export default SignIn;
