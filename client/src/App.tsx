import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Routes from '@/routes';
import { theme } from '@/styles/theme';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
