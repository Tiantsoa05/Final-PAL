import { Server } from "socket.io";

const io = new Server(8000, {
    cors: {
        origin: "*", // Remplacez par l'URL de votre client
        methods: ["GET", "POST"],       // Méthodes HTTP autorisées
        credentials: true               // Autoriser les cookies si nécessaires
    }
  });

export default io;