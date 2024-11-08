import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  People as PeopleIcon,
  EventNote as EventIcon,
  AttachMoney as MoneyIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

const DashboardPage = () => {
  const summaryCards = [
    {
      title: 'Total Employees',
      value: '150',
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      subtitle: 'Employees',
    },
    {
      title: 'Pending Leave Requests',
      value: '12',
      icon: <EventIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      subtitle: 'Requests',
    },
    {
      title: 'Monthly Payroll',
      value: '$245,000',
      icon: <MoneyIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      subtitle: 'Payroll',
    },
    {
      title: 'Time Entries Pending',
      value: '25',
      icon: <TimeIcon sx={{ fontSize: 40, color: 'error.main' }} />,
      subtitle: 'Pending',
    },
  ];

  const recentActivities = [
    'John Doe submitted a leave request',
    'Payroll processing completed for August',
    'New employee Jane Smith onboarded',
    'Time sheet approvals pending for Team A',
  ];

  const upcomingEvents = [
    'Monthly team meeting - Sept 15',
    'Payroll processing deadline - Sept 25',
    'Employee training session - Sept 28',
    'Performance review period starts - Oct 1',
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
              }}
            >
              {card.icon}
              <Typography
                variant="h4"
                component="div"
                sx={{ mt: 2, fontWeight: 'bold' }}
              >
                {card.value}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {card.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Activity and Events */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={activity}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: 'text.secondary',
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Events
              </Typography>
              <List>
                {upcomingEvents.map((event, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={event}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: 'text.secondary',
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
