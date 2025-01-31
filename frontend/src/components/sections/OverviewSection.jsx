import { 
  BookOpen, 
  Users, 
  FileText 
} from 'lucide-react';

export function OverviewSection({numberStuds,statsLesson}) {
  const statsCards = [
    { 
      icon: BookOpen, 
      title: 'Total Cours', 
      value: statsLesson, 
      color: 'blue' 
    },
    { 
      icon: Users, 
      title: 'Étudiants', 
      value: numberStuds, 
      color: 'green' 
    },
    { 
      icon: FileText, 
      title: 'Exercices', 
      value: 48, 
      color: 'purple' 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        {statsCards.map((card, index) => (
          <div 
            key={index} 
            className={`bg-white p-6 rounded-lg shadow-md flex items-center`}
          >
            <div className={`bg-${card.color}-100 p-3 rounded-full mr-4`}>
              <card.icon className={`text-${card.color}-600`} />
            </div>
            <div>
              <p className="text-gray-500">{card.title}</p>
              <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Derniers Cours</h3>
          {/* Liste des derniers cours */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Activités Récentes</h3>
          {/* Liste des activités récentes */}
        </div>
      </div>
    </div>
  );
}