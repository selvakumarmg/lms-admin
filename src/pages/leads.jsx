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
import {
  convertJsonToObject,
  convertJsonToObjectWithGrouping,
} from 'src/utils/helpers'

const now = new Date()

const Page = () => {
  // const { data } = useLeadContext();

  const [page, setPage] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(false)
  const [leadEditdata, setLeadEditdata] = useState([])
  const [imageData, setImagedata] = useState([])

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
      console.log("EffectData", res,profileData[0]?.User_Role_Id)
      getResult(res)
    })
  }, [])

  const getResult = res => {
    if (res?.statusCode === 200) {
      var resResult = res?.data?.map(data => {
        return {
          id: data?.Lead_Details_Id,
          firstName: data?.First_Name,
          lastName: data?.Last_Name,
          mobileNo: data?.Mobile_No,
          LoanProcessId: data?.Loan_Process_Status_Id,
          LoanTypeId: data?.Loan_Type_Id,
          BankId: data?.Bank_Id,
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
          bankStatement: data?.assets
            ? JSON.parse(data?.assets)
                .filter(filData => filData?.bankStatement)
                .map(data => data?.bankStatement)
            : [],
          panCard: data?.assets
            ? JSON.parse(data?.assets)
                .filter(filData => filData?.panCard)
                .map(data => data?.panCard)
            : [],
          aadharCard: data?.assets
            ? JSON.parse(data?.assets)
                .filter(filData => filData?.aadharCard)
                .map(data => data?.aadharCard)
            : [],
          payslips: data?.assets
            ? JSON.parse(data?.assets)
                .filter(filData => filData?.payslips)
                .map(data => data?.payslips)
            : [],
        }
      })
      console.log('resResult', data)
      setData(resResult?.reverse())
    } else {
      setData([])
    }
  }
  const handleSearch = query => {
    setSearchQuery(query)
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

  useEffect(() => {
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

  // useEffect(() => {
  //   const data = []
  //   LeadData.LeadList(data)
  // }, [])

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
  const imageUpload = async (data, type, LeadId, flag, id) => {
    await convertImageToBase64(data, base64String => {
      const assetData = {
        Lead_detail_id: LeadId,

        Leads_asset_id: 0,
        asset_name: type,
        asset_path: 'test/image',
        asset_status: 1,
        leads_Image: base64String,
      }
      const updateData = {
        Leads_asset_id: id,
        asset_name: type,
        leads_Image: base64String,
        asset_path: 'test/image',
        Lead_detail_id: LeadId,
      }
      CreateAssetApi(
        flag ? updateData : assetData,
        setLoading,
        flag ? 'put' : 'post'
      ).then(res => {
        if (res?.status === 'success') {
          // message.success('Successfully Uploaded payslips')
        } else {
          // message.error(`Failed Upload ${type}`)
        }
      })
    })
  }

  const getApiData = async (StatusId, UserId, RoleId, setLoading) => {
    await getLeadApi(StatusId, UserId, RoleId, setLoading).then(res => {
      getResult(res)
      setOpenModal(false)
    })
  }

  async function createLeadApiFn(LeadData) {
    setLoading(true)
    const apiData = {
      Bank_Id: LeadData?.bankName,
      City: LeadData?.city,
      Lead_Details_Id: LeadData?.id,
      Email: LeadData?.email,
      Company_Name: LeadData?.companyName,
      Company_Type_Id: 1,
      Door_no: LeadData?.doorNumber,
      First_Name: LeadData?.firstName,
      Generated_By: profileData[0]?.User_Id,
      Generated_On: '',
      Generated_Partner: profileData[0]?.User_Id,
      Last_Name: LeadData?.lastName,

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
      asset_name: '',
      asset_path: '',
      Leads_asset_id: '7',
    }

    await CreateLeadApi(
      apiData,
      setLoading,
      LeadData?.id ? 'put' : 'post'
    ).then(res => {
      setLoading(true)
      if (res?.status === 'success') {
        LeadData?.payslips.map((data, index) => {
          if (data?.originFileObj)
            imageUpload(
              data?.originFileObj,
              'payslips',
              res?.lead_detail_id,
              LeadData?.id,
              LeadData?.id ? imageData[0][index]?.split('#')[0] : 0
            )
        })

        if (LeadData?.aadharCard[0]?.originFileObj)
          imageUpload(
            LeadData?.aadharCard[0]?.originFileObj,
            'aadharCard',
            res?.lead_detail_id,
            LeadData?.id,
            LeadData?.id ? imageData[1][0]?.split('#')[0] : 0
          )
        if (LeadData?.bankStatement[0]?.originFileObj)
          imageUpload(
            LeadData?.bankStatement[0]?.originFileObj,
            'bankStatement',
            res?.lead_detail_id,
            LeadData?.id,
            LeadData?.id ? imageData[3][0]?.split('#')[0] : 0
          )
        if (LeadData?.panCard[0]?.originFileObj)
          imageUpload(
            LeadData?.panCard[0]?.originFileObj,
            'panCard',
            res?.lead_detail_id,
            LeadData?.id,
            LeadData?.id ? imageData[2][0]?.split('#')[0] : 0
          )
        setTimeout(() => {
          getApiData(
            profileData[0]?.Profile_Status_Id,
            profileData[0]?.User_Id,
            profileData[0]?.User_Role_Id,
            setLoading
          )
        }, [2000])
      } else {
        message.error('something went wrong please try again after sometime')
      }
    })
  }

  const editLeadDetails = data => {
    setOpenModal(true)
    setLeadEditdata(data)
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
                {/* <Stack alignItems="center" direction="row" spacing={1}>
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
                </Stack> */}
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
              onClose={() => {
                setOpenModal(!openModal)
                setLeadEditdata([])
              }}
              loading={loading}
              onSubmit={el => {
                createLeadApiFn(el)
              }}
              leadEditdata={leadEditdata}
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
              setImagedata={setImagedata}
              selected={customersSelection?.selected}
              editArea={editLeadDetails}
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
