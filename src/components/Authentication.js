// PersonalInfoStep.js

import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { TextField, Checkbox, Grid, FormControlLabel } from '@mui/material';

const PersonalInfoStep = () => {

  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    // TODO: Implement OTP sending logic here
    // You can use a state variable to track if OTP has been sent successfully
    // For demo purposes, we'll just toggle the state
    setOtpSent((prevOtpSent) => !prevOtpSent);
  };


  return (
    <div >
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Field
            as={TextField}
            type="password"
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage style={{ color: "red" }} name="password" component="div" />
        </Grid>

        <Grid item xs={12}>
          <Field
            as={TextField}
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage style={{ color: "red" }} name="confirmPassword" component="div" />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Field
                as={Checkbox}
                name="agreedToTerms"
                color="primary"
              />
            }
            label="I agree to the terms and conditions"
          />
          <ErrorMessage style={{ color: "red" }} name="agreedToTerms" component="div" />
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonalInfoStep;
