import { Star } from "lucide-react";

/* eslint-disable react/prop-types */
export const TeacherCard = ({ teacher }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
        <img
          src={`/api/placeholder/80/80`}
          alt={teacher.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{teacher.name}</h3>
          <p className="text-gray-600">{teacher.speciality}</p>
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{teacher.rating} (120 avis)</span>
          </div>
        </div>
      </div>
    );
  };