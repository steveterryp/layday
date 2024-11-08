import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Check as ApproveIcon,
  Close as RejectIcon,
  Search as SearchIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { LeaveRequest, LeaveStatus, LeaveType } from '../../types/common';

// Mock data
const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    type: LeaveType.VACATION,
    startDate: '2023-09-20',
    endDate: '2023-09-25',
    status: LeaveStatus.PENDING,
    reason: 'Family vacation',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    type: LeaveType.SICK,
    startDate: '2023-09-12',
    endDate: '2023-09-13',
    status: LeaveStatus.APPROVED,
    reason: 'Doctor appointment',
    approvedBy: 'MGR001',
    approvedAt: '2023-09-11T10:00:00',
  },
  {
    id: '3',
    employeeId: 'EMP003',
    type: LeaveType.PERSONAL,
    startDate: '2023-09-15',
    endDate: '2023-09-15',
    status: LeaveStatus.REJECTED,
    reason: 'Personal errands',
    approvedBy: 'MGR001',
    approvedAt: '2023-09-10T14:30:00',
  },
];

const LeaveManagementPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: LeaveStatus) => {
    switch (status) {
      case LeaveStatus.APPROVED:
        return 'success';
      case LeaveStatus.PENDING:
        return 'warning';
      case LeaveStatus.REJECTED:
        return 'error';
      case LeaveStatus.CANCELLED:
        return 'default';
      default:
        return 'default';
    }
  };

  const getLeaveTypeColor = (type: LeaveType) => {
    switch (type) {
      case LeaveType.VACATION:
        return 'primary';
      case LeaveType.SICK:
        return 'error';
      case LeaveType.PERSONAL:
        return 'info';
      case LeaveType.MATERNITY:
      case LeaveType.PATERNITY:
        return 'secondary';
      case LeaveType.BEREAVEMENT:
        return 'default';
      default:
        return 'default';
    }
  };

  const filteredRequests = mockLeaveRequests.filter(
    (request) =>
      request.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Leave Management
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending Requests
              </Typography>
              <Typography variant="h4" component="div">
                8
              </Typography>
              <Typography color="text.secondary">Awaiting Approval</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Approved This Month
              </Typography>
              <Typography variant="h4" component="div">
                15
              </Typography>
              <Typography color="text.secondary">Leave Requests</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Currently On Leave
              </Typography>
              <Typography variant="h4" component="div">
                5
              </Typography>
              <Typography color="text.secondary">Employees</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Leaves
              </Typography>
              <Typography variant="h4" component="div">
                12
              </Typography>
              <Typography color="text.secondary">Next 30 Days</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Leave Requests Table */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search leave requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<CalendarIcon />}
                  onClick={() => {
                    // TODO: Implement calendar view
                    console.log('Calendar view clicked');
                  }}
                >
                  Calendar View
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    // TODO: Implement new leave request
                    console.log('New leave request clicked');
                  }}
                >
                  New Request
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.employeeId}</TableCell>
                    <TableCell>
                      <Chip
                        label={request.type}
                        color={getLeaveTypeColor(request.type) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(request.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(request.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>
                      <Chip
                        label={request.status}
                        color={getStatusColor(request.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {request.status === LeaveStatus.PENDING && (
                        <>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => {
                              // TODO: Implement approve functionality
                              console.log('Approve clicked for:', request.id);
                            }}
                          >
                            <ApproveIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => {
                              // TODO: Implement reject functionality
                              console.log('Reject clicked for:', request.id);
                            }}
                          >
                            <RejectIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRequests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default LeaveManagementPage;
