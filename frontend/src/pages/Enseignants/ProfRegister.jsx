import {
    UserPlus,
    Mail,
    Lock,
    UserCircle,
    GraduationCap,
    BrainCircuit,
    Phone,
  } from "lucide-react";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { useState, useEffect } from "react";
  import ConfirmRegister from "../../components/Popup/ConfirmRegister";
  
  const LANGUES_MATERNELLES = [
    "Malagasy",
    "Français",
    "Anglais",
    "Arabe",
    "Espagnol",
    "Allemand",
    "Chinois",
    "Italien",
    "Portugais",
    "Russe",
    "Autre",
  ];
  
  const ProfRegister = () => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role] = useState("ENSEIGNANT");
    const [diplome, setDiplome] = useState("");
    const [phone, setPhone] = useState("");
    const [langueEnseigner, setLangueEnseigner] = useState("");
    const [error, setError] = useState(null);
    const [registerModal, setRegisterModal] = useState(false);
    const [langues,setLangues] = useState([])
    const navigate = useNavigate();
  
    useEffect(()=>{
        axios.get('http://localhost:3000/all/lang').then(response=>{
            setLangues(response.data)
        })
    },[])
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
  
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }
  
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/prof/register",
          {
            nom,
            prenom,
            email,
            password,
            role,
            diplome,
            num_phone: phone,
            id_langue: parseInt(langueEnseigner)
          }
        );
        localStorage.setItem("token", response.data.token);
        navigate("/login");
      } catch (err) {
        setError(err.response?.data?.message || "Erreur lors de l'inscription.");
        console.error("Erreur d'inscription :", err);
      }
    };
  
    const handleModal = (e) => {
      e.preventDefault();
      setRegisterModal(true);
    };
  
    return (
      <div className="min-h-screen flex">
        {/* Formulaire */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-blue-300">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-xl border border-gray-100">
            <div className="text-center">
              <UserPlus className="h-12 w-12 text-blue-600 mx-auto" />
              <h2 className="text-3xl font-extrabold text-gray-900">
                Créer un Compte
              </h2>
            </div>
  
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                {error}
              </div>
            )}
  
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Nom */}
              <InputField
                label="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                icon={UserCircle}
                placeholder="Votre nom"
              />
  
              {/* Prénom */}
              <InputField
                label="Prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                icon={UserCircle}
                placeholder="Votre prénom"
              />
  
              {/* Email */}
              <InputField
                label="Adresse Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                placeholder="votre.email@example.com"
              />
  
              {/* Diplôme */}
              <InputField
                label="Diplôme"
                value={diplome}
                onChange={(e) => setDiplome(e.target.value)}
                icon={GraduationCap}
                placeholder="Votre diplôme"
              />
  
              {/* Niveau d'études */}
              <InputField
                label="Numero téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={Phone}
                placeholder="Votre niveau d'études"
              />
  
              {/* Mot de passe */}
              <InputField
                label="Mot de Passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                placeholder="Votre mot de passe"
              />
  
              {/* Confirmation mot de passe */}
              <InputField
                label="Confirmer le mot de Passe"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={Lock}
                placeholder="Confirmez votre mot de passe"
              />
  
              {/* Langue enseignée */}
              <div>
                <label
                  htmlFor="langueEnseigner"
                  className="block text-sm font-medium text-gray-700"
                >
                  Langue à enseigner
                </label>
                <select
                  id="langueEnseigner"
                  name="langueEnseigner"
                  value={langueEnseigner}
                  onChange={(e) => setLangueEnseigner(e.target.value)}
                  className="pl-3 block w-full py-2 mt-1 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Sélectionnez une langue</option>
                  {langues.map((langue) => (
                    <option key={langue.id_langue} value={langue.id_langue}>
                      {langue.nom_langue}
                    </option>
                  ))}
                </select>
              </div>
  
              {/* Bouton inscription */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
              >
                S'inscrire
              </button>
            </form>
  
            {/* Lien vers connexion */}
            <p className="text-center text-sm text-gray-600">
              Déjà un compte ?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
  
        {/* Illustration */}
        <IllustrationSection />
  
        {/* Modal confirmation inscription */}
        {registerModal && (
          <ConfirmRegister
            closeRegisterModal={() => setRegisterModal(false)}
            handleRegister={handleSubmit}
          />
        )}
      </div>
    );
  };
  
  export default ProfRegister;
  
  // Composant de champ d'entrée
  const InputField = ({ label, type = "text", value, onChange, icon: Icon, placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />
      </div>
    </div>
  );
  
  // Section Illustration
  const IllustrationSection = () => (
    <div className="hidden lg:block lg:w-1/2 bg-blue-50 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/images/profregister.jpg"
          alt="Illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-6 left-0 right-0 p-8 text-center bg-white/70">
        <h3 className="text-2xl font-bold text-blue-800 mb-4">
          Rejoignez notre communauté d'apprentissage
        </h3>
        <p className="text-blue-600">Partagez vos compétences avec Infinity</p>
      </div>
    </div>
);