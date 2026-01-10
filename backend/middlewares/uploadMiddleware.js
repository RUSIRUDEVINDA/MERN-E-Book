import multer from 'multer'
import path from 'path'
import fs from 'fs'

//create uplaod directory if not exists
const uploadDir = "uploads"
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, {recursive:true})
}

//set up storage engine
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, uploadDir)
    },
    filename:function(req,file,cb){
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    }
})

//check file type
function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}

//initialize upload
const upload = multer({
    storage:storage,
    limits: {fileSize: 5 * 1024 * 1024}, //5MB limit
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('coverImage') // expecting field name 'coverImage'

export {upload}