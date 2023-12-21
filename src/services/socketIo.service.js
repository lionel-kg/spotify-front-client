import axios from '../config/axios';
import {io} from 'socket.io-client';

export const getRooms = async () => {
  const response = await axios.get('/rooms');
  return response.data;
};

// const url = 'http://localhost:4001';
const url = 'https://api.spotify.ismadev.net/';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  async connect() {
    this.socket = io(url);
    this.isConnected = true;

    // Gestionnaire d'événement pour la connexion
    this.socket.on('connect', () => {
      console.log('Connecté au serveur Socket.IO');
    });

    // Gestionnaire d'événement pour la déconnexion
    this.socket.on('disconnect', () => {
      console.log('Déconnecté du serveur Socket.IO');
      this.isConnected = false;
    });
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.isConnected = false;
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.error("La connexion Socket.IO n'est pas établie.");
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    } else {
      console.error("La connexion Socket.IO n'est pas établie.");
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    } else {
      console.error("La connexion Socket.IO n'est pas établie.");
    }
  }
}

const socketService = new SocketService();
export default socketService;
