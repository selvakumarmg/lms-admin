import PropTypes from "prop-types";
import * as React from 'react';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  SvgIcon,
  Collapse,
  IconButton
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"


const statusMap = {
  Procesing: "warning",
  Pending: "warning",
  Approved: "success",
  Decline: "error",
};

export const LeadsTable = (props) => {
  const {
    count = 0,
    leads = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;
  const [open, setOpen] = React.useState(false);

  // const selectedSome = selected.length > 0 && selected.length < leads.length;
  // const selectedAll = leads.length > 0 && selected.length === leads.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Loan Amount</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads?.map((lead) => {
                // const createdAt = format(lead.createdAt, "dd/MM/yyyy");

                return (
                  <React.Fragment>
                    <TableRow hover key={lead.mobileNo}>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen(!open)}
                        >
                          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell>{lead.firstName + " " + lead.lastName}</TableCell>
                      <TableCell>{lead.companyName}</TableCell>
                      <TableCell>{lead?.city}</TableCell>
                      <TableCell>{lead.mobileNo}</TableCell>
                      <TableCell>{lead.loanAmount}</TableCell>
                      <TableCell>{lead.salary}</TableCell>
                      <TableCell>
                        <SeverityPill color={statusMap[lead.loanProcessStatus]}>
                          {lead.loanProcessStatus}
                        </SeverityPill>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                              History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Date</TableCell>
                                  <TableCell>Customer</TableCell>
                                  <TableCell align="right">Amount</TableCell>
                                  <TableCell align="right">Total price ($)</TableCell>
                                </TableRow>
                              </TableHead>

                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

LeadsTable.propTypes = {
  count: PropTypes.number,
  leads: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
