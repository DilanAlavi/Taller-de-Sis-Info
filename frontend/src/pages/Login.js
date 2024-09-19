app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Aquí defines las credenciales correctas
  const correctUsername = 'admin';
  const correctPassword = '123456';

  if (username === correctUsername && password === correctPassword) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});
