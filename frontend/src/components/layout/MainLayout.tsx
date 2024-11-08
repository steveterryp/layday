import { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  Divider,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  AttachMoney,
  AccessTime,
  EventNote,
  Settings,
  AccountCircle,
  ChevronLeft,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store';

const drawerWidth = 240;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Employees', icon: <People />, path: '/employees' },
    { text: 'Payroll', icon: <AttachMoney />, path: '/payroll' },
    { text: 'Time & Attendance', icon: <AccessTime />, path: '/time-attendance' },
    { text: 'Leave Management', icon: <EventNote />, path: '/leave-management' },
  ];

  const bottomMenuItems = [
    { text: 'Settings', icon: <Settings />, path: '/settings' },
    { text: 'Profile', icon: <AccountCircle />, path: '/profile' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: [1],
        }}
      >
        <Typography variant="h6" noWrap component="div">
          HR & Finance
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav" sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={isActiveRoute(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.light + '20',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light + '30',
                  },
                },
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActiveRoute(item.path)
                    ? theme.palette.primary.main
                    : 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: isActiveRoute(item.path) ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mb: 1 }} />
      <List>
        {bottomMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={isActiveRoute(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.light + '20',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light + '30',
                  },
                },
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActiveRoute(item.path)
                    ? theme.palette.primary.main
                    : 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: isActiveRoute(item.path) ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {menuItems.find((item) => item.path === location.pathname)?.text ||
              bottomMenuItems.find((item) => item.path === location.pathname)
                ?.text ||
              'HR & Finance System'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation menu"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Toolbar /> {/* This toolbar is for spacing below the AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
