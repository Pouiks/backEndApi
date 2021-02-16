const multer = require('multer');
const path = require('path');

// Configuration de multer :
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (_, file, cb) => {
    // Filtre les données en fonction du mimetype (accèpte le jpeg/jpg//png).
    if (file.mimetype == 'image/jpeg' || 'image/png' || 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// Fonction de stockage (cf. doc) :
const upload = multer({ 
    storage: storage, 
    fileFilter 
});


module.exports = upload;
