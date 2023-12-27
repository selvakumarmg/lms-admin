import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Box, Button, Link, Stack, Dialog, DialogTitle, CircularProgress, DialogContent, DialogActions, Typography, Stepper, Step, StepLabel, } from '@mui/material';

import PersonalInfoStep from '../../components/createBasicInfo';
import ContactInfoStep from '../../components/verificationInfo';
import Authentication from '../../components/Authentication';



import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';


const steps = ['Personal Information', 'Verification', "Authentication"];






const Page = () => {
  const router = useRouter();
  const auth = useAuth();


  const [activeStep, setActiveStep] = useState(0);
  const [activeStepFlag, setActiveStepFlag] = useState(false);
  const [activeFlag, setActiveFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)




  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };


  const getStepContent = (step, formikProps) => {
    // console.log("formikProps", formikProps)
    switch (step) {
      case 0:
        return <PersonalInfoStep formikProps={formikProps} setActiveFlag={setActiveFlag} setLoading={setLoading} />;
      case 1:
        return <ContactInfoStep formikProps={formikProps} />;
      default:
        return <Authentication formikProps={formikProps} />;
    }

  };






  const validate = (values) => {
    const errors = {};


    console.log("activeStep", activeStep)

    if (activeStep == 0) {

      setActiveFlag(false)



      if (!values.firstName) {
        errors.firstName = 'First Name is Required';
      }

      if (!values.lastName) {
        errors.lastName = 'Last Name is Required';
      }


      if (!values.email) {
        errors.email = 'Email Address isRequired';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone Number Required';
      } else if (!/^[0-9]{10}$/g.test(values.phoneNumber)) {
        errors.phoneNumber = 'Phone Number';

      }

      if (!values.otp) {
        errors.otp = 'OTP Required';
      } else if (values.otp && loading === false) {
        console.log("values.otqqqqqqqp", values.otp)
        alert("OTP Verified")

      }




      if ((values.firstName && values.lastName && values.phoneNumber && values.email && values.otp)) {
        setActiveStepFlag(true)
      } else {
        setActiveStepFlag(false)
      }

      // else if (activeStepFlag === true) {
      //   console.log("1111111")
      //   setActiveStep((prevStep) => prevStep + 1);
      // }




    }

    if (activeStep === 1) {
      setActiveStepFlag(false)
      setActiveFlag(false)
      if (!values.doorNumber) {
        errors.doorNumber = 'Door Number is Required';
      }
      if (!values.PAN) {
        errors.PAN = 'PAN Number is Required';
      }
      if (!values.PinCode) {
        errors.PinCode = 'Pin Code is Required';
      }
      if (!values.State) {
        errors.State = 'State is Required';
      }
      if (!values.City) {
        errors.City = 'City is Required';
      }
      if (!values.Street) {
        errors.Street = 'Street is Required';
      }

      if ((values.doorNumber && values.PAN && values.PinCode && values.State && values.City && values.Street)) {
        setActiveStepFlag(true)
        setActiveFlag(true)
      } else {
        setActiveStepFlag(false)
      }


    }

    if (activeStep === 2) {

      setActiveStepFlag(false)
      setActiveFlag(false)

      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required';
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match';
      }

      if (!values.agreedToTerms) {
        errors.agreedToTerms = 'Please Agree to the terms and conditions';
      }

      if ((values.password && values.confirmPassword && values.agreedToTerms)) {
        setActiveStepFlag(true)
        setActiveFlag(true)
      } else {
        setActiveStepFlag(false)
      }


    }

    return errors;
  };


  return (
    <>
      <Head>
        <title>
          Register
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: "-90px"
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                otp: "",
                doorNumber: "",
                PAN: "",
                PinCode: "",
                State: "",
                City: "",
                Street: "",
                password: '',
                confirmPassword: '',
                agreedToTerms: ""
              }}
              validate={validate}
              onSubmit={(values) => {
                // Handle form submission here
                handleOpen()
              }}
            >
              {({ isSubmitting }) => (
                <Form>

                  <div>

                  </div>
                  <Stepper activeStep={activeStep} alternativeLabel style={{ marginBottom: "1.5rem" }}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <div>
                    {getStepContent(activeStep)}

                    <div style={{ marginTop: "1rem" }}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} variant="contained" color="primary" style={{ marginRight: "1rem", width: "7rem" }}>
                          Back
                        </Button>
                      )}


                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ width: "7rem" }}
                        onClick={
                          activeStepFlag === true ? handleNext : null
                        }
                        disabled={!activeFlag}
                      >
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Success</DialogTitle>
              <DialogContent>
                <p>Please wait for admin approval.</p>
              </DialogContent>
              <DialogActions style={{ textAlign: "center" }}>
                <Button
                  href="/" onClick={handleClose} color="primary">
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>
      </Box >
      <div>
        {loading ? (
          <div style={{ position: "absolute", top: "20rem", left: "20rem" }}>
            <CircularProgress />
          </div>
        ) : (
          // Your main content goes here once loading is complete
          <div>

          </div>
        )}
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
