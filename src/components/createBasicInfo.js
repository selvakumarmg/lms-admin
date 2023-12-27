// PersonalInfoStep.js

import React, { useState, useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import { TextField, Button, Grid } from '@mui/material';

const PersonalInfoStep = ({ setActiveFlag, setLoading }) => {

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  const handleSendOtp = (data) => {

    // TODO: Implement OTP sending logic here
    // You can use a state variable to track if OTP has been sent successfully
    // For demo purposes, we'll just toggle the state
    setOtpSent((prevOtpSent) => !prevOtpSent);
    resendOTP()
  };

  const verifyFn = () => {
    setActiveFlag(true);
    setLoading(true)
    setTimeout(() => {
      setLoading(false)

    }, 3000)

  }


  useEffect(() => {
    // Function to handle the countdown logic
    const interval = setInterval(() => {
      // Decrease seconds if greater than 0
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      // When seconds reach 0, decrease minutes if greater than 0
      if (seconds === 0) {
        if (minutes === 0) {
          // Stop the countdown when both minutes and seconds are 0
          clearInterval(interval);
        } else {
          // Reset seconds to 59 and decrease minutes by 1
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000); // Run this effect every 1000ms (1 second)

    return () => {
      // Cleanup: stop the interval when the component unmounts
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = () => {
    setMinutes(0);
    setSeconds(30);
  };


  return (
    <div >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Field
            as={TextField}
            label="First Name"
            name="firstName"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage style={{ color: "red" }} name="firstName" component="div" />
        </Grid>
        <Grid item xs={6}>
          <Field
            as={TextField}
            label="Last Name"
            name="lastName"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage style={{ color: "red" }} name="lastName" component="div" />
        </Grid>


        <Grid item xs={12}>
          <Field
            as={TextField}
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage style={{ color: "red" }} name="email" component="div" />
        </Grid>
        <Grid item xs={12}>
          <Field
            as={TextField}
            label="Phone Number"
            name="phoneNumber"
            variant="outlined"
            fullWidth
            margin="normal"
            // onClick={(e) => { e?.target?.value?.length === 10 ? console.log(e?.target?.value?.length) : console.log("ss", e?.target?.value?.length) }}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ height: "3rem", width: "10rem", borderRadius: "0%" }}
                  onClick={handleSendOtp}

                  disabled={otpSent}
                >
                  {otpSent ? 'OTP Sent' : 'Send OTP'}
                </Button>
              ),
            }}
          />
          <ErrorMessage style={{ color: "red" }} name="phoneNumber" component="div" />
        </Grid>
        {otpSent &&
          <Grid item xs={12} style={{ textAlign: "right", color: "blue" }}>
            {seconds > 0 || minutes > 0 ? (
              <div>
                Time Remaining:{" "}
                <span style={{ fontWeight: 600 }}>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </div>
            ) : (
              <a
                disabled={seconds > 0 || minutes > 0}
                style={{
                  color: seconds > 0 || minutes > 0 ? "blue" : "blue",
                }}
                onClick={resendOTP}
              >
                Resend OTP
              </a>
            )}

          </Grid>}
        <Grid item xs={12}>
          {otpSent && <div>
            <Field
              as={TextField}
              label="OTP Verification"
              name="otp"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <div >
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        color={"success"}
                        style={{ height: "3rem", width: "8rem", borderRadius: "0%" }}
                        onClick={() => { verifyFn() }}

                      // disabled={otpSent}
                      >
                        {'OTP Verify'}
                      </Button>
                    </Grid>
                    {/* <Grid item xs={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ height: "3rem", width: "10rem", borderRadius: "0%" }}
                        onClick={handleSendOtp}

                        disabled={otpSent}
                      >
                        {'Resent OTP'}
                      </Button>
                    </Grid> */}
                  </div>
                ),
              }}
            />
            <ErrorMessage style={{ color: "red" }} name="otp" component="div" />
          </div>}
        </Grid>


      </Grid>
    </div>
  );
};

export default PersonalInfoStep;
