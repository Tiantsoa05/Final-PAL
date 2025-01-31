import { useState } from 'react';
import { Sidebar } from '../components/Navigation/Sidebar';
import { OverviewSection } from '../components/sections/OverviewSection';
import { CoursesSection } from '../components/sections/CoursesSection';
import Navbar from '../components/Navigation/Navbar';
import CalendarSection from '../components/sections/CalendarSection';
import ChatInterface from '../components/chat/chatInterface';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'courses':
        return <CoursesSection />;
      case 'calendar':
        return <CalendarSection />;
      case 'communications':
        return <ChatInterface />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar onSectionChange={setActiveSection} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 bg-blue-50 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;