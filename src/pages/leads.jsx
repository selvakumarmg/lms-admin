import { useCallback, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { subDays, subHours } from 'date-fns'
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon'
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon'
import PlusIcon from '@heroicons/react/24/solid/PlusIcon'
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  CircularProgress,
} from '@mui/material'
import { useSelection } from 'src/hooks/use-selection'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout'
import { CustomersTable } from 'src/sections/customer/customers-table'
import { CustomersSearch } from 'src/sections/customer/customers-search'
import { applyPagination } from 'src/utils/apply-pagination'
import CreateLead from 'src/components/createLead'
import { CreateLeadApi, CreateAssetApi, getLeadApi } from '../action/apiActions'
import { useSelector, useDispatch } from 'react-redux'

import { useLead } from 'src/hooks/use-lead'
import { useLeadContext } from 'src/contexts/lead-context'
// import { data } from 'src/mockdata'
import CollapsibleTable from 'src/sections/customer/collapseRow'
import { message } from 'antd'

const now = new Date()

const Page = () => {
  // const { data } = useLeadContext();

  const [page, setPage] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(false)

  const [filteredData, setFilteredData] = useState(data)

  const LeadData = useLead()

  const profileData = useSelector(state => state.auth.authData)

  const handlePageChange = useCallback((event, value) => {
    setPage(value)
  }, [])

  const handleRowsPerPageChange = useCallback(event => {
    setRowsPerPage(event.target.value)
  }, [])

  useEffect(() => {
    getLeadApi(
      profileData[0]?.Profile_Status_Id,
      profileData[0]?.User_Id,
      profileData[0]?.User_Role_Id,
      setLoading
    ).then(res => {
      getResult(res)
    })
  }, [profileData])

  const getResult = res => {
    if (res?.statusCode === 200) {
      var resResult = res?.data?.map(data => {
        return {
          id: data?.Lead_Details_Id,
          firstName: data?.First_Name,
          lastName: data?.Last_Name,
          mobileNo: data?.Mobile_No,
          email: data?.Email,
          companyName: data?.Company_Name,
          salary: data?.Salary,
          doorNumber: data?.Salary,
          street: data?.Street,
          city: data?.City,
          state: data?.State,
          pincode: data?.Pincode,
          loanAmount: data?.Loan_Amount,
          bankName: data?.Bank_Name,
          loanType: data?.Loan_Type_Name,
          loanProcessStatus: data?.Loan_Process_Name,
          payslips:
            data?.assets !== null
              ? JSON.parse(data?.assets)
                  .filter(dd => dd?.payslips)
                  .map(payslips => payslips?.payslips)
              : 'null',
          aadharCard:
            data?.assets !== null
              ? JSON.parse(data?.assets)
                  .filter(dd => dd?.aadharCard)
                  .map(aadharCard => aadharCard?.aadharCard)
              : 'null',
          panCard:
            data?.assets !== null
              ? JSON.parse(data?.assets)
                  .filter(dd => dd?.panCard)
                  .map(panCard => panCard?.panCard)
              : 'null',
          bankStatement:
            data?.assets !== null
              ? JSON.parse(data?.assets)
                  .filter(dd => dd?.bankStatement)
                  .map(bankStatement => bankStatement?.bankStatement)
              : 'null',
        }
      })
    }

    setData(resResult?.reverse())
  }
  const handleSearch = query => {
    setSearchQuery(query)
  }

  const createLeadsData = leadData => {
    console.log('Leads', leadData)
    // data.push(leadData);
    // LeadData.LeadList(data.reverse());
  }

  const useCustomers = (page, rowsPerPage) => {
    return useMemo(() => {
      if (data) {
        return applyPagination(data, page, rowsPerPage)
      }
    }, [page, rowsPerPage, data])
  }

  const useCustomerIds = customers => {
    return useMemo(() => {
      if (data) {
        return customers.map(customer => customer.id)
      }
    }, [customers])
  }

  const customers = useCustomers(page, rowsPerPage)
  const customersIds = useCustomerIds(customers)
  const customersSelection = useSelection(customersIds)

  console.log('customers', customers)
  console.log('customersIds', customersIds)

  console.log('customersSelection', customersSelection)

  useEffect(() => {
    console.log('searchQuery', searchQuery)
    if (searchQuery) {
      setFilteredData(
        data?.filter(customer =>
          customer?.mobileNo
            ?.toLowerCase()
            ?.includes(searchQuery?.toLowerCase())
        )
      )
    } else {
      setFilteredData([])
    }
  }, [searchQuery])

  useEffect(() => {
    const data = []
    LeadData.LeadList(data)
  }, [])

  const convertImageToBase64 = (file, callback) => {
    const reader = new FileReader()

    reader.onload = function (event) {
      // `event.target.result` contains the Base64-encoded string
      const base64String = event?.target?.result?.split(',')[1]
      callback(base64String)
    }

    // Read the file as Data URL (Base64)
    reader.readAsDataURL(file)
  }

  const createLeadApiFn = LeadData => {
    setLoading(true)
    const apiData = {
      Bank_Id: LeadData?.bankName,
      City: LeadData?.city,
      Email: LeadData?.email,
      Company_Name: LeadData?.companyName,
      Company_Type_Id: 1,
      Door_no: LeadData?.doorNumber,
      First_Name: LeadData?.firstName,
      Generated_By: 'LeadData?',
      Generated_On: 'LeadData?',
      Generated_Partner: profileData[0]?.User_Id,
      Last_Name: LeadData?.lastName,
      Lead_Details_Id: 0,
      Lead_Status: 1,
      Loan_Amount: LeadData?.loanAmount,
      Loan_Process_Status_Id: LeadData?.loanProcessStatus,
      Loan_Type_Id: LeadData?.loanType,
      Mobile_No: LeadData?.mobileNo,
      Payslip_Image_Path: 'remove this',
      Pincode: LeadData?.pincode,
      Salary: LeadData?.salary,
      State: LeadData?.state,
      Street: LeadData?.street,
    }

    CreateLeadApi(apiData, setLoading).then(res => {
      console.log('ressss', res)
      if (res?.statusCode === 200) {
        message.success(res?.responseMessage)
        LeadData?.payslips.map((data, index) => {
          convertImageToBase64(data?.originFileObj, base64String => {
            const assetData = {
              Lead_detail_id: res?.lead_detail_id,
              Leads_asset_id: 0,
              asset_name: 'payslips',
              asset_path: 'test/image',
              asset_status: 1,
              leads_Image: base64String,
            }
            CreateAssetApi(assetData, setLoading).then(res => {
              if (index === 2) {
                if (res?.status === 'success') {
                  getLeadApi(
                    profileData[0]?.Profile_Status_Id,
                    profileData[0]?.User_Id,
                    profileData[0]?.User_Role_Id,
                    setLoading
                  ).then(res => {
                    getResult(res)
                  })
                  // message.success('Successfully Uploaded payslips')
                } else {
                  message.error('Failed Upload payslips')
                }
              }
            })
          })
        })

        convertImageToBase64(
          LeadData?.aadharCard[0]?.originFileObj,
          base64String => {
            const assetData = {
              Lead_detail_id: res?.lead_detail_id,
              Leads_asset_id: 0,
              asset_name: 'aadharCard',
              asset_path: 'test/image',
              asset_status: 1,
              leads_Image: base64String,
            }
            CreateAssetApi(assetData, setLoading).then(res => {
              if (res?.status === 'success') {
                // message.success('Successfully Uploaded Aadhar Card')
              } else {
                message.error('Failed Upload Aadhar Card')
              }
            })
          }
        )

        convertImageToBase64(
          LeadData?.bankStatement[0]?.originFileObj,
          base64String => {
            const assetData = {
              Lead_detail_id: res?.lead_detail_id,
              Leads_asset_id: 0,
              asset_name: 'bankStatement',
              asset_path: 'test/image',
              asset_status: 1,
              leads_Image: base64String,
            }
            CreateAssetApi(assetData, setLoading).then(res => {
              if (res?.status === 'success') {
                // message.success('Successfully Uploaded bank statement')
              } else {
                message.error('Failed Upload bank statement')
              }
            })
          }
        )

        convertImageToBase64(
          LeadData?.panCard[0]?.originFileObj,
          base64String => {
            const assetData = {
              Lead_detail_id: res?.lead_detail_id,
              Leads_asset_id: 0,
              asset_name: 'panCard',
              asset_path: 'test/image',
              asset_status: 1,
              leads_Image: base64String,
            }
            CreateAssetApi(assetData, setLoading).then(res => {
              if (res?.status === 'success') {
                message.success('Successfully Uploaded Required files')
                setOpenModal(false)
              } else {
                message.error('Failed Upload pan Card')
              }
              setLoading(false)
            })
          }
        )

        // CreateAssetApi(assetData, setLoading).then(res => {})
      } else {
        message.error('something went wrong please try again after sometime')
      }
    })
  }

  return (
    <>
      <Head>
        <title>Leads</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Leads</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={() => setOpenModal(!openModal)}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Create Lead
                </Button>
              </div>
            </Stack>
            <CustomersSearch
              data={customers}
              onSearch={handleSearch}
              placeholder="Search with Phone number"
            />
            <CreateLead
              open={openModal}
              onClose={() => setOpenModal(!openModal)}
              loading={loading}
              onSubmit={el => {
                createLeadApiFn(el)
              }}
            />
            <CollapsibleTable
              count={data?.length}
              leadData={filteredData?.length !== 0 ? filteredData : data}
              onDeselectAll={customersSelection?.handleDeselectAll}
              onDeselectOne={customersSelection?.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection?.handleSelectAll}
              onSelectOne={customersSelection?.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection?.selected}
            />
            {/* <LeadsTable
              count={data?.length}
              leads={filteredData?.length !== 0 ? filteredData : data}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            /> */}
          </Stack>
        </Container>
      </Box>
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
    </>
  )
}

Page.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default Page
