import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LanguageLearningJourney from "./components/languages/LanguageLearningJourney";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import VideoConference from "./pages/VideoConference";
import { LeconsSection } from "./components/sections/LeconSection";
import { LeconsSectionEtudiants } from "./components/etudiants/LeconsSectionEtudiant";
import CourseList from "./components/etudiants/CoursList";
import Practice from "./pages/Practice";
import Accueil from "./pages/Etudiants/Accueil/Accueil";
import Courses from "./pages/Etudiants/Contenus/Courses/Courses";
import ChatStudent from "./pages/Etudiants/Chat/ChatStudent";
import ProfRegister from "./pages/Enseignants/ProfRegister";
import Dictionnary from "./components/languages/Dictionnary";
import Conjugaison from "./components/languages/Conjugaison";
import SpellCheck from "./pages/Etudiants/Practice/SpellCheck";
import Follow from "./pages/Etudiants/Accueil/Profs/Follow/Follow";
import FormPayement from "./components/prof/FormPayement";
import StudDashboard from "./pages/Etudiants/Dashboard/StudDashboard";
import FileViewer from "./components/FileViewer/FileViewer";
import ExercicePage from "./components/sections/ExercicePage";
import Chapters from "./pages/Etudiants/Contenus/Courses/Chapter/Chapters";
import Evaluation from "./pages/Etudiants/Examen/Evaluation";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/langue" element={<LanguageLearningJourney />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage/>} />
        <Route path="/register_prof" element={<ProfRegister/>}/>
        {/* <Route path="/meet" element={<VideoConference />} /> */}
        
        <Route element={<ProtectedRoute />}>
          {/* Les routes pour les prof */}
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/cours/:coursId/lecons" element={<LeconsSection />} />

          {/*Les routes etudiants */}
          <Route path="/home" element={<Accueil/>}/>
          <Route path="/cours" element={<CourseList />} />
          <Route path="/stud/dashboard" element={<StudDashboard/>}/>
          <Route path="/cours/etudiant/:coursId/lecons" element={<LeconsSectionEtudiants />} />
          <Route path="/practice" element={<SpellCheck/>}/>
          <Route path="/courses" element={<Courses/>} />
          <Route path="/messenger" element={<ChatStudent/>} />
          <Route path="/dictionnary" element={<Dictionnary/>} />
          <Route path="/conjugaison" element={<Conjugaison/>} />
          <Route path="/follow" element={<Follow/>}/>
          <Route path="/payer" element={<FormPayement/>}/>
          <Route path="/course/view/:id" element={<FileViewer/>} />
          <Route path="/courses/:titre" element={<Chapters/>}/>
          <Route path="/evaluation" element={<Evaluation/>}/>
          {/* Route pour les exercices */}
          <Route path="/lecons/:leconId/exercices" element={<ExercicePage />} />

        </Route>
      </Routes> 
    </Router>
  );
}

export default App;

const useAuth = () => {

  const token = localStorage.getItem('token');
  
  return !!token;
};

const ProtectedRoute = () => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};