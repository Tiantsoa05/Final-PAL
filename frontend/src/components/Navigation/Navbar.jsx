/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Globe, 
  BookOpen, 
  Settings, 
  LogOut,
  ChevronDown,
  Bell
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LANGUAGES } from '../../constants/Languages';
import prof from '../../assets/prof.png'

const Navbar = () => {

  const [userProfile,setUserProfile] = useState({})
  const navigate = useNavigate()
  const [isLogoutModalOpen,setIsLogoutModalOpen] = useState(false)

  const [currentLanguage,setCurrenLanguage]=useState({})


  useEffect(()=>{
    axios.get('http://localhost:3000/all/lang')
    .then(resp=>{

      let l = (LANGUAGES.find(language =>
        resp.data.some(dbLang => dbLang.nom_langue === language.name)
      ))
      console.log(l)
      setCurrenLanguage(l)

    })
  })

  useEffect(()=>{
    const userId = localStorage.getItem("userId")
    axios.get('http://localhost:3000/all/profs').then(res=>{
      let actualUser = res.data.find(user=>user.id_prof===parseInt(userId))
      setUserProfile(actualUser)

      console.log(actualUser)
    })

  },[])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    // {
    //   label: "Mes Cours",
    //   icon: BookOpen,
    //   dropdownItems: [
    //     { label: "Cours en cours", href: "#" },
    //     { label: "Cours terminés", href: "#" },
    //     { label: "Favoris", href: "#" }
    //   ]
    // },
    // {
    //   label: "Langue",
    //   icon: Globe,
    //   dropdownItems: [
    //     { label: "Français", href: "#" },
    //     { label: "English", href: "#" },
    //     { label: "Español", href: "#" }
    //   ]
    // },
    // {
    //   label: "Paramètres",
    //   icon: Settings,
    //   dropdownItems: [
    //     { label: "Profile", href: "#" },
    //     { label: "Notifications", href: "#" },
    //     { label: "Sécurité", href: "#" }
    //   ]
    // }
  ];

  const onLogout = ()=>{
    setIsLogoutModalOpen(true)
  }
  const closeLogoutModal=()=>{
    setIsLogoutModalOpen(false)
  }

  const LogoutModal = ({closeLogoutModal})=>{

    const handleLogout = ()=>{
      localStorage.clear()
      navigate('/')
    }

    return <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold text-gray-800">Confirmer la déconnexion</h2>
            <p className="text-gray-600 mt-2">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeLogoutModal}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
    </>
  }

  const DropdownMenu = ({ items, label, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    let timeoutId = null;

    useEffect(() => {
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, []);

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 150);
    };

    return (
      <div 
        ref={dropdownRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className={`flex items-center space-x-1 px-4 py-2 text-gray-700 rounded-md transition-all
            ${isOpen ? 'bg-blue-50 text-blue-600' : 'hover:text-blue-600 hover:bg-blue-50'}`}
        >
          <Icon size={20} />
          <span className="mx-2">{label}</span>
          <ChevronDown 
            size={16} 
            className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isOpen && (
          <div 
            className="absolute z-50 mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  if (!item.href || item.href === '#') {
                    e.preventDefault()
                    console.log(item)
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  const UserMenu = ({ userProfile, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    let timeoutId = null;

    useEffect(() => {
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, []);

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 150);
    };

    return (
      <div 
        ref={menuRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
            ${isOpen ? 'bg-blue-50' : 'hover:bg-blue-50'}`}
        >
          <img
            src={prof || "/default-avatar.png"}
            alt="Avatar"
            className="h-8 w-8 rounded-full border-2 border-blue-500"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">
              {userProfile.nom_prof}
            </span>
          </div>
          <ChevronDown 
            size={16} 
            className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div 
            className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-medium text-gray-700">{userProfile.nom_prof}</p>
              <p className="text-xs text-gray-500">{userProfile.mail_prof}</p>
            </div>
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex gap-2"
            >
              <LogOut size={20}/>
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    );
  };

  const NotifMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    let timeoutId = null;

    useEffect(() => {
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, []);

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 150);
    };

    return (
      <div 
        ref={menuRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative"
        >
          <Bell size={20} />
          <span 
            className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"
          >
            3
          </span>
        </button>

        {isOpen && (
          <div 
            className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 flex gap-2">
              Notif
            </div>
            <div className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 flex gap-2">
              Notif
            </div>
            <div className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 flex gap-2">
              Notif
            </div>
            <div className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 flex gap-2">
              Notif
            </div>
            <div className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 flex gap-2">
              Notif
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            {currentLanguage && (
              <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                <span className="text-2xl mr-2">{currentLanguage.icon}</span>
                <span className="text-blue-800 font-medium">{currentLanguage.name}</span>
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Navigation Items */}
            <div className="flex items-center space-x-2">
              {menuItems.map((item, index) => (
                <DropdownMenu
                  key={index}
                  items={item.dropdownItems}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
            </div>

            {/* Notifications */}
              <NotifMenu/>
              
            {/* User Profile */}
            {userProfile && (
              <UserMenu 
                userProfile={userProfile} 
                onLogout={onLogout} 
              />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isLogoutModalOpen && (
        <LogoutModal closeLogoutModal={closeLogoutModal}/>
      )}
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item, index) => (
              <div key={index} className="space-y-1">
                <button className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
                  <item.icon size={20} className="mr-2" />
                  {item.label}
                </button>
                <div className="pl-8 space-y-1">
                  {item.dropdownItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.href}
                      className="block px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 rounded-md"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            
            {userProfile && (
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center px-3 py-2">
                  <img
                    src={userProfile.avatar || "/default-avatar.png"}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full border-2 border-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-700">{userProfile.nom_prof}</div>
                    <div className="text-xs text-gray-500">{userProfile.mail_prof}</div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="mt-2 w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut size={20} className="mr-2" />
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;