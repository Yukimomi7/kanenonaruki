import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChannelManagement from './components/ChannelManagement';
import Analytics from './components/Analytics';
import Automation from './components/Automation';
import Settings from './components/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'channels':
        return <ChannelManagement />;
      case 'analytics':
        return <Analytics />;
      case 'automation':
        return <Automation />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          isOpen={true}
          onClose={() => {}}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={(page) => {
            setCurrentPage(page);
            closeSidebar();
          }}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gray-800 p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                className="text-white p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold text-white">金のなる木</h1>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
}

export default App;