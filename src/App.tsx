import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import DashboardPage from '@/pages/DashboardPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProtectedRoute from '@/components/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App