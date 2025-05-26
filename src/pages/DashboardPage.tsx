import Layout from '@/components/Layout'

function DashboardPage() {
  return (
    <Layout>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
        <p className="text-gray-600">
          Welcome to the Event Ticket Management Admin Portal.
        </p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800">Events</h3>
            <p className="text-blue-600">Manage your events</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-lg font-medium text-green-800">Tickets</h3>
            <p className="text-green-600">Check ticket status</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-lg font-medium text-purple-800">Settings</h3>
            <p className="text-purple-600">Configure application settings</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardPage