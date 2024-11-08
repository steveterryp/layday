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
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Employee, EmployeeStatus, UserRole } from '../../types/common';

// Mock data
const mockEmployees: Employee[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: UserRole.EMPLOYEE,
    position: 'Software Engineer',
    department: 'Engineering',
    salary: 85000,
    startDate: '2023-01-15',
    status: EmployeeStatus.ACTIVE,
    benefits: [],
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: UserRole.EMPLOYEE,
    position: 'HR Manager',
    department: 'Human Resources',
    salary: 95000,
    startDate: '2022-11-01',
    status: EmployeeStatus.ACTIVE,
    benefits: [],
    createdAt: '2022-11-01',
    updatedAt: '2022-11-01',
  },
];

const EmployeesPage = () => {
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

  const getStatusColor = (status: EmployeeStatus) => {
    switch (status) {
      case EmployeeStatus.ACTIVE:
        return 'success';
      case EmployeeStatus.ON_LEAVE:
        return 'warning';
      case EmployeeStatus.TERMINATED:
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredEmployees = mockEmployees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Employees</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            // TODO: Implement add employee functionality
            console.log('Add employee clicked');
          }}
        >
          Add Employee
        </Button>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search employees..."
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
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.employeeId}</TableCell>
                    <TableCell>
                      {employee.firstName} {employee.lastName}
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <Chip
                        label={employee.status}
                        color={getStatusColor(employee.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => {
                          // TODO: Implement edit functionality
                          console.log('Edit clicked for:', employee.id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          // TODO: Implement delete functionality
                          console.log('Delete clicked for:', employee.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredEmployees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default EmployeesPage;
