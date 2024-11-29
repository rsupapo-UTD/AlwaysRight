import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Stack,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Person,
  Notifications,
  Palette,
  Language,
  Security
} from '@mui/icons-material';
import DashboardLayout from '../components/layouts/DashboardLayout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Settings() {
  const [value, setValue] = useState(0);
  const [showNotifications, setShowNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    setShowNotifications(settings.showNotifications ?? true);
    setEmailNotifications(settings.emailNotifications ?? true);
    setTheme(settings.theme ?? 'light');
    setLanguage(settings.language ?? 'en');
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSave = () => {
    const settings = {
      showNotifications,
      emailNotifications,
      theme,
      language
    };
    localStorage.setItem('settings', JSON.stringify(settings));
    setSnackbar(true);
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>

        <Paper sx={{ mt: 3 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab icon={<Person />} label="Profile" />
            <Tab icon={<Notifications />} label="Notifications" />
            <Tab icon={<Palette />} label="Appearance" />
            <Tab icon={<Language />} label="Language" />
            <Tab icon={<Security />} label="Security" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Stack spacing={3} sx={{ maxWidth: 600 }}>
              <TextField
                fullWidth
                label="Full Name"
                defaultValue="Test User"
              />
              <TextField
                fullWidth
                label="Email"
                defaultValue="test@example.com"
                type="email"
              />
              <TextField
                fullWidth
                label="Phone"
                defaultValue="+1 234 567 890"
              />
              <Button variant="contained" onClick={handleSave}>
                Save Changes
              </Button>
            </Stack>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showNotifications}
                    onChange={(e) => setShowNotifications(e.target.checked)}
                  />
                }
                label="Enable Push Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                }
                label="Enable Email Notifications"
              />
              <Button variant="contained" onClick={handleSave}>
                Save Changes
              </Button>
            </Stack>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Stack spacing={3} sx={{ maxWidth: 400 }}>
              <FormControl fullWidth>
                <InputLabel>Theme</InputLabel>
                <Select
                  value={theme}
                  label="Theme"
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="system">System</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" onClick={handleSave}>
                Save Changes
              </Button>
            </Stack>
          </TabPanel>

          <TabPanel value={value} index={3}>
            <Stack spacing={3} sx={{ maxWidth: 400 }}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={language}
                  label="Language"
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                  <MenuItem value="zh">中文</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" onClick={handleSave}>
                Save Changes
              </Button>
            </Stack>
          </TabPanel>

          <TabPanel value={value} index={4}>
            <Stack spacing={3} sx={{ maxWidth: 600 }}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
              />
              <TextField
                fullWidth
                label="New Password"
                type="password"
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
              />
              <Button variant="contained" onClick={handleSave}>
                Update Password
              </Button>
            </Stack>
          </TabPanel>
        </Paper>

        <Snackbar
          open={snackbar}
          autoHideDuration={3000}
          onClose={() => setSnackbar(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Settings saved successfully!
          </Alert>
        </Snackbar>
      </Box>
    </DashboardLayout>
  );
}