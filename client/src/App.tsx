import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';

import Routes from '@/routes';
import { theme } from '@/styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
