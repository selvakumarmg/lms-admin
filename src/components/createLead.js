import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
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
  CircularProgress
} from '@mui/material'
import { Upload, message, Form as AntForm } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import * as Yup from 'yup'
import { loanStatusOptions, loanType, bankNameList } from 'src/mockdata'

const { Dragger } = Upload

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid mobile number')
    .required('Mobile No is required'),
  email: Yup.string()
    .matches(emailRegex, 'Invalid email address')
    .required('Email is required'),
  companyName: Yup.string().required('Company Name is required'),
  salary: Yup.number()
    .positive('Salary must be a positive number')
    .required('Salary is required'),
  doorNumber: Yup.string().required('Door number is required'),
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string().required('Pin Code is required'),
  loanAmount: Yup.number()
    .positive('Loan Amount must be a positive number')
    .required('Loan Amount is required'),
  bankName: Yup.string().required('Bank Name is required'),
  loanType: Yup.string().required('Loan Type is required'),
  loanTypeOther: Yup.string().when('loanType', {
    is: 'Others',
    then: Yup.string().required('Please specify the loan type'),
  }),
  loanStatus: Yup.string().required('Loan Process Status is required'),
  payslips: Yup.mixed().required('Payslip Upload is required'),
  aadharCard: Yup.mixed().required('Payslip Upload is required'),

  panCard: Yup.mixed().required('Payslip Upload is required'),

  bankStatement: Yup.mixed().required('Payslip Upload is required'),

  // aadharCard: Yup.mixed()
  //   .test(
  //     'fileSize',
  //     'File size is too large',
  //     value => value && value.size <= 2 * 1024 * 1024
  //   ) // 2MB limit
  //   .test(
  //     'fileType',
  //     'Unsupported file type',
  //     value =>
  //       value &&
  //       ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)
  //   )
  //   .required('Aadhar Card is required'),
  // panCard: Yup.mixed()
  //   .test(
  //     'fileSize',
  //     'File size is too large',
  //     value => value && value.size <= 5 * 1024 * 1024
  //   ) // 5MB limit
  //   .test(
  //     'fileType',
  //     'Unsupported file type',
  //     value =>
  //       value &&
  //       ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)
  //   )
  //   .required('PAN Card is required'),
  // bankStatement: Yup.mixed()
  //   .test(
  //     'fileSize',
  //     'File size is too large',
  //     value => value && value.size <= 5 * 1024 * 1024
  //   ) // 5MB limit
  //   .test(
  //     'fileType',
  //     'Unsupported file type',
  //     value =>
  //       value &&
  //       ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)
  //   )
  //   .required('Bank Statement is required'),
})

const CreateLead = ({ open, onClose, loading, onSubmit }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    companyName: '',
    salary: '',
    doorNumber: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    loanAmount: '',
    bankName: '',
    loanType: '',
    loanProcessStatus: '',
    payslips: [],
    aadharCard: [],
    panCard: [],
    bankStatement: [],
  }




  const handlePayslipUpload = (info, setFieldValue) => {
    const { fileList } = info

    if (fileList.length > 3) {
      fileList.splice(-1, 1)
      message.error('You can only upload up to 3 files')
    }

    setFieldValue('payslips', fileList)
  }

  const handleAadharCardUpload = (info, setFieldValue) => {
    const { fileList } = info

    if (fileList.length > 1) {
      fileList.splice(-1, 1)
      message.error('You can only upload one file')
    }

    console.log("fileList", fileList)

    setFieldValue('aadharCard', fileList)
  }

  const handleBankStatementUpload = (info, setFieldValue) => {
    const { fileList } = info

    if (fileList.length > 1) {
      fileList.splice(-1, 1)
      message.error('You can only upload one file')
    }

    setFieldValue('bankStatement', fileList)
  }

  const handlePancardUpload = (info, setFieldValue) => {
    const { fileList } = info

    if (fileList.length > 1) {
      fileList.splice(-1, 1)
      message.error('You can only upload one file')
    }

    setFieldValue('panCard', fileList)
  }

  return (
    <div>
      <Dialog open={open}
        onClose={onClose}>
        <DialogTitle>Create Lead</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <Form style={{ marginTop: 20 }}
                onSubmit={handleSubmit}>
                <Grid style={{ marginTop: 10 }}
                  container
                  spacing={2}>
                  <Grid item
                    xs={6}>
                    <Field
                      type="text"
                      name="firstName"
                      label="First Name"
                      as={TextField}
                      fullWidth
                    />
                    <FormHelperText error>{errors.firstName}</FormHelperText>
                  </Grid>
                  <Grid item
                    xs={6}>
                    <Field
                      type="text"
                      name="lastName"
                      label="Last Name"
                      as={TextField}
                      fullWidth
                    />
                    <FormHelperText error>{errors.lastName}</FormHelperText>
                  </Grid>
                </Grid>
                <Grid style={{ marginTop: 10 }}
                  container
                  spacing={2}>
                  <Grid item
                    xs={6}>
                    <Field
                      type="text"
                      name="email"
                      label="Email"
                      as={TextField}
                      fullWidth
                    />
                    <FormHelperText error>{errors.email}</FormHelperText>
                  </Grid>
                  <Grid item
                    xs={6}>
                    <Field
                      type="text"
                      name="mobileNo"
                      label="Mobile No"
                      as={TextField}
                      fullWidth
                    />
                    <FormHelperText error>{errors.mobileNo}</FormHelperText>
                  </Grid>
                </Grid>
                <Grid style={{ marginTop: 10 }}
                  container
                  spacing={2}>
                  <Grid item
                    xs={6}>
                    <Field
                      type="text"
                      name="companyName"
                      label="Company Name"
                      as={TextField}
                      fullWidth
                    />
                    <FormHelperText error>{errors.companyName}</FormHelperText>
                  </Grid>
                  <Grid item
                    xs={6}>
                    <Field
                      type="text"
                      name="salary"
                      label="Salary"
                      as={TextField}
                      fullWidth
                    />
                    <FormHelperText error>{errors.salary}</FormHelperText>
                  </Grid>
                </Grid>
                <Grid style={{ marginTop: 10 }}
                  container
                  spacing={2}>
                  <Grid item
                    xs={6}>
                    <Field
                      type="text"
                      name="doorNumber"
                      label="Door No"
                      as={TextField}
                      fullWidth
                    />
                    <FormHelperText error>{errors.doorNumber}</FormHelperText>
                  </Grid>
                  <Grid item
                    xs={6}>
                    <Field
                      type="text"
                      name="street"
                      label="Street"
                      as={TextField}
                      fullWidth
                    />
                    <FormHelperText error>{errors.street}</FormHelperText>
                  </Grid>

                </Grid>
                <Grid style={{ marginTop: 10 }}
                  container
                  spacing={2}>
                  <Grid item
                    xs={6}>
                    <Field
                      type="text"
                      name="city"
                      label="city"
                      as={TextField}
                      fullWidth
                    />
                    <FormHelperText error>{errors.city}</FormHelperText>
                  </Grid>
                  <Grid item
                    xs={6}>
                    <Field
                      type="text"
                      name="state"
                      label="State"
                      as={TextField}
                      fullWidth
                    />
                    <FormHelperText error>{errors.state}</FormHelperText>
                  </Grid>

                </Grid>
                <Grid style={{ marginTop: 10 }}
                  container
                  spacing={2}>
                  <Grid item
                    xs={6}>
                    <Field
                      type="text"
                      name="pincode"
                      label="Pincode"
                      as={TextField}
                      fullWidth
                    />
                    <FormHelperText error>{errors.pincode}</FormHelperText>
                  </Grid>
                  <Grid item
                    xs={6}>
                    <Field
                      type="text"
                      name="loanAmount"
                      label="Loan Amount"
                      as={TextField}
                      fullWidth
                    />
                    <FormHelperText error>{errors.loanAmount}</FormHelperText>
                  </Grid>

                </Grid>
                <Grid style={{ marginTop: 10 }}
                  container
                  spacing={2}>
                  <Grid item
                    xs={6}>
                    <FormControl
                      fullWidth
                      error={touched.bankName && !!errors.bankName}
                    >
                      <InputLabel>Bank Name</InputLabel>
                      <Field
                        as={Select}

                        name="bankName"
                        value={values.bankName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value="">Select</MenuItem>
                        {bankNameList.map(option => (
                          <MenuItem key={option.value}
                            value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                      {touched.bankName && errors.bankName && (
                        <FormHelperText>{errors.bankName}</FormHelperText>
                      )}
                    </FormControl>

                  </Grid>
                  <Grid item
                    xs={6}>
                    <FormControl
                      fullWidth
                      error={touched.loanType && !!errors.loanType}
                    >
                      <InputLabel>Loan Type</InputLabel>
                      <Field
                        as={Select}
                        name="loanType"
                        value={values.loanType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value="">Select</MenuItem>
                        {loanType.map(option => (
                          <MenuItem key={option.value}
                            value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                      {touched.loanType && errors.loanType && (
                        <FormHelperText>{errors.loanType}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                </Grid>
                <Grid style={{ marginTop: 10 }}
                  container
                  spacing={2}>
                  <Grid item
                    xs={6}>
                    <FormControl
                      fullWidth
                      error={touched.loanStatus && !!errors.loanStatus}
                    >
                      <InputLabel>Loan Process Status</InputLabel>
                      <Field
                        as={Select}
                        name="loanStatus"
                        value={values.loanStatus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value="">Select</MenuItem>
                        {loanStatusOptions.map(option => (
                          <MenuItem key={option.value}
                            value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                      {touched.loanStatus && errors.loanStatus && (
                        <FormHelperText error>
                          {errors.loanStatus?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid style={{ marginTop: 10 }}
                  container
                  spacing={2}>
                  <Grid item
                    xs={12}>
                    <AntForm.Item
                      validateStatus={
                        touched.payslips && errors.payslips ? 'error' : ''
                      }
                      help={touched.payslips && errors.payslips}
                    >
                      <Field
                        name="payslips"
                        render={({ field }) => (
                          <Dragger
                            {...field}
                            beforeUpload={() => false} // Prevent default upload behavior
                            onChange={info =>
                              handlePayslipUpload(info, setFieldValue)
                            }
                            fileList={values.payslips}
                            multiple
                          >
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                              Click or drag files to upload Payslips
                            </p>
                            <p className="ant-upload-hint">
                              Support for multiple file uploads (PDF, JPEG, PNG).
                            </p>
                          </Dragger>
                        )}
                      />
                    </AntForm.Item>
                  </Grid>
                </Grid>
                <Grid style={{ marginTop: 10 }}
                  container
                  spacing={2}>
                  <Grid item
                    xs={12}>
                    <AntForm.Item
                      validateStatus={
                        touched.aadharCard && errors.aadharCard ? 'error' : ''
                      }
                      help={touched.aadharCard && errors.aadharCard}
                    >
                      <Field
                        name="aadharCard"
                        render={({ field }) => (
                          <Dragger
                            {...field}
                            beforeUpload={() => false} // Prevent default upload behavior
                            onChange={info =>
                              handleAadharCardUpload(info, setFieldValue)
                            }
                            fileList={values.aadharCard}


                            showUploadList={{ showDownloadIcon: false }}
                          >
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                              Click or drag file to upload Aadhar Card
                            </p>
                            <p className="ant-upload-hint">
                              Support for a single file upload (PDF, JPEG, PNG).
                            </p>
                          </Dragger>
                        )}
                      />
                    </AntForm.Item>
                  </Grid>
                </Grid>
                <Grid style={{ marginTop: 10 }}
                  container
                  spacing={2}>
                  <Grid item
                    xs={12}>
                    <AntForm.Item
                      validateStatus={
                        touched.panCard && errors.panCard ? 'error' : ''
                      }
                      help={touched.panCard && errors.panCard}
                    >
                      <Field
                        name="panCard"
                        render={({ field }) => (
                          <Dragger
                            {...field}
                            beforeUpload={() => false} // Prevent default upload behavior
                            onChange={info =>
                              handlePancardUpload(info, setFieldValue)
                            }
                            fileList={values.panCard}

                          // showUploadList={{ showDownloadIcon: false }}
                          >
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                              Click or drag file to upload PAN Card
                            </p>
                            <p className="ant-upload-hint">
                              Support for a single file upload (PDF, JPEG, PNG).
                            </p>
                          </Dragger>
                        )}
                      />
                    </AntForm.Item>
                  </Grid>
                </Grid>
                <Grid style={{ marginTop: 10 }}
                  container
                  spacing={2}>
                  <Grid item
                    xs={12}>
                    <AntForm.Item
                      validateStatus={
                        touched.bankStatement && errors.bankStatement
                          ? 'error'
                          : ''
                      }
                      help={touched.bankStatement && errors.bankStatement}
                    >
                      <Field
                        name="bankStatement"
                        render={({ field }) => (
                          <Dragger
                            {...field}
                            beforeUpload={() => false} // Prevent default upload behavior
                            onChange={info =>
                              handleBankStatementUpload(info, setFieldValue)
                            }
                            fileList={
                              values.bankStatement
                            }
                          // showUploadList={{ showDownloadIcon: false }}
                          >
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                              Click or drag file to upload Bank Statement (last 6
                              months)
                            </p>
                            <p className="ant-upload-hint">
                              Support for a single file upload (PDF, JPEG, PNG).
                            </p>
                          </Dragger>
                        )}
                      />
                    </AntForm.Item>
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button type="submit"
                    variant="contained"
                    color="primary">
                    Save
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
          <div>
            {loading ? (
              <div style={{ position: 'absolute', top: '20rem', left: '15rem' }}>
                <CircularProgress />
              </div>
            ) : (
              // Your main content goes here once loading is complete
              <div></div>
            )}
          </div>
        </DialogContent>
      </Dialog>

    </div>


  )
}

export default CreateLead
