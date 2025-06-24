import React from 'react';
import Calendar from './components/Calendar/Calendar';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Calendar Application
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your events with style and efficiency
          </p>
        </div>
        <Calendar />
      </div>
    </div>
  );
}

export default App;