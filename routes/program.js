var express = require('express');
const pool = require("./pool")
const upload = require("./multer");
var router = express.Router();
// /program


/* display all programs page */
router.get('/view/all', function (req, res, next) {
    res.render('allProgram');
})

router.get('/view/edit/:id', function (req, res, next) {

    pool.query("SELECT * FROM program WHERE idprogram = ?", [req.params.id], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: error.message })
            }
       
            res.render('programForm', { data: result[0], href: `/program/update/${req.params.id}` });
        })
    
})

router.get('/view/new', function (req, res, next) {
    const data = {
        idprogram: "",
        programname: "",
        idcategory: "",
        idsubcategory: "",
        description: "",
        status: "",
        casts: "",
        poster: "",
        releasedate: "",
        programcol: ""
    }
    res.render('programForm', { data, href: '/program/new' });
})

// view single program page with id
router.get('/view/:id', function (req, res, next) {
    res.render('singleProgram', { id: req.params.id });
})

    /* send json all programs/movies */
router.get('/', function (req, res, next) {
    try {
        pool.query("SELECT * FROM program", function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: error.message })
            }
            // res.status(200).render("allProducts", result)
            res.json({ status: true, result })
        })
    } catch (error) {
        res.json({ status: false, error, msg: "hello" })
    }
});

/* send json details of one id */
router.get('/:id', function (req, res, next) {
    // console.log(req.params.id)
    try {
        pool.query("SELECT * FROM program WHERE idprogram = ?", [req.params.id], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: error.message })
            }
            // res.status(200).render("singleProduct", result)
            res.json({ status: true, result })
        })
    } catch (error) {
        res.json({ status: false, error, msg: "hello" })
    }
});

/* nothing. display a message and single program page */
router.post('/update/:id', upload.single("poster") ,function (req, res, next) {
    try {
        const id = req.params.id
        let { programname, idcategory, idsubcategory, description, status, casts, releasedate } = req.body
        const poster = req.file ? req.file.filename : "";
        
    
    
    if (!idcategory || idcategory === "") {
        idcategory = 1; // <-- default value
    }
    if (!idsubcategory || idsubcategory === "") {
        idsubcategory = 1; // <-- default value
    }
    
    console.log("update api working", programname, idcategory, idsubcategory, description, status, casts, releasedate, id, poster)
        // console.log("update api working", id, programname, idcategory, idsubcategory, description, status, casts, releasedate)

        pool.query(`UPDATE program 
    SET programname = ?, 
        idcategory = ?, 
        idsubcategory = ?, 
        description = ?, 
        status = ?,
        casts = ?, 
        releasedate = ?,
        poster = ?
    WHERE idprogram = ?`,
    [programname, idcategory, idsubcategory, description, status, casts, releasedate, poster, id],
    function (error, result) {
        if (error) {
            res.status(500).json({ status: false, message: error.message })
        }
        res.redirect('/program/view/' + id);
    }
)
    } catch (error) {
        res.json({ status: false, error, msg: "hello" })
    }
});

/* display a message. and redirect to all programs page */
router.get('/delete/:id', function (req, res, next) {
    try {
        pool.query("DELETE FROM program WHERE idprogram = ?", [req.params.id], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: error.message })
            }
            // redirect to home page
            res.redirect('/program/view/all');
            
        })
    } catch (error) {
        res.json({ status: false, error, msg: "hello" })
    }
});

/* single program page all fields empty.  */

router.post('/new', upload.single("poster") ,function (req, res, next) {
    try {
        // const id = req.params.id
        let { programname, idcategory, idsubcategory, description, status, casts, releasedate } = req.body
        const poster = req.file ? req.file.filename : "";
    
    if (!idcategory || idcategory === "") {
        idcategory = 1; // <-- default value
    }
    if (!idsubcategory || idsubcategory === "") {
        idsubcategory = 1; // <-- default value
    }
    
    console.log("post api working", programname, idcategory, idsubcategory, description, status, casts, releasedate, poster)
        // console.log("update api working", id, programname, idcategory, idsubcategory, description, status, casts, releasedate)

          pool.query("INSERT INTO program ( programname, idcategory, idsubcategory, description, status, casts, releasedate, poster) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",

                                            [programname, idcategory, idsubcategory, description, status, casts, releasedate, poster],
    function (error, result) {
        if (error) {
            res.status(500).json({ status: false, message: error.message })
        }
        res.redirect('/program/view/all');
    }
)
    } catch (error) {
        res.json({ status: false, error, msg: "hello" })
    }
});

module.exports = router;
