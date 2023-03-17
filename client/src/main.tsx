import ReactDOM from 'react-dom/client';

import App from '@/App';
import '@/styles/reset.css';

const $root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot($root).render(<App />);
