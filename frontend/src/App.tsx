import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { theme } from './utils/theme';
import { store } from './store/index';
import AppRoutes from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <AppRoutes />
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
