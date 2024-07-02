import React from "react";
import "./styles.scss";
import { Button, Heading } from "@carbon/react";
import { Information, TrashCan } from "@carbon/icons-react";
// import { ToastContainer, toast } from 'react-toastify';

function NextAppCard() {
  // const notify = ()=> toast.success('🦄 Deleted successfully!', {
  //   position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  //   // transition: Bounce,
  //   });
  return (
    <div className="appointment">
      <div className="appointment-image">
        <img className="img-app" src="../../doctor.jpg" alt="appointment" />
      </div>
      <div className="test-description">
        <Heading className="test">Blood Test</Heading>
        <Heading className="name">Dr. Keter</Heading>
        <p>ADV: 29th May 2024</p>
      </div>
      <div className="edit-icons">
       
          <TrashCan
            className="edit-icon"
            style={{ color: "red" }}
          />
        <Information className="edit-icon" />
      </div>
    </div>
  );
}

export default NextAppCard;
