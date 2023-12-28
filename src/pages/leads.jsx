import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import { LeadsTable } from "src/sections/customer/leads-table";
import CreateLead from "src/components/createLead";

import { useLead } from "src/hooks/use-lead";
import { useLeadContext } from "src/contexts/lead-context";
import { data } from "src/mockdata";
import CollapsibleTable from "src/sections/customer/collapseRow";

const now = new Date();

const Page = () => {
  // const { data } = useLeadContext();

  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredData, setFilteredData] = useState(data);

  const LeadData = useLead();

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const createLeadsData = (leadData) => {
    console.log("Leads", leadData)
    // data.push(leadData);
    // LeadData.LeadList(data.reverse());
  };

  const useCustomers = (page, rowsPerPage) => {
    return useMemo(() => {
      if (data) {
        return applyPagination(data, page, rowsPerPage);
      }
    }, [page, rowsPerPage, data]);
  };

  const useCustomerIds = (customers) => {
    return useMemo(() => {
      if (data) {
        return customers.map((customer) => customer.id);
      }
    }, [customers]);
  };

  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  console.log("customers", customers);

  useEffect(() => {
    if (searchQuery) {
      setFilteredData(
        data?.filter((customer) =>
          customer?.mobileNo?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const data = [];
    LeadData.LeadList(data);
  }, []);

  console.log("filteredData", filteredData);

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
              onSubmit={(el) =>{ console.log("datas", el)}}
            />
            <CollapsibleTable leadData={filteredData?.length !== 0 ? filteredData : data} />
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
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
