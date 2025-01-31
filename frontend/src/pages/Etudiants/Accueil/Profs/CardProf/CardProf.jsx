/* eslint-disable react/prop-types */
import professor from '../../../../../assets/prof.png'

export const CardProf = ({ prof, setProf }) => {


  return (
    <div 
      onClick={() => setProf(prof)}
      className="group rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all duration-300 hover:border-blue-200 cursor-pointer bg-white"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-blue-100 transition-colors duration-300">
            <img 
              src={professor} 
              alt={`${prof.nom_prof} ${prof.prenom_prof}`}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h5 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
            {prof.nom_prof} {prof.prenom_prof}
          </h5>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center text-gray-600 group-hover:text-gray-700">
          <span className="font-medium">Diplôme:</span>
          <span className="ml-2 truncate">{prof.Diplome || "Non spécifié"}</span>
        </div>
        <div className="flex items-center text-gray-600 group-hover:text-gray-700">
          <span className="font-medium">Telephone:</span>
          <span className="ml-2 truncate">{prof.num_phone || "Non spécifié"}</span>
        </div>
      </div>
    </div>
  );
};

export default CardProf;