import { createRoot } from 'react-dom/client'
import App from './App';
import './index.css'

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("لم يتم العثور على عنصر root في ملف index.html");
}

createRoot(rootElement).render(<App />);
