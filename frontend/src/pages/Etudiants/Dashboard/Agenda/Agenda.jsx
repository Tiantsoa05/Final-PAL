import React, { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import axios from "axios";

const format =(date)=>{
    const dateTime = new Date(date)
    return [
        new Intl.DateTimeFormat("fr-FR").format(dateTime),
        dateTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    ]
}

const Agenda = () => {

  const [programme,setProgramme] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/agenda/programs/1')
    .then(res=>{
        console.log(res.data)
        setProgramme(res.data)
    })
  },[])
  return (
    <div className="bg-white shadow-lg rounded-xl p-5 w-full max-w-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4">📅 Prochaines Activités</h2>
      <ul className="space-y-4">
        {programme.map((item) => (
          <li
            key={item.id}
            className={`p-3 rounded-lg flex items-center justify-between ${
              item.type === "exam" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
            }`}
          >
            <div>
              <h3 className="font-semibold">{item.tache}</h3>
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} /> {format(item.date_tache)[0]}
                <Clock size={16} /> {format(item.date_tache)[1]}
              </div>
            </div>
            <span className="text-sm font-semibold">
              {item.type === "exam" ? "📖 Examen" : "📚 Leçon"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Agenda;
