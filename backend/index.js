import express from "express";
import cors from "cors";
import StudentRouter from "./src/routers/StudentRouter.js";
import ChoicesRouter from "./src/routers/ChoicesRouter.js"
import AuthRouter from './src/routers/AuthRouter.js'
import AdminRouter from './src/routers/AdminRouter.js'
import ChatRouter from './src/routers/ChatRouter.js'
import SpellCheckRouter from './src/routers/Practice/SpellCheckRouter.js'
import CoursRouter from './src/routers/CoursRouter.js'
import ProfRouter from './src/routers/ProfRouter.js'
import AgendaRouter from './src/routers/AgendaRouter.js'
import ExamRouter from './src/routers/ExamenRoute.js'
import io from "./src/tools/socket-io.js";
import { send } from "./src/controllers/Etudiants/ChatController.js";
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();


app.use(express.json());
app.use(cors());

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);
// Routes

app.use("/students", StudentRouter)
app.use('/auth', AuthRouter)
app.use('/operations', ChoicesRouter)
app.use('/all',AdminRouter)
app.use('/messenger',ChatRouter)
app.use('/spell',SpellCheckRouter)
app.use('/courses',CoursRouter)
app.use('/prof',ProfRouter)
app.use('/agenda',AgendaRouter)
app.use('/exam',ExamRouter)

// config room meet
const rooms = new Map()


// Socket configuration

io.on("connection",(socket)=>{

  // Socket initialisation
  
  console.log(' Connected socket id + ' + socket.id);
  io.emit("message", "Hello World");
  
  // Test of socket events

  socket.onAny((eventName, ...args) => {
    console.log(`Event received: ${eventName}`, args);
  });
  

  // Socket chat service
  socket.on('message-etudiant',(data)=>{
    io.emit("message-prof",data)
    send(data)
    console.log({message_etudiant:data})
  })

  socket.on('message-prof',(data)=>{
    io.emit("message-etudiant",data)
    send(data)
    console.log({message_prof:data})
  })

  socket.on('notification',(data)=>{
    io.emit('notification',data)
  })
  // Event room
  socket.on('create-room', () => {
    const roomId = crypto.randomUUID();
    const roomPassword = crypto.randomUUID();

    rooms.set(roomId, {
      id: roomId,
      password: roomPassword,
      members: new Set(),
      peers: []
    });

    socket.emit('room-created', { roomId, roomPassword });
  })

  socket.on('join-room', (data) => {
    const { roomId, password, userId } = data;
    const room = rooms.get(roomId);

    if (room && room.password === password) {
      socket.join(roomId);
      room.members.add(userId);
      socket.to(roomId).emit('user-joined', userId);
      socket.emit('join-success', { roomId, members: Array.from(room.members) });
    } else {
      socket.emit('join-error', 'Salle invalide ou mot de passe incorrect');
    }
  })

  socket.on('offer', (data) => {
    const { roomId, offer } = data;
    socket.to(roomId).emit('offer', { offer, senderId: socket.id });
  });

  socket.on('answer', (data) => {
    const { roomId, answer } = data;
    socket.to(roomId).emit('answer', { answer, senderId: socket.id });
  });

  socket.on('ice-candidate', (data) => {
    const { roomId, candidate } = data;
    socket.to(roomId).emit('ice-candidate', { candidate, senderId: socket.id });
  });

  socket.on("disconnect",()=>{
    console.log('user disconnected');
  })
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});