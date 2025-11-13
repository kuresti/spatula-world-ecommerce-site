/********************************
 * Required Resources
 ********************************/
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Routes
app.use('/api/products', productRoutes);

// Root
app.get('/', (req, res) => res.send('Welcome to Spatula World Backend'));

// Connect to MongoDB and start server
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

startServer()