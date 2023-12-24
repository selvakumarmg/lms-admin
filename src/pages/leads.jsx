import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { LeadsTable } from 'src/sections/customer/leads-table';
import CreateLead from 'src/components/createLead';

const now = new Date();

const data = [
    { id: 1, name: "John Doe", loanAmount: 5000, salaryAmount: 60000, email: "john.doe@example.com", phone: "123-456-7890", loanStatus: "approved", address: { streetName: "123 Main Street", city: "Anytown", pincode: "12345" }, createdAt: new Date() },
    { id: 2, name: "Jane Smith", loanAmount: 7000, salaryAmount: 75000, email: "jane.smith@example.com", phone: "987-654-3210", loanStatus: "pending", address: { streetName: "456 Oak Avenue", city: "Someville", pincode: "67890" }, createdAt: new Date() },
    ...Array(10).fill(null).map((_, index) => ({ id: index + 3, name: `Dummy${index + 1}`, loanAmount: Math.floor(Math.random() * 10000) + 1000, salaryAmount: Math.floor(Math.random() * 90000) + 10000, email: `dummy${index + 1}@example.com`, phone: `555-555-${index.toString().padStart(2, '0')}`, loanStatus: index % 2 === 0 ? "Approved" : "Decline", address: { streetName: `${index + 100} Elm Street`, city: "Dummyville", pincode: `${index + 10000}` }, createdAt: new Date() }))
];



const useCustomers = (page, rowsPerPage) => {
    return useMemo(
        () => {
            return applyPagination(data, page, rowsPerPage);
        },
        [page, rowsPerPage]
    );
};

const useCustomerIds = (customers) => {
    return useMemo(
        () => {
            return customers.map((customer) => customer.id);
        },
        [customers]
    );
};

const Page = () => {
    const [page, setPage] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const customers = useCustomers(page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const customersSelection = useSelection(customersIds);

    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
        },
        []
    );

    const handleRowsPerPageChange = useCallback(
        (event) => {
            setRowsPerPage(event.target.value);
        },
        []
    );

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredData = customers.filter((customer) =>
        customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Head>
                <title>
                    Leads
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Leads
                                </Typography>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}
                                >
                                    <Button
                                        color="inherit"
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowUpOnSquareIcon />
                                            </SvgIcon>
                                        )}
                                    >
                                        Import
                                    </Button>
                                    <Button
                                        color="inherit"
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowDownOnSquareIcon />
                                            </SvgIcon>
                                        )}
                                    >
                                        Export
                                    </Button>
                                </Stack>
                            </Stack>
                            <div>
                                <Button
                                    onClick={() => setOpenModal(!openModal)}
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                >
                                    Create Lead
                                </Button>
                            </div>
                        </Stack>
                        <CustomersSearch data={customers} onSearch={handleSearch} placeholder='Search with Phone number' />
                        <CreateLead open={openModal} onClose={() => setOpenModal(!openModal)} onSubmit={(el) => console.log("datas", el)} />
                        <LeadsTable
                            count={data.length}
                            leads={filteredData}
                            onDeselectAll={customersSelection.handleDeselectAll}
                            onDeselectOne={customersSelection.handleDeselectOne}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectAll={customersSelection.handleSelectAll}
                            onSelectOne={customersSelection.handleSelectOne}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            selected={customersSelection.selected}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
