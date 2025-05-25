import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Viewer } from './Viewer'
import { FilterProvider } from './context/FilterContext'
import Filter from './components/filter/Filter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilterProvider>
      <Filter />
      <Viewer />
    </FilterProvider>
  </StrictMode>,
)
