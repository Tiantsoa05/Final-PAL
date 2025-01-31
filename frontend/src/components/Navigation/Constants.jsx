import { BarChart2, BookOpen, BookUser, Calendar, LayoutDashboard, MessageCircle } from "lucide-react";

const sections = [
    { 
      icon: LayoutDashboard, 
      label: 'Tableau de Bord', 
      key: 'overview' 
    },
    { 
      icon: BookOpen, 
      label: 'Cours', 
      key: 'courses' 
    },
    { 
      icon: BookUser, 
      label: 'Examens', 
      key: 'exam' 
    },
    { 
      icon: Calendar, 
      label: 'Calendrier', 
      key: 'calendar' 
    },
    { 
      icon: MessageCircle, 
      label: 'Communications', 
      key: 'communications' 
    }
  ];

export default sections;
