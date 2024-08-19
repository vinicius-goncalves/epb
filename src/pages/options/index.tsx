import ReactDOM from 'react-dom/client';
import OptionsPage from './components/OptionsPage';

import '@assets/styles/tailwind.css';

const container = document.getElementById('__root') as HTMLDivElement;
ReactDOM.createRoot(container).render(<OptionsPage />);
