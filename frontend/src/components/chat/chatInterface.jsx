import { useEffect, useRef, useState } from 'react';
import { Send, Settings, Phone, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import socket from '../../tools/socket-io';
import './Chat.css'

const ChatInterface = () => {

  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [chat,setChat] = useState("")
  const [followers,setFollowers]=useState([])
  const [activeUser,setActiveUser]=useState({})
  const [activeChat,setActiveChat]=useState([])

  const LastMessRef = useRef(null)

  const profId= parseInt(localStorage.getItem('userId'))

  const handleNavigate = () => {
    navigate("/video");
  }

  useEffect(()=>{
    
    axios.post('http://localhost:3000/messenger/discussions',
      {
          id_prof: profId
      }
    ).then(data=>{
      let mss = data.data
      setMessages(mss)
      const lastDiscId = mss[mss.length - 1].id_etudiant
      setActiveChat(mss.filter(m=>m.id_etudiant === lastDiscId))
    })
    

    axios.get('http://localhost:3000/all/stud/followers/'+profId).then(data=>{
      let students = data.data
      setFollowers(students)
    })


  },[])

  useEffect(() => {

    // Ecouter les messages entrants
    socket.on("message-prof", (data) => {
        console.log("Message reçu du professeur :", data);
        setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Nettoyer les écouteurs au démontage du composant
    return () => {
        socket.off("message-prof");
    };

  }, []);

  const scrollToBottom = () => {
    LastMessRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const SetActiveDisc = (id)=>{
    const active = messages.filter(
      m=>m.id_etudiant === parseInt(id)
    )
    setActiveChat([...active])
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
        </div>
        
        {/* Chat List */}
        <div className="overflow-y-auto">
          {followers.map((follower,index) => (
            <div 
              key={index}
              onClick={()=>{
                  SetActiveDisc(follower.id_etudiant)
                  setActiveUser(follower)
                }
              }
              className='cursor-pointer hover:bg-slate-300'
            >
              {follower.nom_etudiant + "  " + follower.prenom_etudiant}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          {activeChat &&
              <div className="flex items-center bg-white">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">S</span>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                  { 
                    activeChat.length > 0 
                      ? followers.find(f => f.id_etudiant === activeChat[0].id_etudiant)?.nom_etudiant 
                        + " " 
                        + followers.find(f => f.id_etudiant === activeChat[0].id_etudiant)?.prenom_etudiant 
                      : "" 
                  }
                  </h2>
                  <p className="text-sm text-green-500">En ligne</p>
                </div>
              </div>
          }
          <div className="flex space-x-4">
            <button onClick={handleNavigate} className="p-2 hover:bg-gray-100 rounded-full">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-col overflow-y-auto p-4 space-y-4 pr-8 h-screen">
        {
          activeChat.length === 0 ?
          <div className="flex items-center justify-center h-full text-gray-600 text-lg font-medium ">
            Vous n'avez aucune discussion pour le moment
          </div> :
          activeChat.map((msg,index) => (
            <div key={index} className={ `flex ${msg.send_type !==1 ? 'justify-end' : 'justify-start'}`}>  
              <div  className={`chat-message ${msg.send_type !== 1 ? 'self-end bg-green-400 text-white' : 'self-start bg-gray-300 text-black'}`}>
                  {msg.message}
              </div>
            </div>
          ))
        }
          <div ref={LastMessRef}></div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button 
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              
              onClick={(e)=>{
                e.preventDefault()
                let mp = {
                    id_prof:parseInt(localStorage.getItem('userId')),
                    id_etudiant:activeUser.id_etudiant,
                    send_type: 2,
                    message: chat
                }
                
                setActiveChat([...activeChat,mp])
                socket.emit("message-prof",mp)
                setChat("")

            }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;