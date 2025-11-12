import axios from 'axios'; // Imports the axios library, which allows HTTP calls
                           // to be made from the frontend to the backend

const API = axios.create({ // Creates an instance of axios so a baseURL can be defined.
    baseURL: '/api/products'  // Sets the default root URL for all HTTP requests
               // This set up allows the frontend to call the backend without CORS issues.
                    // For production you would replace /api with something like 'https://mybackend.com/api
});

export default API;