/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password
            });

            const {  user } = response.data

            // Vérification de la présence des données nécessaires
            if (!response.data.token || !response.data.user) {
                throw new Error('Données de connexion incomplètes');
            }


            // Stockage des informations
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('userName', `${user.prenom} ${user.nom}`);

            if(user.role === 'ETUDIANT'){
                localStorage.setItem('prof',user.prof)
            }else{
                localStorage.setItem('idLangue',user.id_langue)
            }      

            // Redirection basée sur le rôle
            switch (user.role) {
                case 'ADMIN':
                    navigate('/dashboard');
                    break;
                case 'ENSEIGNANT':
                    navigate('/dashboard');
                    break;
                case 'ETUDIANT':
                    navigate('/home');
                    break;
                default:
                    setError('Rôle non reconnu');
                    break;
            }
        } catch (err) {
            console.error('Erreur de connexion:', err);
            setError(
                err.response?.data?.message || 
                err.message || 
                'Erreur lors de la connexion'
            );
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Section Illustration */}
            <div className="hidden lg:block lg:w-1/2 bg-blue-50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src="/images/login.jpg"
                        alt="login infinity"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute bottom-6 left-0 right-0 p-8 text-center bg-white/70">
                    <h3 className="text-2xl font-bold text-blue-800 mb-4">
                        Bienvenue sur notre plateforme d'apprentissage
                    </h3>
                    <p className="text-blue-600">
                        Connectez-vous pour accéder à des milliers de cours en ligne
                    </p>
                </div>
            </div>

            {/* Separateur vertical */}
            <div className="hidden lg:block w-px bg-gray-200"></div>

            {/* Section Formulaire de Connexion */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-blue-300">
                <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-xl border border-gray-100">
                    <div>
                        <div className="flex justify-center items-center mb-6">
                            <User className="h-12 w-12 text-blue-600" />
                            <h2 className="ml-3 text-3xl font-extrabold text-gray-900">
                                Connectez-vous
                            </h2>
                        </div>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                {error}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Champ Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Adresse Email
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="votre.email@example.com"
                                    />
                                </div>
                            </div>

                            {/* Champ Mot de Passe */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Mot de Passe
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Votre mot de passe"
                                    />
                                </div>
                            </div>

                            {/* Options Supplémentaires */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Se souvenir de moi
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                        Mot de passe oublié ?
                                    </a>
                                </div>
                            </div>

                            {/* Bouton de Connexion */}
                            <div className='flex flex-col gap-4'>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Se Connecter
                                </button>
                                <button
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    onClick={()=>navigate('/')}
                                >
                                    Retour
                                </button>
                            </div>
                        </form>

                        {/* Section Inscription */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Pas de compte ? {' '}
                                <Link to={"/register"} className="font-medium text-blue-600 hover:text-blue-500">
                                    Inscrivez-vous
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;