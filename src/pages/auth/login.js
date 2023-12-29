import { useCallback, useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { useAuth } from 'src/hooks/use-auth'
import { Layout as AuthLayout } from 'src/layouts/auth/layout'
import { LoginApi } from '../../action/apiActions'

const Page = () => {
  const router = useRouter()
  const auth = useAuth()
  const [method, setMethod] = useState('email')
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (values.email && values.password) {
          const loginData = {
            password: values.password,

            username: values.email,
          }
          LoginApi(loginData).then(res => {
            if (res?.length > 0) {
              auth.signIn(res[0]?.user_role)
              router.push('/')
            } else {
              helpers.setErrors({ submit: 'User Not Found In Database' })
            }
          })
        } else {
          helpers.setErrors({ submit: 'Please check your email and password' })
        }
      } catch (err) {
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        helpers.setSubmitting(false)
      }
    },
  })

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value)
  }, [])

  const handleSkip = useCallback(() => {
    auth.skip()
    router.push('/')
  }, [auth, router])

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%',
          }}
        >
          <div>
            <Stack spacing={1}
sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary"
variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <form noValidate
onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error"
sx={{ mt: 3 }}
variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
              <Alert color="primary"
severity="info"
sx={{ mt: 3 }}>
                <div>
                  <span>
                    Partner - You can use <b>raj1@gmail.com</b> and password{' '}
                    <b>raj1@123</b>
                  </span>
                  {'\n'}
                </div>
                <div>
                  <span>
                    Telecaller - You can use <b>tellecaller@gmail.com</b> and
                    password <b>tellecaller</b>
                  </span>
                </div>
              </Alert>
            </form>
          </div>
        </Box>
      </Box>
    </>
  )
}

Page.getLayout = page => <AuthLayout>{page}</AuthLayout>

export default Page
