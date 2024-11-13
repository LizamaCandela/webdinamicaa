const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const placesRoutes = require('./routes/places');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/places', placesRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
}); 