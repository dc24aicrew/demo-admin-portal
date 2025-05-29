import { Link } from 'react-router-dom'
import Layout from '@/components/Layout'

function NotFoundPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md text-sm sm:text-base">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-6 rounded-md transition-colors text-sm sm:text-base"
        >
          Go to Dashboard
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage
