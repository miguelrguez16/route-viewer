import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Viewer } from './Viewer'
import { FilterProvider } from './context/FilterContext'
import Filter from './components/filter/Filter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{  height: '100vdh' }}>
    <FilterProvider>
      <Filter />
      <Viewer />
    </FilterProvider></div>
  </StrictMode>,
)
