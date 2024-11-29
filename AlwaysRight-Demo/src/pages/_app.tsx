import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';
import { CartProvider } from '../context/CartContext';
import ProtectedRoute from '../components/auth/ProtectedRoute';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <ProtectedRoute>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ProtectedRoute>
    </CartProvider>
  );
}

export default MyApp; 