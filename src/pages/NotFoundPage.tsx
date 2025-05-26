import { Link } from 'react-router-dom'
import Layout from '@/components/Layout'

function NotFoundPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">404 - Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage