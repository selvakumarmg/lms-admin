import Head from 'next/head'
import { subDays, subHours } from 'date-fns'
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout'
import { OverviewBudget } from 'src/sections/overview/overview-budget'
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders'
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products'
import { OverviewSales } from 'src/sections/overview/overview-sales'
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress'
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers'
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit'
import { OverviewTraffic } from 'src/sections/overview/overview-traffic'
import { useSelector, useDispatch } from 'react-redux'


const now = new Date()

const Page = () => {

  const tragetVal = useSelector(state => state.overView.setTarget)



  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 12,
        }}
      >
        <Container maxWidth="xl">
          <Grid container
            spacing={3}>
            <Grid xs={12}
              sm={9}
              lg={4}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: '100%' }}
                value={`₹ ${tragetVal}`}
              />
            </Grid>
            <Grid xs={12}
              sm={6}
              lg={4}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value="100"
              />
            </Grid>
            <Grid xs={12}
              sm={6}
              lg={4}>
              <OverviewTasksProgress sx={{ height: '100%' }}
                value={75.5} />
            </Grid>

            <Grid xs={12}
              lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: 'This year',
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: 'Last year',
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid xs={12}
              md={6}
              lg={4}>
              <OverviewTraffic
                chartSeries={[63, 15, 22]}
                labels={['Approved', 'Progress', 'Decline']}
                sx={{ height: '100%' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}


Page.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default Page
