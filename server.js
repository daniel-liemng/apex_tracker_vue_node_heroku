const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load env - config file
dotenv.config({ path: './config.env' });

const app = express();

// DEV LOGGING USING MORGAN MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// USE ROUTER INSTEAD
// app.get('/api/v1/profile/:platform/:gamertag', (req, res) => {
//   console.log(req.params.platform, req.params.gamertag);
//   res.send('Hello');
// });

// PROFILE ROUTES
app.use('/api/v1/profile', require('./routes/profile'));

// HANDLE PRODUCTION - check after npm run build to deploy to Heroku
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
