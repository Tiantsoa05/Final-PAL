import { useEffect, useState } from 'react';
import { Sidebar } from '../components/Navigation/Sidebar';
import { OverviewSection } from '../components/sections/OverviewSection';
import { CoursesSection } from '../components/sections/CoursesSection';
import Navbar from '../components/Navigation/Navbar';
import ChaInterface from '../components/chat/chatInterface'
import Exam from './Exam';
import CalendarSection from '../components/sections/CalendarSection';
import VideoConference from './VideoConference';
import socket from '../tools/socket-io';
import axios from 'axios';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const {userId} = localStorage
  const [numberStuds,setNumberStuds] = useState(0)
  const [statsLesson,setStatsLesson]=useState(0)

  console.log(localStorage)
  
  useEffect(()=>{
    axios.get('http://localhost:3000/students/number/'+userId).then(data=>setNumberStuds(data.data.followers))
    axios.get('http://localhost:3000/courses/number/'+userId).then(data=>setStatsLesson(data.data.numberCourses))
  },[])

  useEffect(()=>{
    console.log({numberStuds,statsLesson})
  },[numberStuds,statsLesson])

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return <OverviewSection numberStuds={numberStuds} statsLesson={statsLesson}/>;
      case 'courses':
        return <CoursesSection />;
      case 'exam':
        return <Exam />;
      case 'communications':
        return <ChaInterface />;
      case 'calendar':
        return <CalendarSection />;  
      default:
        return <OverviewSection numberStuds={numberStuds} statsLesson={statsLesson}/>;
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