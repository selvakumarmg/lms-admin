// PersonalInfoStep.js

import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { TextField, Button, Grid } from '@mui/material';

const VerificationInfoStep = () => {


  return (
    <div >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Field
            as={TextField}
            label="Door number"
            name="doorNumber"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage style={{ color: "red" }} name="doorNumber" component="div" />
        </Grid>
        <Grid item xs={6}>
          <Field
            as={TextField}
            label="Street"
            name="Street"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage style={{ color: "red" }} name="Street" component="div" />
        </Grid>

        <Grid item xs={6}>
          <Field
            as={TextField}
            label="City"
            name="City"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage style={{ color: "red" }} name="City" component="div" />
        </Grid>
        <Grid item xs={6}>
          <Field
            as={TextField}
            label="State"
            name="State"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage style={{ color: "red" }} name="State" component="div" />
        </Grid>
        <Grid item xs={6}>
          <Field
            as={TextField}
            label="Pin code"
            name="PinCode"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage style={{ color: "red" }} name="PinCode" component="div" />
        </Grid>
        <Grid item xs={6}>
          <Field
            as={TextField}
            label="Referral Code"
            name="Referral"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage style={{ color: "red" }} name="Referral" component="div" />
        </Grid>

        <Grid item xs={12}>
          <Field
            as={TextField}
            label="PAN Number"
            name="PAN"
            type="PAN"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage style={{ color: "red" }} name="PAN" component="div" />
        </Grid>

      </Grid>
    </div>
  );
};

export default VerificationInfoStep;
