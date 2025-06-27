const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/routes');

const app = express();

// Configuración CORS para permitir credenciales y origen específico
const corsOptions = {
  origin: 'http://localhost:3000', // Cambia esto si tu frontend está en otro dominio/puerto
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
module.exports = app;