const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { connectToDatabase } = require('./mongodbConnection');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware to serve static files
app.use(express.static('./public'));

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('login', async (data) => {
    const collection = await connectToDatabase();
    const user = await collection.findOne({ "usuario.nombre": data.username });
    if (user) {
      socket.emit('loginSuccess', { user });
    } else {
      socket.emit('loginFailure', { message: 'Usuario no encontrado' });
    }
  });

  socket.on('logout', () => {
    console.log('A user logged out');
    socket.emit('logoutSuccess', { message: 'Logged out successfully' });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
