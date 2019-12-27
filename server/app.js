const express = require('express');
const AccountController = require('./controllers/account');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/register', AccountController.createAccount)
app.post('/login', AccountController.login)

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
