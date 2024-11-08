import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Card,
  CardContent,
  Divider,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { User, UserRole } from '../../types/common';

// Mock user data
const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: UserRole.EMPLOYEE,
  department: 'Engineering',
  createdAt: '2023-01-15',
  updatedAt: '2023-09-11',
};

const ProfilePage = () => {
  const [user, setUser] = useState(mockUser);
  const [editing, setEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Password change form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving profile...', user);
    setSaveSuccess(true);
    setEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    // TODO: Implement password change
    console.log('Changing password...');
    setChangePasswordOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const recentActivities = [
    {
      id: 1,
      action: 'Submitted timesheet',
      date: '2023-09-11 09:30 AM',
    },
    {
      id: 2,
      action: 'Requested vacation leave',
      date: '2023-09-10 02:15 PM',
    },
    {
      id: 3,
      action: 'Updated profile information',
      date: '2023-09-09 11:45 AM',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Changes saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mr: 2,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                  }}
                >
                  {user.firstName[0]}
                  {user.lastName[0]}
                </Avatar>
                <Box>
                  <Typography variant="h5">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography color="textSecondary">{user.role}</Typography>
                  <Typography color="textSecondary">{user.department}</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={user.department}
                    disabled
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                {!editing ? (
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                )}
                <Button
                  variant="outlined"
                  startIcon={<LockIcon />}
                  onClick={() => setChangePasswordOpen(true)}
                >
                  Change Password
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id}>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.date}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            {passwordError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {passwordError}
              </Alert>
            )}
            <TextField
              fullWidth
              margin="dense"
              label="Current Password"
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    edge="end"
                  >
                    {showCurrentPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangePasswordOpen(false)}>Cancel</Button>
          <Button onClick={handlePasswordChange} variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
