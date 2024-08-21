import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StarRating from './components/StarRating.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <StarRating max={10} color="#fcc419" size={30} />
    <StarRating color="red" size={160} />
    <StarRating color="red" />
  </StrictMode>,
)
