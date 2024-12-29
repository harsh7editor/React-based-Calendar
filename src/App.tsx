import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { CompanyForm } from './components/CompanyForm';
import { CommunicationForm } from './components/CommunicationForm';
import { Plus, MessageSquare } from 'lucide-react';

function App() {
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showCommunicationForm, setShowCommunicationForm] = useState(false);
  const [selectedCompanyIds] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Communication Calendar
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCompanyForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Company
              </button>
              <button
                onClick={() => setShowCommunicationForm(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Log Communication
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Dashboard />
      </main>

      {showCompanyForm && <CompanyForm onClose={() => setShowCompanyForm(false)} />}
      {showCommunicationForm && (
        <CommunicationForm
          companyIds={selectedCompanyIds}
          onClose={() => setShowCommunicationForm(false)}
        />
      )}

      <footer className="bg-white py-6 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Mail Icon */}
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8.5l9 5.5 9-5.5v8.25a1.25 1.25 0 0 1-1.25 1.25H4.25A1.25 1.25 0 0 1 3 16.75V8.5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8.5L12 3l9 5.5M3 8.5v8.25a1.25 1.25 0 0 0 1.25 1.25H20.75a1.25 1.25 0 0 0 1.25-1.25V8.5"
              />
            </svg>
            <span className="text-sm text-gray-600">Email Support</span>
          </div>

          <p className="text-sm text-gray-600">
            © 2025 Harsh Kori. All rights reserved.
          </p>

          {/* Arrow Icon */}
          <button
            id="scrollToTop"
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 14.25 12 7.5l6.75 6.75"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
