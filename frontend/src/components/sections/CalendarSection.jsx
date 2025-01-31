import { useState, useEffect} from 'react';
import {  
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X, 
  Clock,
  Edit2,
  Trash2,
  Check,
  Globe,
  Calendar,
} from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay 
} from 'date-fns';
import { fr } from 'date-fns/locale';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {  nouveau } from '../../features/Notifications/NotificationSlice';

const CalendarSection = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [dataEvent,setDataEvent] = useState([])
  const [newEvent, setNewEvent] = useState({
    id: '',
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '',
    endTime: '',
    language: 'french',
    level: 'beginner',
    description: '',
    status: 'upcoming',
    type: 'live'
  });

  const profId = parseInt(localStorage.getItem('userId'))

  const dispatch = useDispatch()

  useEffect(() => {
    // const savedEvents = localStorage.getItem('languageCalendarEvents');
    // if (savedEvents) {
    //   setEvents(JSON.parse(savedEvents));
    // }

    fetchPrograms();

    // Add click event listener to handle clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.calendar-event')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const saveEvent = async(e) => {
    e.preventDefault();
    let updatedEvents
    
    if (editingEvent) {

      updatedEvents = events.map(event => 
        event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : event
      );

      // let editId = await dataEvent.find(event=>event.tache===editingEvent.title)
      // console.log(editId.id_prog)
      // Mettre à jour le programme dans la base de données
      axios.post(`http://localhost:3000/agenda/set/${editingEvent.id}`, 
      {
        tache: newEvent.title,
        date_tache: new Date(`${newEvent.date}T${newEvent.startTime}`)
      }).then(res=>{
        console.log(res.data)

        dispatch(nouveau(
          {
            message: "Le professeur a modifié un programme", 
            id_prof: parseInt(localStorage.getItem('userId')),
            type:"info",
            timestamp: new Date()
          }
        ))
        
      }).catch(console.log)

    } else {

      let eventId
     

      console.log({newEvent})

      const nouveauProg = await axios.post('http://localhost:3000/agenda/new',{
        
        id_prof: profId,
        tache: newEvent.title,
        date_tache: new Date(`${newEvent.date}T${newEvent.startTime}`)

      }) 

      let {newProgramme} = nouveauProg.data
      eventId = newProgramme.id_prog.toString()
      console.log(`----------------${eventId}`)

      
      dispatch(nouveau(
        {
          message: "Le professeur a ajouté un nouveau programme",
          id_prof: parseInt(localStorage.getItem('userId')),
          type:"info",
          timestamp: new Date()
        }
      ))

      updatedEvents = [...events, { ...newEvent ,id: eventId}];
      console.log(updatedEvents)
    }

    setEvents(updatedEvents);
    closeModal();
    
  };

  const deleteEvent = async (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    // localStorage.setItem('languageCalendarEvents', JSON.stringify(updatedEvents));
    setShowEventDetails(false);

    // Supprimer le programme de la base de données
    const response = await axios.delete(`http://localhost:3000/agenda/delete/${eventId}`);
    
    dispatch(nouveau(
      { 
        message: "Le professeur a annulé un programme" , 
        id_prof: parseInt(localStorage.getItem('userId')),
        type:"error",
        timestamp: new Date()
      }
    ))

    console.log(response.data)
  };

  const updateEventStatus = (eventId, newStatus) => {
    const updatedEvents = events.map(event => 
      event.id === eventId ? { ...event, status: newStatus } : event
    );
    setEvents(updatedEvents);
    // localStorage.setItem('languageCalendarEvents', JSON.stringify(updatedEvents));
  };

  const closeModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
    setNewEvent({
      id: '',
      title: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '',
      endTime: '',
      language: 'french',
      level: 'beginner',
      description: '',
      status: 'upcoming',
      type: 'live'
    });
  };

  const closeEventDetails = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  const editEvent = (event) => {
    setEditingEvent(event);
    setNewEvent(event);
    setShowEventModal(true);
    setShowEventDetails(false);
  };

  const showEventDetailsModal = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const getEventsByDate = (date) => {
    return events.filter(event => event.date === format(date, 'yyyy-MM-dd'));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'from-green-500 to-green-600';
      case 'cancelled':
        return 'from-red-500 to-red-600';
      case 'in-progress':
        return 'from-yellow-500 to-yellow-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  const getLevelTranslation = (level) => {
    const translations = {
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Avancé'
    };
    return translations[level] || level;
  };

  const getLanguageTranslation = (language) => {
    const translations = {
      english: 'Anglais',
      french: 'Français',
      spanish: 'Espagnol',
      german: 'Allemand'
    };
    return translations[language] || language;
  };

  const getTypeTranslation = (type) => {
    const translations = {
      live: 'Cours en direct',
      recorded: 'Cours enregistré',
      practice: 'Session pratique'
    };
    return translations[type] || type;
  };


  const fetchPrograms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/agenda/programs/'+profId)
      const programs = response.data.map(program => ({
        id: program.id_prog.toString(),
        title: program.tache,
        date: format(new Date(program.date_tache), 'yyyy-MM-dd'),
        startTime: format(new Date(program.date_tache), 'HH:mm'),
        endTime: '', 
        language: 'french', 
        level: 'beginner', 
        description: '', 
        status: 'upcoming', 
        type: 'live' 
      }));

      setEvents([...programs]);

    } catch (error) {
      console.error('Erreur lors de la récupération des programmes:', error);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
      <div className="p-10 bg-white/80 backdrop-blur rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <Globe className="h-5 w-5 text-indigo-600" />
              <span>{format(currentMonth, 'MMMM yyyy', { locale: fr })}</span>
            </h2>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-all"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-all"
              >
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowEventModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            Nouveau programme
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          <div className="grid grid-cols-7 gap-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
              <div key={day} className="text-center font-medium text-sm text-gray-600">
                {day}
              </div>
            ))}
            {days.map((day, index) => (
              <div
                key={index}
                onClick={() => setSelectedDate(day)}
                className={`
                  min-h-24 p-1 rounded-lg border transition-all cursor-pointer
                  ${isSameMonth(day, currentMonth) ? 'bg-white' : 'bg-gray-50'}
                  ${isSameDay(day, selectedDate) ? 'ring-2 ring-indigo-600' : 'hover:border-indigo-200'}
                `}
              >
                <div className="text-sm font-medium text-gray-600">
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {getEventsByDate(day).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => showEventDetailsModal(event, e)}
                      onMouseEnter={() => setIsHovering(true)}
                      className={`
                        calendar-event p-1.5 rounded text-sm 
                        ${isHovering ? 'transform scale-105' : ''}
                        transition-all duration-200
                        bg-gradient-to-r ${getStatusColor(event.status)} text-white
                        cursor-pointer
                      `}
                    >
                      <div className="font-medium truncate text-xs">{event.title}</div>
                      <div className="text-xs opacity-90 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.startTime}
                      </div>
                      <div className="flex gap-1 mt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            editEvent(event);
                          }}
                          className="p-1 hover:bg-white/20 rounded transition-colors"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateEventStatus(event.id, 'completed');
                          }}
                          className="p-1 hover:bg-white/20 rounded transition-colors"
                        >
                          <Check className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(event)
                            deleteEvent(event.id);
                          }}
                          className="p-1 hover:bg-white/20 rounded transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Creation/Edit Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-bold">
                {editingEvent ? 'Modifier le programme' : 'Nouveau programme'}
              </h3>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={saveEvent} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Programme à faire
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-600 outline-none"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Ex: Nouvelle leçon"
                  required
                />
              </div>

              {/* <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Langue
                  </label>
                  <select
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-600 outline-none"
                    value={newEvent.language}
                    onChange={(e) => setNewEvent({...newEvent, language: e.target.value})}
                  >
                    <option value="english">Anglais</option>
                    <option value="french">Français</option>
                    <option value="spanish">Espagnol</option>
                    <option value="german">Allemand</option>
                  </select>
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Niveau
                  </label>
                  <select
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-600 outline-none"
                    value={newEvent.level}
                    onChange={(e) => setNewEvent({...newEvent, level: e.target.value})}
                  >
                    <option value="beginner">Débutant</option>
                    <option value="intermediate">Intermédiaire</option>
                    <option value="advanced">Avancé</option>
                  </select>
                </div> 
              </div> */}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-600 outline-none"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    required
                  />
                </div>
                {/* Heure */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure
                  </label>
                  <input
                    type="time"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-600 outline-none"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                    required
                  />
                </div>
              </div>
              {editingEvent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <select
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-600 outline-none"
                    value={newEvent.status}
                    onChange={(e) => setNewEvent({...newEvent, status: e.target.value})}
                  >
                    <option value="upcoming">À venir</option>
                    <option value="in-progress">En cours</option>
                    <option value="completed">Terminé</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full p-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded hover:from-indigo-700 hover:to-indigo-800 transition-all font-medium"
              >
                {editingEvent ? 'Modifier le programme' : 'Créer le programme'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-bold">Détails du cours</h3>
              <button
                onClick={closeEventDetails}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded bg-gradient-to-r ${getStatusColor(selectedEvent.status)}`}>
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{selectedEvent.title}</h4>
                  <p className="text-sm text-gray-600">
                    {format(new Date(selectedEvent.date), 'dd MMMM yyyy', { locale: fr })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Horaires</p>
                  <p className="font-medium">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
                </div>
                <div>
                  <p className="text-gray-600">Type</p>
                  <p className="font-medium">{getTypeTranslation(selectedEvent.type)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Langue</p>
                  <p className="font-medium">{getLanguageTranslation(selectedEvent.language)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Niveau</p>
                  <p className="font-medium">{getLevelTranslation(selectedEvent.level)}</p>
                </div>
              </div>

              {selectedEvent.description && (
                <div>
                  <p className="text-gray-600 text-sm">Description</p>
                  <p className="mt-1 text-sm">{selectedEvent.description}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <button
                  onClick={() => editEvent(selectedEvent)}
                  className="flex-1 flex items-center justify-center gap-2 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                  Modifier
                </button>
                <button
                  onClick={() => deleteEvent(selectedEvent.id)}
                  className="flex-1 flex items-center justify-center gap-2 p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="p-4 border-t">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <span>À venir</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
            <span>En cours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-green-500 to-green-600"></div>
            <span>Terminé</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-red-500 to-red-600"></div>
            <span>Annulé</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;