const express = require('express');
const pool = require('./pool');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'poster') {
      cb(null, path.join(__dirname, '../public/images'));
    } else if (file.fieldname === 'video') {
      cb(null, path.join(__dirname, '../public/videos'));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });
const { isAuth } = require('./users');
const router = express.Router();

router.get('/categories', (req, res) => {
  pool.query('SELECT * FROM category;', (error, result) => {
    if (error) return res.status(500).json({ status: false, message: error.message });
    res.json({ status: true, result });
  });
});

router.get('/subcategories', (req, res) => {
  const { categoryId } = req.query;
  if (!categoryId) return res.status(400).json({ status: false, message: 'Category ID is required' });
  pool.query('SELECT * FROM subcategory WHERE categoryid = ?', [categoryId], (error, result) => {
    if (error) return res.status(500).json({ status: false, message: error.message });
    res.json({ status: true, result });
  });
});

router.get('/view/all', (req, res) => {
  res.render('allProgram');
});

router.get('/view/edit/:id', isAuth, (req, res) => {
  pool.query('SELECT * FROM program WHERE idprogram = ?', [req.params.id], (error, result) => {
    if (error) return res.status(500).json({ status: false, message: error.message });
    if (!result[0]) return res.status(404).render('error', { message: 'Program not found' });
    res.render('programForm', { data: result[0], href: `/program/update/${req.params.id}` });
  });
});

router.get('/view/new', isAuth, (req, res) => {
  const data = {
    idprogram: '',
    programname: '',
    idcategory: '',
    idsubcategory: '',
    description: '',
    status: '',
    casts: '',
    poster: '',
    releasedate: '',
    programcol: ''
  };
  res.render('programForm', { data, href: '/program/new' });
});

router.get('/view/:id', (req, res) => {
  res.render('singleProgram', { id: req.params.id });
});

router.get('/', (req, res) => {
  pool.query('SELECT * FROM program', (error, result) => {
    if (error) return res.status(500).json({ status: false, message: error.message });
    res.json({ status: true, result });
  });
});

router.get('/:id', (req, res) => {
  pool.query('SELECT * FROM program WHERE idprogram = ?', [req.params.id], (error, result) => {
    if (error) return res.status(500).json({ status: false, message: error.message });
    if (!result[0]) return res.status(404).json({ status: false, message: 'Program not found' });
    res.json({ status: true, result: result[0] });
  });
});

router.post('/update/:id', upload.fields([{ name: 'poster', maxCount: 1 }, { name: 'video', maxCount: 1 }]), isAuth, (req, res) => {
  try {
    const id = req.params.id;
    const { programname, idcategory, idsubcategory, description, status, casts, releasedate } = req.body;
    const poster = req.files['poster'] ? req.files['poster'][0].filename : '';
    const video = req.files['video'] ? req.files['video'][0].filename : '';
    pool.query(
      'UPDATE program SET programname = ?, idcategory = ?, idsubcategory = ?, description = ?, status = ?, casts = ?, releasedate = ?, poster = ?, video = ? WHERE idprogram = ?',
      [programname, idcategory || 1, idsubcategory || 1, description, status, casts, releasedate, poster, video, id],
      (error) => {
        if (error) return res.status(500).json({ status: false, message: error.message });
        res.redirect(`/program/view/${id}`);
      }
    );
  } catch (error) {
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
});

router.get('/delete/:id', (req, res) => {
  pool.query('DELETE FROM program WHERE idprogram = ?', [req.params.id], (error) => {
    if (error) return res.status(500).json({ status: false, message: error.message });
    res.redirect('/program/view/all');
  });
});

router.post('/new', upload.fields([{ name: 'poster', maxCount: 1 }, { name: 'video', maxCount: 1 }]), isAuth, (req, res) => {
  try {
    const { programname, idcategory, idsubcategory, description, status, casts, releasedate } = req.body;
    const poster = req.files['poster'] ? req.files['poster'][0].filename : '';
    const video = req.files['video'] ? req.files['video'][0].filename : '';
    pool.query(
      'INSERT INTO program (programname, idcategory, idsubcategory, description, status, casts, releasedate, poster, video) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [programname, idcategory || 1, idsubcategory || 1, description, status, casts, releasedate, poster, video],
      (error) => {
        if (error) return res.status(500).json({ status: false, message: error.message });
        res.redirect('/program/view/all');
      }
    );
  } catch (error) {
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
});

module.exports = router;
