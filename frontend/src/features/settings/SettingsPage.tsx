import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const SettingsPage = () => {
  // Company Settings
  const [companyName, setCompanyName] = useState('Acme Corporation');
  const [companyEmail, setCompanyEmail] = useState('hr@acmecorp.com');
  const [companyPhone, setCompanyPhone] = useState('+1 (555) 123-4567');
  const [fiscalYearStart, setFiscalYearStart] = useState('01');

  // System Preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoApproveTimesheet, setAutoApproveTimesheet] = useState(false);
  const [defaultCurrency, setDefaultCurrency] = useState('USD');
  const [timeZone, setTimeZone] = useState('UTC-5');

  // Security Settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [passwordExpiry, setPasswordExpiry] = useState('90');
  const [sessionTimeout, setSessionTimeout] = useState('30');

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    // TODO: Implement settings save functionality
    console.log('Saving settings...');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Company Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Company Settings" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company Email"
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company Phone"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Fiscal Year Start Month</InputLabel>
                    <Select
                      value={fiscalYearStart}
                      label="Fiscal Year Start Month"
                      onChange={(e) => setFiscalYearStart(e.target.value)}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <MenuItem
                          key={month}
                          value={month.toString().padStart(2, '0')}
                        >
                          {new Date(2000, month - 1).toLocaleString('default', {
                            month: 'long',
                          })}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* System Preferences */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="System Preferences" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={autoApproveTimesheet}
                        onChange={(e) => setAutoApproveTimesheet(e.target.checked)}
                      />
                    }
                    label="Auto-approve Timesheets"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Default Currency</InputLabel>
                    <Select
                      value={defaultCurrency}
                      label="Default Currency"
                      onChange={(e) => setDefaultCurrency(e.target.value)}
                    >
                      <MenuItem value="USD">USD ($)</MenuItem>
                      <MenuItem value="EUR">EUR (€)</MenuItem>
                      <MenuItem value="GBP">GBP (£)</MenuItem>
                      <MenuItem value="JPY">JPY (¥)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Time Zone</InputLabel>
                    <Select
                      value={timeZone}
                      label="Time Zone"
                      onChange={(e) => setTimeZone(e.target.value)}
                    >
                      <MenuItem value="UTC-8">Pacific Time (UTC-8)</MenuItem>
                      <MenuItem value="UTC-5">Eastern Time (UTC-5)</MenuItem>
                      <MenuItem value="UTC+0">UTC</MenuItem>
                      <MenuItem value="UTC+1">Central European Time (UTC+1)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Security Settings" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={twoFactorAuth}
                        onChange={(e) => setTwoFactorAuth(e.target.checked)}
                      />
                    }
                    label="Two-Factor Authentication"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Password Expiry (days)"
                    type="number"
                    value={passwordExpiry}
                    onChange={(e) => setPasswordExpiry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Session Timeout (minutes)"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          size="large"
        >
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsPage;
