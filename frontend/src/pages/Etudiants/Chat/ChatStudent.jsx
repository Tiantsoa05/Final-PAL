import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import socket from "../../../tools/socket-io.js";
import { Header } from "../Accueil/Header/Header.jsx";
import './Chat.css'
import axios from "axios";

const ChatStudent = () => {
    const [messages, setMessages] = useState([])
    const [chat,setChat] = useState("")
    const [profUser,setProfUser]=useState({})
    const {prof,userId} = localStorage
    const LastMessRef = useRef(null)

    console.log(localStorage)
    useEffect(()=>{

        socket.on("message",(data)=>{
            console.log(data)
        })
        axios.post('http://localhost:3000/messenger/discussion/perso',
            {
                id_prof: parseInt(prof),
                id_etudiant: parseInt(userId)
            }
        ).then(data=>setMessages(data.data))

        axios.get('http://localhost:3000/all/prof/'+prof).then(data=>setProfUser(data.data))
        
    },[])
    
    useEffect(()=>{
        LastMessRef.current?.scrollIntoView({behavior:'smooth'})
    },[])
        
    useEffect(() => {
        // Écouter les messages entrants
        socket.on("message-etudiant", (data) => {
            console.log("Message reçu de l'étudiant :", data);
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Nettoyer les écouteurs au démontage du composant
        return () => {
            socket.off("message-etudiant");
        };
    }, []);

    

    return (
        <>
            <Header/>
            <div className="chat-body">
                <div className="menu-chat">
                    <div className="group-chat">
                        <div className="group-profile">
                            <img 
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" 
                                alt="image" 
                                className="menu-chat-picture"
                            />
                            <span className="group-name">{profUser.nom_prof +" "+ profUser.prenom_prof}</span>
                        </div>
                    </div>
                </div>
                <div className="chat-card">
                    {/* <div className="chat-sender">
                        <div className="sender-image">
                            <img src={sender.picture} alt="image" />
                        </div>
                        <div className="sender-name">
                            <span>{sender.name}</span>
                        </div>
                    </div> */}
                    <div className="chat-content">
                        {
                            messages.map((msg, index)=>(
                                <div key={index} className={`chat-message ${msg.send_type === 1 ? 'sender-message bg-green-400 text-white' : 'receiver-message bg-gray-300 text-black'}`}>
                                    {msg.message}
                                </div>
                            ))
                        }
                    </div>
                    <div ref={LastMessRef}></div>
                    <div className="chat-input">
                        <input 
                            type="text" 
                            placeholder="Ecrivez votre message" 
                            value={chat}
                            onChange={(e)=>setChat(e.target.value)}
                            className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div 
                            className="send-message"
                            onClick={(e)=>{
                                e.preventDefault()
                                let mp = {
                                    id_prof:parseInt(prof),
                                    id_etudiant:parseInt(userId),
                                    send_type: 1,
                                    message: chat
                                }
                                socket.emit("message-etudiant",mp)
                                setMessages([...messages,mp])
                                setChat("")
                            }}
                        >
                            <IoSend
                                size={30}
                                color="blue"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ChatStudent;