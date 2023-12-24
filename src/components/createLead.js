import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  loanAmount: yup.number().required('Loan Amount is required').positive('Loan Amount must be positive'),
  salaryAmount: yup.number().required('Salary Amount is required').positive('Salary Amount must be positive'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  loanStatus: yup.string().required('Loan Status is required'),
  streetName: yup.string().required('Street Name is required'),
  city: yup.string().required('City is required'),
  pincode: yup.string().required('Pincode is required'),
});

const CreateLead = ({ open, onClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSaveCustomer = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Customer</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleSaveCustomer)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Name" error={!!errors.name} helperText={errors.name?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="loanAmount"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Loan Amount" error={!!errors.loanAmount} helperText={errors.loanAmount?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="salaryAmount"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Salary Amount" error={!!errors.salaryAmount} helperText={errors.salaryAmount?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Email" error={!!errors.email} helperText={errors.email?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Phone" error={!!errors.phone} helperText={errors.phone?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="loanStatus"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Loan Status" error={!!errors.loanStatus} helperText={errors.loanStatus?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="streetName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Street Name" error={!!errors.streetName} helperText={errors.streetName?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="City" error={!!errors.city} helperText={errors.city?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="pincode"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Pincode" error={!!errors.pincode} helperText={errors.pincode?.message} fullWidth />
                )}
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLead;
