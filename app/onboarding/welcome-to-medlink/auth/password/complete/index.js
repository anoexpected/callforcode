import { Heading } from "@carbon/react";
import Link from "next/link";
import React from "react";

function PassswordComplete() {
  return (
    <div className="form">
      <div className="svg-part"></div>
      <div className="form-part">
        <div className="flex-complete">
          {" "}
          <Heading>Thank you for choosing medlink.</Heading>
          <p>
            Your password has successfully been changed. You will recieve a
            notification concerning this. You may proceed to sign in{" "}
            <Link href={"../../../welcome-to-medlink/auth/sign-in"}>here</Link>.
            Thank you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PassswordComplete;
