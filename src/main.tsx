import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Viewer } from './Viewer'
import { FilterProvider } from './context/FilterContext'
import './index.css'
 
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{  height: '100vh' }}>
    <FilterProvider>
      {/* <Filter /> */}
      <Viewer />
    </FilterProvider></div>
  </StrictMode>,
)
