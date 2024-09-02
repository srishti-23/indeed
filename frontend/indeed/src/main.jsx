import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BookmarksProvider } from "./contexts/BookmarkContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
     <BookmarksProvider>
    <App />
    </BookmarksProvider>

  </StrictMode>,
)
