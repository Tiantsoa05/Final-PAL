
import { Link } from "react-router-dom";
import { 
    BookOpen,
    Puzzle,
    BookMarked,
    NotebookText
} from 'lucide-react';

export const Menus = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="grid gap-6 w-full max-w-md">
                <Link to="/courses">
                    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                        <div className="flex items-center space-x-4">
                            <div className="rounded-lg bg-green-100 p-3 group-hover:bg-green-200 transition-colors">
                                <BookOpen className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Leçons</h3>
                        </div>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500 rounded-xl transition-all duration-300" />
                    </div>
                </Link>

                <Link to="/practice">
                    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                        <div className="flex items-center space-x-4">
                            <div className="rounded-lg bg-blue-100 p-3 group-hover:bg-blue-200 transition-colors">
                                <Puzzle className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Pratique</h3>
                        </div>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-xl transition-all duration-300" />
                    </div>
                </Link>

                <Link to="/dictionnary">
                    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                        <div className="flex items-center space-x-4">
                            <div className="rounded-lg bg-purple-100 p-3 group-hover:bg-purple-200 transition-colors">
                                <BookMarked className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Dictionnaire</h3>
                        </div>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500 rounded-xl transition-all duration-300" />
                    </div>
                </Link>

                <Link to="/conjugaison">
                    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                        <div className="flex items-center space-x-4">
                            <div className="rounded-lg bg-orange-100 p-3 group-hover:bg-orange-200 transition-colors">
                                <NotebookText className="h-6 w-6 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Conjugaisons</h3>
                        </div>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500 rounded-xl transition-all duration-300" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Menus;