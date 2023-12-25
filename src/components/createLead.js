import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import Dropzone from 'react-dropzone';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Input, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';


const { Dragger } = Upload;


const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  mobileNo: yup.string().required('Mobile No is required'),
  companyName: yup.string().required('Company Name is required'),
  // Others: yup.string().required('Others is required'),
  files: yup.array().min(3, 'You can only upload up to 3 files'),
  files1: yup.array().min(1, 'You can only upload up to 1 files'),

  files2: yup.array().min(1, 'You can only upload up to 1 files'),
  files3: yup.array().min(1, 'You can only upload up to 1 files'),

  loanType: yup.string().required('Please select an option'),
  loanStatus: yup.string().required('Please select an option'),
  salary: yup.number().required('Salary is required').positive('Salary must be positive'),
  address: yup.object().shape({
    doorNumber: yup.string().required('Door Number is required'),
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    pincode: yup.string().required('Pin code is required'),
  }),
  loanAmount: yup.number().required('Loan Amount is required').positive('Loan Amount must be positive'),
  bankName: yup.string().required('Bank Name is required'),
  // loanType: yup.string().required('Loan Type is required'),

});

const MyForm = ({ open, onClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue, setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loanTypeVal, setLoanType] = useState("");

  const handleFileUpload3 = (info) => {
    // Limit the number of files to 3
    const { file, fileList } = info;

    if (fileList.length > 1) {
      fileList.splice(-1, 1); // Remove the last file if more than 3
      message.error('You can only upload up to 1 files');
    }

    // Update the form value
    setValue('files3', fileList);

    // Handle other file upload logic if needed
  };
  const handleFileUpload2 = (info) => {
    // Limit the number of files to 3
    const { file, fileList } = info;

    if (fileList.length > 1) {
      fileList.splice(-1, 1); // Remove the last file if more than 3
      message.error('You can only upload up to 1 files');
    }

    // Update the form value
    setValue('files2', fileList);

    // Handle other file upload logic if needed
  };
  const handleFileUpload1 = (info) => {
    // Limit the number of files to 3
    const { file, fileList } = info;

    if (fileList.length > 1) {
      fileList.splice(-1, 1); // Remove the last file if more than 3
      message.error('You can only upload up to 1 files');
    }

    // Update the form value
    setValue('files1', fileList);

    // Handle other file upload logic if needed
  };

  const handleFileUpload = (info) => {
    // Limit the number of files to 3
    const { file, fileList } = info;

    if (fileList.length > 3) {
      fileList.splice(-1, 1); // Remove the last file if more than 3
      message.error('You can only upload up to 3 files');
    }

    // Update the form value
    setValue('files', fileList);

    // Handle other file upload logic if needed
  };

  const handleLoanTypeChange = (event) => {
    // Handle loan type change logic here
    console.log(event.target.dataset.value);

    setLoanType(event.target.dataset.value)

  };

  const handleFormSubmit = (data) => {
    // Perform form submission logic here

    onSubmit(data);
    onClose();
  };





  const customRequest = async ({ onSuccess, onError, file }) => {
    // Custom request logic, e.g., upload file to server

    // For demonstration purposes, simulate an upload delay
    setTimeout(() => {
      // Mock success
      onSuccess();

      // Mock error
      // onError(new Error("Upload failed"));
    }, 1000);
  };



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Customer</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="First Name" error={!!errors.firstName} helperText={errors.firstName?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Last Name" error={!!errors.lastName} helperText={errors.lastName?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="mobileNo"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Mobile No" error={!!errors.mobileNo} helperText={errors.mobileNo?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Company Name" error={!!errors.companyName} helperText={errors.companyName?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Salary" error={!!errors.salary} helperText={errors.salary?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address.doorNumber"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Door Number" error={!!errors.address?.doorNumber} helperText={errors.address?.doorNumber?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="address.street"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Street" error={!!errors.address?.street} helperText={errors.address?.street?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="address.city"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="City" error={!!errors.address?.city} helperText={errors.address?.city?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="State" error={!!errors.address?.state} helperText={errors.address?.state?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="address.pincode"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Pin code" error={!!errors.address?.pincode} helperText={errors.address?.pincode?.message} fullWidth />
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
                name="bankName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Bank Name" error={!!errors.bankName} helperText={errors.bankName?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="loanType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.loanType}>
                    <InputLabel>Loan Type</InputLabel>
                    <Select {...field} onClick={handleLoanTypeChange}>
                      <MenuItem value="Personal Loan">Personal Loan</MenuItem>
                      <MenuItem value="Business Loan">Business Loan</MenuItem>
                      <MenuItem value="House Loan">House Loan</MenuItem>
                      <MenuItem value="Loan Against Property">Loan Against Property</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>
                    {errors.loanType && <FormHelperText error>{errors.loanType?.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>
            {loanTypeVal === "Others" &&
              <Grid item xs={6}>
                <Controller
                  name="Others"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Others" error={!!errors.Others} helperText={errors.Others?.message} fullWidth />
                  )}
                />
              </Grid>}
            <Grid item xs={6}>
              <Controller
                name="loanStatus"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.loanStatus}>
                    <InputLabel>Loan Process Status</InputLabel>
                    <Select {...field} >
                      <MenuItem value="Fresh">Fresh</MenuItem>
                      <MenuItem value="Top Up">Top Up</MenuItem>
                      <MenuItem value="Balance Transfer">House Loan</MenuItem>

                    </Select>
                    {errors.loanStatus && <FormHelperText error>{errors.loanStatus?.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="files"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <div>
                    <Dragger
                      {...field}
                      onChange={handleFileUpload}
                      beforeUpload={() => false} // Prevent default upload behavior
                      fileList={field.value}
                      multiple
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag file to upload Payslip</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Dragger>
                    {errors.files && <FormHelperText error>{errors.files?.message}</FormHelperText>}
                  </div>


                )}
              />


              {/* File upload for payslip */}

            </Grid>
            <Grid item xs={12}>
              {/* File upload for payslip */}
              <Controller
                name="files3"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <div>
                    <Dragger
                      {...field}
                      onChange={handleFileUpload3}
                      beforeUpload={() => false} // Prevent default upload behavior
                      fileList={field.value}
                      multiple
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag file to upload  Bank Statement</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Dragger>
                    {errors.files1 && <FormHelperText error>{errors.files1?.message}</FormHelperText>}
                  </div>


                )}
              />
            </Grid>
            <Grid item xs={12}>
              {/* File upload for payslip */}
              <Controller
                name="files1"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <div>
                    <Dragger
                      {...field}
                      onChange={handleFileUpload1}
                      beforeUpload={() => false} // Prevent default upload behavior
                      fileList={field.value}
                      multiple
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag file to upload Aadhaar Card</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Dragger>
                    {errors.files1 && <FormHelperText error>{errors.files1?.message}</FormHelperText>}
                  </div>


                )}
              />
            </Grid>
            <Grid item xs={12}>
              {/* File upload for payslip */}
              <Controller
                name="files2"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <div>
                    <Dragger
                      {...field}
                      onChange={handleFileUpload2}
                      beforeUpload={() => false} // Prevent default upload behavior
                      fileList={field.value}
                      multiple
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag file to upload Pan Card</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Dragger>
                    {errors.files2 && <FormHelperText error>{errors.files2?.message}</FormHelperText>}
                  </div>


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
        </form >
      </DialogContent >
    </Dialog >
  )
}


export default MyForm;




