import { ChakraProvider, createStandaloneToast, extendTheme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PreviewMission } from './component/preview-mission.tsx'
import { ProtectedRoute } from './component/protected-route.tsx'
import { Main } from './dashboard.tsx'
import EnterpriseDashboard from './enterprise/Dashboard/EnterpriseDashboard.tsx'
import { JobList } from './enterprise/Jobs/job-list.tsx'
import { JobReport } from './enterprise/Jobs/job-report.tsx'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}
const { ToastContainer } = createStandaloneToast()
const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Main />} />
          <Route path='/missions/:id' element={<ProtectedRoute><PreviewMission /></ProtectedRoute>} />
          <Route path='/enterprise' element={<ProtectedRoute><EnterpriseDashboard /></ProtectedRoute>} >
            <Route path='' element={<JobReport />} />
            <Route path='jobs' element={<JobList />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>,
)