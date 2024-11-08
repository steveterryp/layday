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
  CardHeader,
} from '@mui/material';
import {
  PlayArrow as ProcessIcon,
  GetApp as DownloadIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { Payroll, PayrollStatus, DeductionType, TaxType } from '../../types/common';

// Mock data
const mockPayrolls: Payroll[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    periodStart: '2023-08-01',
    periodEnd: '2023-08-31',
    basePay: 7083.33, // 85000/12
    overtime: 500,
    deductions: [
      {
        id: 'd1',
        name: 'Health Insurance',
        amount: 200,
        type: DeductionType.BENEFIT_PREMIUM,
      },
      {
        id: 'd2',
        name: '401k',
        amount: 500,
        type: DeductionType.RETIREMENT_CONTRIBUTION,
      },
    ],
    taxes: [
      {
        id: 't1',
        name: 'Federal Income Tax',
        amount: 1500,
        type: TaxType.FEDERAL,
      },
      {
        id: 't2',
        name: 'State Tax',
        amount: 500,
        type: TaxType.STATE,
      },
      {
        id: 't3',
        name: 'FICA',
        amount: 583.33,
        type: TaxType.FICA,
      },
    ],
    netPay: 4300,
    status: PayrollStatus.COMPLETED,
  },
  {
    id: '2',
    employeeId: 'EMP002',
    periodStart: '2023-08-01',
    periodEnd: '2023-08-31',
    basePay: 7916.67, // 95000/12
    overtime: 0,
    deductions: [
      {
        id: 'd3',
        name: 'Health Insurance',
        amount: 200,
        type: DeductionType.BENEFIT_PREMIUM,
      },
    ],
    taxes: [
      {
        id: 't4',
        name: 'Federal Income Tax',
        amount: 1700,
        type: TaxType.FEDERAL,
      },
      {
        id: 't5',
        name: 'State Tax',
        amount: 600,
        type: TaxType.STATE,
      },
      {
        id: 't6',
        name: 'FICA',
        amount: 605.63,
        type: TaxType.FICA,
      },
    ],
    netPay: 4811.04,
    status: PayrollStatus.PROCESSING,
  },
];

const PayrollPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: PayrollStatus) => {
    switch (status) {
      case PayrollStatus.COMPLETED:
        return 'success';
      case PayrollStatus.PROCESSING:
        return 'warning';
      case PayrollStatus.ERROR:
        return 'error';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payroll Management
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Current Pay Period" />
            <CardContent>
              <Typography variant="h5" component="div">
                August 2023
              </Typography>
              <Typography color="text.secondary">
                Period: 08/01/2023 - 08/31/2023
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Total Payroll" />
            <CardContent>
              <Typography variant="h5" component="div">
                $245,000
              </Typography>
              <Typography color="text.secondary">
                150 Employees
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Actions" />
            <CardContent>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<ProcessIcon />}
                  onClick={() => {
                    // TODO: Implement process payroll
                    console.log('Process payroll clicked');
                  }}
                >
                  Process
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => {
                    // TODO: Implement download reports
                    console.log('Download reports clicked');
                  }}
                >
                  Reports
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  onClick={() => {
                    // TODO: Implement send payslips
                    console.log('Send payslips clicked');
                  }}
                >
                  Payslips
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Payroll Table */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Period</TableCell>
                <TableCell>Base Pay</TableCell>
                <TableCell>Deductions</TableCell>
                <TableCell>Taxes</TableCell>
                <TableCell>Net Pay</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPayrolls
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((payroll) => (
                  <TableRow key={payroll.id}>
                    <TableCell>{payroll.employeeId}</TableCell>
                    <TableCell>
                      {new Date(payroll.periodStart).toLocaleDateString()} -{' '}
                      {new Date(payroll.periodEnd).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{formatCurrency(payroll.basePay)}</TableCell>
                    <TableCell>
                      {formatCurrency(
                        payroll.deductions.reduce((sum, d) => sum + d.amount, 0)
                      )}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(
                        payroll.taxes.reduce((sum, t) => sum + t.amount, 0)
                      )}
                    </TableCell>
                    <TableCell>{formatCurrency(payroll.netPay)}</TableCell>
                    <TableCell>
                      <Chip
                        label={payroll.status}
                        color={getStatusColor(payroll.status) as any}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mockPayrolls.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default PayrollPage;
