import React from "react";
import Stepper from "@mui/material/Stepper";
import { Step, StepButton } from "@mui/material";
const steps = [
  "Placed",
  "Order Confirmed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];
const OrderTracking = ({ activeStep }) => {
  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracking;
