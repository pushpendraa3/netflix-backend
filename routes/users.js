const express = require('express');
const usersRouter = express.Router();
const pool = require('./pool');

usersRouter.get('/login', (req, res) => {
  res.render('loginPage', { error: null });
});

usersRouter.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

usersRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  pool.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, result) => {
      if (err) return res.status(500).send('Internal Server Error');
      if (result.length > 0) {
        res.cookie('userId', result[0].idusers, { httpOnly: true });
        return res.redirect('/user/dashboard');
      }
      res.status(401).render('loginPage', { error: 'Invalid email or password' });
    }
  );
});

usersRouter.get('/logout', (req, res) => {
  res.clearCookie('userId');
  res.redirect('/user/login');
});

function isAuth(req, res, next) {
  if (req.cookies.userId) return next();
  res.redirect('/user/login');
}

module.exports = { usersRouter, isAuth };
