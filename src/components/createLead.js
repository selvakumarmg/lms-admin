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
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
const { Dragger } = Upload;

const CreateLead = ({ open, onClose, onSubmit }) => {
  const [loanTypeVal, setLoanType] = useState("");

  const [dynamicSchema, setDynamicSchema] = React.useState(yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    mobileNo: yup.string().required('Mobile No is required').matches(/^\d{10}$/, 'Invalid mobile number'),
    companyName: yup.string().required('Company Name is required'),
    payslips: yup.array().min(3, 'You can only upload up to 3 files'),
    aadharCard: yup.array().min(1, 'You can only upload up to 1 file'),
    panCard: yup.array().min(1, 'You can only upload up to 1 file'),
    bankStatement: yup.array().min(1, 'You can only upload up to 1 file'),
    loanType: yup.string().required('Please select an option'),
    loanStatus: yup.string().required('Please select an option'),
    salary: yup.number().required('Salary is required').positive('Salary must be positive'),
    address: yup.object().shape({
      doorNumber: yup.string().required('Door Number is required'),
      street: yup.string().required('Street is required'),
      city: yup.string().required('City is required'),
      state: yup.string().required('State is required'),
      pincode: yup.number().required('Pin code is required').positive('Salary must be positive'),
    }),
    loanAmount: yup.number().required('Loan Amount is required').positive('Loan Amount must be positive'),
    bankName: yup.string().required('Bank Name is required'),
  }));

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(dynamicSchema),
    defaultValues: {},
  });

  React.useEffect(() => {
    reset({});
  }, [open, reset]);

  const handleFileUpload3 = (info) => {
    const { fileList } = info;

    if (fileList.length > 1) {
      fileList.splice(-1, 1);
      message.error('You can only upload up to 1 file');
    }

    setValue('bankStatement', fileList);
  };

  const handleFileUpload2 = (info) => {
    const { fileList } = info;

    if (fileList.length > 1) {
      fileList.splice(-1, 1);
      message.error('You can only upload up to 1 file');
    }

    setValue('panCard', fileList);
  };

  const handleFileUpload1 = (info) => {
    const { fileList } = info;

    if (fileList.length > 1) {
      fileList.splice(-1, 1);
      message.error('You can only upload up to 1 file');
    }

    setValue('aadharCard', fileList);
  };

  const handleFileUpload = (info) => {
    const { fileList } = info;

    if (fileList.length > 3) {
      fileList.splice(-1, 1);
      message.error('You can only upload up to 3 files');
    }

    setValue('payslips', fileList);
  };

  const handleLoanTypeChange = (event) => {
    setLoanType(event.target.dataset.value);
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
    onClose();
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
                  <TextField style={{margin:'5px',marginTop:'20px',margin:'5px'}} {...field} label="First Name" error={!!errors.firstName} helperText={errors.firstName?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField style={{margin:'5px',marginTop:'20px'}} {...field} label="Last Name" error={!!errors.lastName} helperText={errors.lastName?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="mobileNo"
                control={control}
                render={({ field }) => (
                  <TextField style={{margin:'5px'}} {...field} label="Mobile No" error={!!errors.mobileNo} helperText={errors.mobileNo?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <TextField style={{margin:'5px'}} {...field} label="Company Name" error={!!errors.companyName} helperText={errors.companyName?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <TextField style={{margin:'5px'}} {...field} label="Salary" error={!!errors.salary} helperText={errors.salary?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address.doorNumber"
                control={control}
                render={({ field }) => (
                  <TextField style={{margin:'5px'}} {...field} label="Door Number" error={!!errors.address?.doorNumber} helperText={errors.address?.doorNumber?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="address.street"
                control={control}
                render={({ field }) => (
                  <TextField style={{margin:'5px'}} {...field} label="Street" error={!!errors.address?.street} helperText={errors.address?.street?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="address.city"
                control={control}
                render={({ field }) => (
                  <TextField style={{margin:'5px'}} {...field} label="City" error={!!errors.address?.city} helperText={errors.address?.city?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                  <TextField style={{margin:'5px'}} {...field} label="State" error={!!errors.address?.state} helperText={errors.address?.state?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="address.pincode"
                control={control}
                render={({ field }) => (
                  <TextField style={{margin:'5px'}} {...field} label="Pin code" error={!!errors.address?.pincode} helperText={errors.address?.pincode?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="loanAmount"
                control={control}
                render={({ field }) => (
                  <TextField style={{margin:'5px'}} {...field} label="Loan Amount" error={!!errors.loanAmount} helperText={errors.loanAmount?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="bankName"
                control={control}
                render={({ field }) => (
                  <TextField style={{margin:'5px'}} {...field} label="Bank Name" error={!!errors.bankName} helperText={errors.bankName?.message} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="loanType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl style={{margin:'5px'}} fullWidth error={!!errors.loanType}>
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
                    <TextField style={{margin:'5px'}} {...field} label="Others" error={!!errors.Others} helperText={errors.Others?.message} fullWidth />
                  )}
                />
              </Grid>}
            <Grid item xs={6}>
              <Controller
                name="loanStatus"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl style={{margin:'5px'}} fullWidth error={!!errors.loanStatus}>
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
                name="payslips"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <div>
                    <Dragger
                    style={{margin:'5px'}}
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
                    {errors.payslips && <FormHelperText error>{errors.payslips?.message}</FormHelperText>}
                  </div>


                )}
              />
            </Grid>
            <Grid item xs={12}>
              {/* File upload for bankStatement */}
              <Controller
                name="bankStatement"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <div>
                    <Dragger
                      {...field}
                      style={{margin:'5px'}}
                      onChange={handleFileUpload3}
                      beforeUpload={() => false}
                      fileList={field.value}
                      multiple
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag file to upload  Bank Statement</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Dragger>
                    {errors.bankStatement && <FormHelperText error>{errors.bankStatement?.message}</FormHelperText>}
                  </div>


                )}
              />
            </Grid>
            <Grid item xs={12}>
              {/* File upload for aadharCard */}
              <Controller
                name="bankStatement"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <div>
                    <Dragger
                      {...field}
                      style={{margin:'5px'}}
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
                    {errors.aadharCard && <FormHelperText error>{errors.aadharCard?.message}</FormHelperText>}
                  </div>


                )}
              />
            </Grid>
            <Grid item xs={12}>
              {/* File upload for pancard */}
              <Controller
                name="panCard"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <div>
                    <Dragger
                      {...field}
                      style={{margin:'5px'}}
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
                    {errors.panCard && <FormHelperText error>{errors.panCard?.message}</FormHelperText>}
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


export default CreateLead;




