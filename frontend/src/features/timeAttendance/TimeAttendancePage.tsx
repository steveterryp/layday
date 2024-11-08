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
  Check as ApproveIcon,
  Close as RejectIcon,
  Search as SearchIcon,
  Today as CalendarIcon,
} from '@mui/icons-material';
import { TimeEntry, TimeEntryStatus } from '../../types/common';

// Mock data
const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    date: '2023-09-11',
    hoursWorked: 8,
    overtimeHours: 1,
    status: TimeEntryStatus.PENDING,
    notes: 'Project deadline work',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    date: '2023-09-11',
    hoursWorked: 8,
    overtimeHours: 0,
    status: TimeEntryStatus.APPROVED,
  },
  {
    id: '3',
    employeeId: 'EMP001',
    date: '2023-09-10',
    hoursWorked: 8,
    overtimeHours: 0,
    status: TimeEntryStatus.APPROVED,
  },
];

const TimeAttendancePage = () => {
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

  const getStatusColor = (status: TimeEntryStatus) => {
    switch (status) {
      case TimeEntryStatus.APPROVED:
        return 'success';
      case TimeEntryStatus.PENDING:
        return 'warning';
      case TimeEntryStatus.REJECTED:
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredEntries = mockTimeEntries.filter(
    (entry) =>
      entry.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.notes?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Time & Attendance
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Attendance
              </Typography>
              <Typography variant="h4" component="div">
                145/150
              </Typography>
              <Typography color="text.secondary">Employees Present</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending Approvals
              </Typography>
              <Typography variant="h4" component="div">
                12
              </Typography>
              <Typography color="text.secondary">Time Entries</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Overtime
              </Typography>
              <Typography variant="h4" component="div">
                45h
              </Typography>
              <Typography color="text.secondary">This Month</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Time Entries Table */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search time entries..."
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
              </Box>
            </Grid>
          </Grid>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Hours Worked</TableCell>
                <TableCell>Overtime</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEntries
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.employeeId}</TableCell>
                    <TableCell>
                      {new Date(entry.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{entry.hoursWorked}</TableCell>
                    <TableCell>{entry.overtimeHours}</TableCell>
                    <TableCell>{entry.notes || '-'}</TableCell>
                    <TableCell>
                      <Chip
                        label={entry.status}
                        color={getStatusColor(entry.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {entry.status === TimeEntryStatus.PENDING && (
                        <>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => {
                              // TODO: Implement approve functionality
                              console.log('Approve clicked for:', entry.id);
                            }}
                          >
                            <ApproveIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => {
                              // TODO: Implement reject functionality
                              console.log('Reject clicked for:', entry.id);
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
          count={filteredEntries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default TimeAttendancePage;
