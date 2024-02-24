// Import the http module and your app module using ES6 import syntax
import http from 'http';
import App from './App.js';
 // Assuming your app module is in the same directory and named 'app.js'

const port = 5000;

// Create the server using the imported http module and your app
const server = http.createServer(App);

// Listen on the specified port
server.listen(port, () => {
    console.log(`App started on port ${port}`);
});
