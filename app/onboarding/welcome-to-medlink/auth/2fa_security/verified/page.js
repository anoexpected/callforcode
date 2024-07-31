"use client";
import React from "react";
import PasswordComplete from "./index";
import "./styles.scss";
import Link from "next/link";
import { ArrowLeft } from "@carbon/icons-react";
import Image from "next/image";
import OnboardingHeader from "@/app/onboarding/internals/header";
const page = () => {
  return (
    <div>
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
            <Link href="../../../welcome-to-medlink/auth/sign-in">
              {" "}
              <section className="back">
                <ArrowLeft size={32} /> Back
              </section>
            </Link>
          </div>

          <section className="log-in">
            <h4 className="log-in">
              No Account yet ?
              <Link
                className="link"
                href="../../welcome-to-medlink/auth/sign-up"
              >
                Sign up
              </Link>
            </h4>
          </section>
        </OnboardingHeader>
        <section className="signin-container">
          <PasswordComplete />
        </section>
      </div>
    </div>
  );
};

export default page;
