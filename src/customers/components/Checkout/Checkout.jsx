import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DeliveryAddress from "./DeliveryAddress";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

function Checkout() {
  const { auth } = useSelector((store) => store);
  const isAuthenticated = auth?.user || localStorage.getItem("token");

  const location = useLocation();
  const navigate = useNavigate();

  const querySearch = new URLSearchParams(location.search);

  // ✅ safe step from URL
  const stepFromUrl = Math.min(
    steps.length,
    Math.max(1, Number(querySearch.get("step") || 1)),
  );

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  // ✅ sync URL → state
  useEffect(() => {
    setActiveStep(stepFromUrl - 1);
  }, [stepFromUrl]);

  // ✅ auth guard
  useEffect(() => {
    if (!isAuthenticated) {
      setActiveStep(0);
      navigate("?step=1");
    }

    if (!querySearch.get("step")) {
      navigate("?step=2");
    }
  }, [isAuthenticated, activeStep, navigate]);

  // ✅ render step content
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <div>Login</div>;
      case 1:
        return <DeliveryAddress />;
      case 2:
        return <OrderSummary />;
      case 3:
        return <div>Payment</div>;
      default:
        return null;
    }
  };

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  // ✅ next step + URL sync
  const handleNext = () => {
    const newStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((_, i) => !(i in completed))
        : activeStep + 1;

    setActiveStep(newStep);
    navigate(`?step=${newStep + 1}`);
  };

  const handleBack = () => {
    const newStep = activeStep - 1;
    setActiveStep(newStep);
    navigate(`?step=${newStep + 1}`);
  };

  const handleStep = (step) => () => {
    // ❌ prevent skipping steps if not logged in
    if (!isAuthenticated && step > 0) return;

    setActiveStep(step);
    navigate(`?step=${step + 1}`);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    navigate("?step=1");
  };

  return (
    <div className="max-w-6xl mx-auto" style={{ marginTop: "90px" }}>
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton
                onClick={handleStep(index)}
                disabled={!isAuthenticated && index > 0}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <div>
          {allStepsCompleted() ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed — you're finished
              </Typography>

              <Box sx={{ display: "flex", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          ) : (
            <Box sx={{ display: "flex", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>

              <Box sx={{ flex: "1 1 auto" }} />

              {/* <Button onClick={handleComplete}>
                {completedSteps() === totalSteps() - 1
                  ? "Finish"
                  : "Complete Step"}
              </Button> */}
            </Box>
          )}
        </div>

        {/* ✅ Correct rendering */}
        <div className="mt-4">{renderStepContent()}</div>
      </Box>
    </div>
  );
}

export default Checkout;
