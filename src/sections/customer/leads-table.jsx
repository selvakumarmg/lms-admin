import PropTypes from "prop-types";
import { format } from "date-fns";
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
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import EditIcon from "@heroicons/react/24/solid/ArrowRightIcon";

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
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

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
                  <TableRow hover key={lead.mobileNo}>
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
                    <TableCell>
                      <SvgIcon fontSize="small">
                        <EditIcon />
                      </SvgIcon>
                      
                    </TableCell>
                  </TableRow>
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
